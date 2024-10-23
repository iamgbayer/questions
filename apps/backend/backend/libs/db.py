import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.models.base import Base

engine = create_engine(os.environ.get("DATABASE_URL"))

Base.metadata.create_all(engine)

session = sessionmaker(bind=engine)
db = session()
