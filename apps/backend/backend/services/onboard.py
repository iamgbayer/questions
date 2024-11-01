from backend.libs.db import get_db
from flask import request
from backend.models.user import User

def onboard():
  db = get_db()
  provider_id = request.json.get('providerId')
  user = db.query(User).where(User.provider_id == provider_id).first()
  
  if not user:
    email = request.json.get('email')
    username = email.split('@')[0]
    photo_url = request.json.get('photoUrl')
    user = User(email=email, username=username, provider_id=provider_id, photo_url=photo_url)
    db.add(user)
    db.commit()
    
    return {
      "email": user.email,
      "username": user.username,
      "photo_url": user.photo_url,
      "provider_id": user.provider_id,
      "is_onboarded": user.is_onboarded
    }, 200
  
  return {
    "email": user.email,
    "username": user.username,
    "photo_url": user.photo_url,
    "provider_id": user.provider_id,
    "is_onboarded": user.is_onboarded
  }, 200

