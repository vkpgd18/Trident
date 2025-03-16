from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import discussions as discussions_routes
from routes import auth as auth_routes
import models  # MUST be imported before metadata creation

# Create tables FIRST
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Trident API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(discussions_routes.router, prefix="/api/discussions", tags=["Discussions"])
app.include_router(auth_routes.router)

@app.get("/")
def root():
    return {"message": "Trident API Service"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}