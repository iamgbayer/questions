import { HttpClient } from './http-client'

export interface AnswerQuizRequest {
  quiz_id: number
  answer: number
}

export interface AnswerQuizResponse {
  is_correct: boolean
  correct_answer: number
  user_answer: number
}

export class AnswerQuiz {
  public constructor(private readonly httpClient: HttpClient) {}

  public async execute(data: AnswerQuizRequest): Promise<AnswerQuizResponse> {
    try {
      const response = await this.httpClient.request({
        method: 'POST',
        url: `/quizzes/${data.quiz_id}/answer`,
        body: {
          answer: data.answer
        }
      })

      return response as AnswerQuizResponse
    } catch (error) {
      console.error(error)
      throw new Error('Failed to answer quiz')
    }
  }
}
