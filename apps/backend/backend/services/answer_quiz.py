from backend.services.get_user_id import get_user_id
from flask import request
from backend.libs.db import get_db
from backend.models.quiz import Quiz
from backend.models.user_quiz_attempt import UserQuizAttempt
from backend.models.user import User

def answer_quiz(quiz_id: str):
  db = get_db()
  user_id = get_user_id(request)
  
  if not user_id:
    return {"error": "User not found"}, 401
  
  quiz = db.query(Quiz).where(Quiz.id == quiz_id).first()
  
  if not quiz:
    return {"error": "Quiz not found"}, 404
  
  answer: int = request.json.get("answer") 
  
  is_correct = quiz.correct_answer == answer
  
  user_quiz_attempt = UserQuizAttempt(
    user_id=user_id,
    quiz_id=quiz_id,
    user_answer=answer,
    is_correct=is_correct
  )
  
  user = db.query(User).where(User.id == user_id).first()
  
  if is_correct:
    user.points += 10
  else:
    user.points -= 5
  
  db.add(user_quiz_attempt)
  db.add(user)
  db.commit()

  return {
    "is_correct": is_correct,
    "user_answer": answer,
    "correct_answer": quiz.correct_answer,
    "points": user.points
  }

