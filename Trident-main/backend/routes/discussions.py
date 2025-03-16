from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from collections import defaultdict

from database import get_db
from utils.auth import get_current_user
from models import User, Discussion, Comment, Upvote
from schemas import UserResponse  # Add this import

router = APIRouter()

# ---------- SCHEMAS ----------
class DiscussionBase(BaseModel):
    title: str
    content: str

class DiscussionCreate(DiscussionBase):
    pass

class DiscussionResponse(DiscussionBase):
    id: int
    user: UserResponse
    timestamp: datetime
    upvotes_count: int
    has_upvoted: bool
    comments_count: int
    
    class Config:
        orm_mode = True

class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    parent_comment_id: Optional[int] = None

class CommentResponse(CommentBase):
    id: int
    user: UserResponse
    discussion_id: int
    parent_comment_id: Optional[int]
    timestamp: datetime
    replies: List["CommentResponse"] = []
    
    class Config:
        orm_mode = True

CommentResponse.update_forward_refs()

# ---------- ROUTES ----------
@router.post("", response_model=DiscussionResponse, status_code=status.HTTP_201_CREATED)
def create_discussion(
    discussion: DiscussionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_discussion = Discussion(
        title=discussion.title,
        content=discussion.content,
        user_id=current_user.id
    )
    db.add(new_discussion)
    db.commit()
    db.refresh(new_discussion)
    # Re-query to load the user relationship
    discussion = db.query(Discussion).options(joinedload(Discussion.user)).filter(Discussion.id == new_discussion.id).first()
    return _enhance_discussion_response(discussion, db, current_user)

@router.get("", response_model=List[DiscussionResponse])
def get_all_discussions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    discussions = db.query(Discussion).options(joinedload(Discussion.user)).all()
    return [_enhance_discussion_response(d, db, current_user) for d in discussions]

@router.get("/{discussion_id}", response_model=DiscussionResponse)
def get_discussion(
    discussion_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    discussion = db.query(Discussion).options(joinedload(Discussion.user)).get(discussion_id)
    if not discussion:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Discussion not found")
    return _enhance_discussion_response(discussion, db, current_user)

@router.post("/{discussion_id}/upvote", response_model=DiscussionResponse)
def toggle_upvote(
    discussion_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    discussion = db.query(Discussion).get(discussion_id)
    if not discussion:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Discussion not found")

    upvote = db.query(Upvote).filter(
        Upvote.discussion_id == discussion_id,
        Upvote.user_id == current_user.id
    ).first()

    if upvote:
        db.delete(upvote)
    else:
        db.add(Upvote(discussion_id=discussion_id, user_id=current_user.id))
    
    db.commit()
    return get_discussion(discussion_id, db, current_user)

@router.post("/{discussion_id}/comments", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
def create_comment(
    discussion_id: int,
    comment: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    discussion = db.query(Discussion).get(discussion_id)
    if not discussion:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Discussion not found")

    if comment.parent_comment_id:
        parent = db.query(Comment).get(comment.parent_comment_id)
        if not parent or parent.discussion_id != discussion_id:
            raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Invalid parent comment")

    new_comment = Comment(
        **comment.dict(),
        discussion_id=discussion_id,
        user_id=current_user.id
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    # Re-query to load the user relationship
    new_comment = db.query(Comment).options(joinedload(Comment.user)).filter(Comment.id == new_comment.id).first()
    return new_comment

@router.get("/{discussion_id}/comments", response_model=List[CommentResponse])
def get_comments(discussion_id: int, db: Session = Depends(get_db)):
    all_comments = db.query(Comment).options(joinedload(Comment.user)).filter(Comment.discussion_id == discussion_id).all()
    comments_by_parent = defaultdict(list)
    
    for comment in all_comments:
        comments_by_parent[comment.parent_comment_id].append(comment)
    
    def build_tree(parent_id=None):
        return [
            CommentResponse(
                id=comment.id,
                content=comment.content,
                user=UserResponse(  # Convert SQLAlchemy User to UserResponse
                    id=comment.user.id,
                    username=comment.user.username
                ),
                discussion_id=comment.discussion_id,
                parent_comment_id=comment.parent_comment_id,
                timestamp=comment.timestamp,
                replies=build_tree(comment.id)
            )
            for comment in comments_by_parent.get(parent_id, [])
        ]
    
    return build_tree()

# ---------- HELPER FUNCTIONS ----------
def _enhance_discussion_response(discussion: Discussion, db: Session, user: User):
    upvotes_count = db.query(Upvote).filter(Upvote.discussion_id == discussion.id).count()
    has_upvoted = db.query(Upvote).filter(
        Upvote.discussion_id == discussion.id,
        Upvote.user_id == user.id
    ).first() is not None
    comments_count = db.query(Comment).filter(Comment.discussion_id == discussion.id).count()

    return DiscussionResponse(
        id=discussion.id,
        title=discussion.title,
        content=discussion.content,
        user=UserResponse(  # Convert SQLAlchemy User to UserResponse
            id=discussion.user.id,
            username=discussion.user.username
        ),
        timestamp=discussion.timestamp,
        upvotes_count=upvotes_count,
        has_upvoted=has_upvoted,
        comments_count=comments_count
    )