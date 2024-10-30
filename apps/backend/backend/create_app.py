from flask import Flask
from dotenv import load_dotenv
from backend.routes import init_routes
from flask_cors import CORS

def create_app():
    load_dotenv()

    app = Flask(__name__)
    CORS(app)
    init_routes(app)
    
    from backend.libs.db import Session
    
    @app.teardown_appcontext
    def shutdown_session(exception=None):
        Session.remove()
    
    return app

