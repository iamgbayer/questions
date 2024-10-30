from backend.libs.db import get_db
from flask import request
from backend.models.user import User

def onboard():
  db = get_db()
  provider_id = request.json.get('providerId')
  user = db.query(User).where(User.provider_id == provider_id).first()
  
  if not user:
    return { "error": "User not found" }, 404
  
  if user.is_onboarded == False:
    email = request.json.get('email')
    username = email.split('@')[0]

    user = db.insert('users').values(email=email, username=username, provider_id=provider_id).returning(User).execute_one()
    db.commit()

  return {
    "email": user.email,
    "username": user.username,
    "provider_id": user.provider_id,
    "is_onboarded": user.is_onboarded
  }, 200

