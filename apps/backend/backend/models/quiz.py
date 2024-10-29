from datetime import datetime
from backend.models.base import Base
from sqlalchemy import String, Integer, DateTime, ARRAY
from sqlalchemy.orm import Mapped, mapped_column

class Quiz(Base):
    __tablename__ = "quizzes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    question: Mapped[str] = mapped_column(String(255))
    options: Mapped[list[str]] = mapped_column(ARRAY(String))
    explanation: Mapped[str] = mapped_column(String(255))
    correct_answer: Mapped[int] = mapped_column(Integer)
    difficulty: Mapped[str] = mapped_column(String(255))
    topic: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
