import { db } from "@/lib/db"
import { getUserId } from "./get-user-id"

export const answerQuiz = async (req, res) => {
  const { answer } = req.body
  const { quiz_id } = req.params
  const user_id = await getUserId(req)

  console.log('user_id', user_id)

  const quiz = await db
    .selectFrom('quizzes')
    .where('id', '=', quiz_id)
    .select(['correct_answer'])
    .executeTakeFirst()

  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' })
  }

  const is_correct = quiz.correct_answer === answer

  await db
    .insertInto('user_quiz_attempts')
    .values({
      quiz_id,
      user_id,
      user_answer: answer,
      is_correct
    })
    .execute()

  return res.json({
    is_correct,
    correct_answer: quiz.correct_answer,
    user_answer: answer
  })
}
