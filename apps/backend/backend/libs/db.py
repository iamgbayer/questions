import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.models.base import Base
from sqlalchemy.orm import scoped_session

engine = create_engine(os.environ.get("DATABASE_URL"))

Base.metadata.create_all(engine)

Session = scoped_session(sessionmaker(bind=engine))

def get_db():
    db = Session()
    return db