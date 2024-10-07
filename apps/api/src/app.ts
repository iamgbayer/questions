import cors from 'cors'
import { signup } from './services/signup'
import { getQuizzes } from './services/get-quizzes'
import { answerQuiz } from './services/answer-quiz'

export async function buildApp(app) {
  app.use(cors())

  app.post('/signup', signup)

  app.get('/quizzes', getQuizzes)
  app.post('/quizzes/:quiz_id/answer', answerQuiz)
}
