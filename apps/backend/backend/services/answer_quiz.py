from backend.services.get_user_id import get_user_id
from flask import request
from backend.libs.db import db
from backend.models.quiz import Quiz
from backend.models.user_quiz_attempt import UserQuizAttempt

def answer_quiz(quiz_id: str):
  user_id = get_user_id(request)
  
  if not user_id:
    return {"error": "User not found"}, 401
  
  quiz = db.query(Quiz).where(Quiz.id == quiz_id).first()
  
  if not quiz:
    return {"error": "Quiz not found"}, 404
  
  answer = request.json.get("answer") 
  
  is_correct = quiz.correct_answer == answer
  
  user_quiz_attempt = UserQuizAttempt(
    user_id=user_id,
    quiz_id=quiz_id,
    user_answer=answer,
    is_correct=is_correct
  )
  
  db.add(user_quiz_attempt)
  db.commit()

  return {
    "is_correct": is_correct,
    "user_answer": answer,
    "correct_answer": quiz.correct_answer
  }, 200

