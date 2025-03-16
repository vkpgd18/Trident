from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import User
from utils.auth import get_password_hash

DATABASE_URL = "sqlite:///./app.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def create_user(username: str, password: str):
    db = SessionLocal()
    try:
        hashed_pw = get_password_hash(password)
        user = User(username=username, hashed_password=hashed_pw)
        db.add(user)
        db.commit()
        print(f"Created user: {username}")
    finally:
        db.close()

if __name__ == "__main__":
    create_user("pratham", "1828")