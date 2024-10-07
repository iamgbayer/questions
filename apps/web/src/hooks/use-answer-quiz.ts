import { AnswerQuiz, AnswerQuizRequest } from '@/services/answer-quiz'
import { HttpClient } from '@/services/http-client'
import { useMutation, useQueryClient } from 'react-query'

export const useAnswerQuiz = () => {
  const httpClient = new HttpClient()
  const queryClient = useQueryClient()

  return useMutation(
    async (data: AnswerQuizRequest) => new AnswerQuiz(httpClient).execute(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('quizzes')
      }
    }
  )
}
