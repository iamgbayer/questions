from flask import jsonify, request
from backend.services.get_user_id import get_user_id
from backend.libs.db import get_db
from backend.models.user import User
def get_user():
    db = get_db()
    user_id = get_user_id(request)
    user = db.query(User).where(User.id == user_id).first()
    
    return {
        'id': user.id,
        'email': user.email,
        'username': user.username
    }
