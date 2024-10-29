from backend.models.user import User
from backend.libs.supabase import supabase
from backend.libs.db import db
from flask import Request

def get_user_id(request: Request):
    token = request.headers.get('Authorization')
    if not token:
        return None
    
    try:
        payload = supabase.auth.get_user(token)
        if not payload.user:
            return None
        
        user = db.query(User).filter(User.provider_id == payload.user.id).first()
        return user.id if user else None
    except:
        return None