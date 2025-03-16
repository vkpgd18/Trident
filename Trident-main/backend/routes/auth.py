from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
from models import User
from schemas import UserCreate, UserResponse
from utils.auth import (
    get_password_hash,
    authenticate_user,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import os
import logging
import secrets

router = APIRouter(prefix="/auth", tags=["Authentication"])
logger = logging.getLogger(__name__)

# Configuration
GOOGLE_CLIENT_ID = "411571053593-fb4h3tfkin4qgfogp2st1o3o0fmnler1.apps.googleusercontent.com"
CLOCK_SKEW_SECONDS = 60  # Increased time synchronization window

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        if "@" not in user.username or "." not in user.username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid email format"
            )

        existing_user = db.query(User).filter(User.username == user.username).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        hashed_password = get_password_hash(user.password)
        new_user = User(username=user.username, hashed_password=hashed_password)
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        logger.info(f"New user registered: {new_user.username}")
        return new_user

    except HTTPException as he:
        raise he
    except Exception as e:
        db.rollback()
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Registration failed. Please try again."
        )

@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        logger.warning(f"Failed login attempt for: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/google")
async def google_auth(
    token: str = Body(..., embed=True, description="Google ID token"), 
    db: Session = Depends(get_db)
):
    try:
        # Verify and decode the Google ID token
        idinfo = id_token.verify_oauth2_token(
            token,
            google_requests.Request(),
            audience=GOOGLE_CLIENT_ID,
            clock_skew_in_seconds=CLOCK_SKEW_SECONDS
        )

        # Validate token structure
        if idinfo.get("iss") not in ["accounts.google.com", "https://accounts.google.com"]:
            logger.error(f"Invalid token issuer: {idinfo.get('iss')}")
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid authentication provider"
            )

        if not idinfo.get("email_verified", False):
            logger.error("Google email not verified")
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Email not verified by Google"
            )

        email = idinfo["email"]
        logger.info(f"Processing Google auth for: {email}")

        # Find or create user
        user = db.query(User).filter(User.username == email).first()
        if not user:
            logger.info(f"Creating new user for Google email: {email}")
            random_password = secrets.token_urlsafe(32)  # Secure random password
            new_user = User(
                username=email,
                hashed_password=get_password_hash(random_password)
            )
            db.add(new_user)
            try:
                db.commit()
                db.refresh(new_user)
                user = new_user
            except Exception as e:
                db.rollback()
                logger.error(f"User creation failed: {str(e)}")
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="User account creation failed"
                )

        # Generate JWT
        access_token = create_access_token(
            data={"sub": user.username},
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        
        return {"access_token": access_token, "token_type": "bearer"}

    except ValueError as ve:
        logger.error(f"Token validation failed: {str(ve)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired Google token"
        )
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Authentication error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Authentication service unavailable"
        )