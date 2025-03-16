# models.py
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    
    upvotes = relationship("Upvote", back_populates="user")
    comments = relationship("Comment", back_populates="user")

class Discussion(Base):
    __tablename__ = "discussions"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    timestamp = Column(DateTime, server_default=func.now())
    
    user = relationship("User")
    comments = relationship("Comment", back_populates="discussion")
    upvotes = relationship("Upvote", back_populates="discussion")

class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    discussion_id = Column(Integer, ForeignKey("discussions.id"), nullable=False)
    parent_comment_id = Column(Integer, ForeignKey("comments.id"))
    timestamp = Column(DateTime, server_default=func.now())
    
    user = relationship("User", back_populates="comments")
    discussion = relationship("Discussion", back_populates="comments")
    replies = relationship("Comment", backref="parent_comment", remote_side=[id])

class Upvote(Base):
    __tablename__ = "upvotes"
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    discussion_id = Column(Integer, ForeignKey("discussions.id"), primary_key=True)
    
    user = relationship("User", back_populates="upvotes")
    discussion = relationship("Discussion", back_populates="upvotes")