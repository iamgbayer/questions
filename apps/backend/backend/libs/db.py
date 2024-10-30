import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.models.base import Base
from sqlalchemy.orm import scoped_session

engine = create_engine(os.environ.get("DATABASE_URL"))

Base.metadata.create_all(engine)

SessionLocal = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        db.rollback()  # Roll back any failed transaction
        raise e
    finally:
        db.close()  # Close the session after use