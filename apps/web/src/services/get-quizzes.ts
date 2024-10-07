import { HttpClient } from "./http-client";

export interface Quiz {
  id: number
  question: string
  options: string[]
  difficulty: string
  topic: string
  correct_answer: string
  explanation: string
  created_at: Date
  has_been_practiced: boolean
  total_attempt_count: number | null
}

export class GetQuizzes {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(): Promise<Quiz[]> {
    const response = await this.httpClient.request<Quiz[]>({
      method: 'GET',
      url: '/quizzes',
    })

    return response
  }
}
