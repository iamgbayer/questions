from flask import jsonify, request
from sqlalchemy import func
from sqlalchemy.orm import aliased
from backend.models.quiz import Quiz
from backend.models.user_quiz_attempt import UserQuizAttempt
from backend.services.get_user_id import get_user_id
from backend.libs.db import get_db
from sqlalchemy import case

def get_quizzes():
    db = get_db()
    user_id = get_user_id(request)
    
    uqa = aliased(UserQuizAttempt)

    quizzes = db.query(
        Quiz,
        func.count(uqa.id).label('total_attempt_count'),
        func.max(case(
            (uqa.user_id == user_id, uqa.created_at),
            else_=None
        )).label('user_last_attempt_date')
    ).outerjoin(uqa, Quiz.id == uqa.quiz_id).group_by(Quiz.id).all()
    
    quizzes_with_attempt_info = []
    for quiz, total_attempt_count, user_last_attempt_date in quizzes:
        quiz_dict = {
            'id': quiz.id,
            'question': quiz.question,
            'difficulty': quiz.difficulty,
            'explanation': quiz.explanation,
            'options': quiz.options,
            'created_at': quiz.created_at,
            'topic': quiz.topic,
            'total_attempt_count': total_attempt_count
        }
        
        if user_id:
            quiz_dict.update({
                'has_been_practiced': bool(user_last_attempt_date),
                'last_attempt_date': user_last_attempt_date
            })
        
        quizzes_with_attempt_info.append(quiz_dict)

    return jsonify(quizzes_with_attempt_info)
