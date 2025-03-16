# schemas.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    class Config:
        orm_mode = True

class DiscussionBase(BaseModel):
    title: str
    content: str

class DiscussionCreate(DiscussionBase):
    pass

class DiscussionResponse(DiscussionBase):
    id: int
    user: UserResponse  # Changed from user_id to user
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
    user: UserResponse  # Changed from user_id to user
    discussion_id: int
    timestamp: datetime
    parent_comment_id: Optional[int]
    replies: List['CommentResponse'] = []
    class Config:
        orm_mode = True

class UpvoteResponse(BaseModel):
    discussion_id: int
    user_id: int
    class Config:
        orm_mode = True

# Fix forward reference
CommentResponse.update_forward_refs()