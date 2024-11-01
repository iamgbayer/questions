from backend.models.user import User
from backend.libs.db import get_db

def get_ranking():
  db = get_db()
  users = db.query(User).add_columns(User.username, User.points).order_by(User.points.desc()).all()
  
  return users