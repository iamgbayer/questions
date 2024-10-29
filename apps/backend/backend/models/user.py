from datetime import datetime
from backend.models.base import Base
from sqlalchemy import String, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    created_at: Mapped[datetime] = mapped_column(DateTime)
    username: Mapped[str] = mapped_column(String(255))
    provider_id: Mapped[str] = mapped_column(String(255))