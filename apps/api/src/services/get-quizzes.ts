import { db } from "@/lib/db"
import { Request, Response } from "express"
import { sql } from "kysely"
import { getUserId } from "./get-user-id"

export const getQuizzes = async (req: Request, res: Response) => {
  const userId = await getUserId(req)

  const quizzes = await db
    .selectFrom('quizzes')
    .leftJoin('user_quiz_attempts', 'quizzes.id', 'user_quiz_attempts.quiz_id')
    .select([
      'quizzes.id',
      'quizzes.question',
      'quizzes.difficulty',
      'quizzes.explanation',
      'quizzes.options',
      'quizzes.created_at',
      'quizzes.topic',
      db.fn.count('user_quiz_attempts.id').as('total_attempt_count'),
      sql<string>`MAX(CASE WHEN user_quiz_attempts.user_id = ${userId || null} THEN user_quiz_attempts.attempt_date ELSE NULL END)`.as('user_last_attempt_date')
    ])
    .groupBy('quizzes.id')
    .execute()

  const quizzesWithAttemptInfo = quizzes.map(quiz => {
    const total_attempt_count = Number(quiz.total_attempt_count)
    const user_last_attempt_date = quiz.user_last_attempt_date

    return {
      ...quiz,
      total_attempt_count,
      ...(userId ? {
        has_been_practiced: !!user_last_attempt_date,
        last_attempt_date: user_last_attempt_date
      } : {})
    }
  })

  return res.json(quizzesWithAttemptInfo)
}
