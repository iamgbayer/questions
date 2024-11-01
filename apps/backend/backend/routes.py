from flask import Blueprint, Flask

routes = Blueprint('routes', __name__)

def init_routes(app: Flask):
    from backend.services.get_quizzes import get_quizzes
    from backend.services.answer_quiz import answer_quiz
    from backend.services.onboard import onboard
    from backend.services.get_user import get_user
    from backend.services.get_ranking import get_ranking
    routes.add_url_rule('/quizzes', view_func=get_quizzes, methods=['GET'])
    routes.add_url_rule('/quizzes/<quiz_id>/answer', view_func=answer_quiz, methods=['POST'])
    routes.add_url_rule('/onboard', view_func=onboard, methods=['POST'])
    routes.add_url_rule('/user', view_func=get_user, methods=['GET'])
    routes.add_url_rule('/ranking', view_func=get_ranking, methods=['GET'])
    
    app.register_blueprint(routes)
