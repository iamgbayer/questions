import { useQuery } from 'react-query'
import { HttpClient } from '@/services/http-client'
import { GetQuizzes } from '@/services/get-quizzes'

export const useGetQuizzes = () => {
  const httpClient = new HttpClient()

  return useQuery('quizzes', () => new GetQuizzes(httpClient).execute(), {
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false,
  })
}
