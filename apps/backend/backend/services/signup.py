from backend.libs.db import db
from flask import request

def signup():
  email = request.json.get('email')
  provider_id = request.json.get('providerId')
  username = email.split('@')[0]

  user = db.insert('users').values(email=email, username=username, provider_id=provider_id).on_conflict_do_update(target=['email'], set_={'provider_id': provider_id}).returning('id').execute_one()

  return user

