from flask import Blueprint, Flask

routes = Blueprint('routes', __name__)

def init_routes(app: Flask):
    from backend.services.get_quizzes import get_quizzes
    from backend.services.answer_quiz import answer_quiz
    from backend.services.onboard import onboard
   
    routes.add_url_rule('/quizzes', view_func=get_quizzes, methods=['GET'])
    routes.add_url_rule('/quizzes/<quiz_id>/answer', view_func=answer_quiz, methods=['POST'])
    routes.add_url_rule('/onboard', view_func=onboard, methods=['POST'])
    
    app.register_blueprint(routes)
