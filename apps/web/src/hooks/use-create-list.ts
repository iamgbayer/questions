import { CreateListInput } from '@/gql/graphql'
import { CreateList } from '@/services/create-list'
import { GraphQLHttpClient } from '@/services/graphql-http-client'
import { useMutation, useQueryClient } from 'react-query'

export const useCreateList = () => {
  const queryClient = useQueryClient()
  const httpClient = new GraphQLHttpClient()

  return useMutation(
    async (data: CreateListInput) =>
      new CreateList(httpClient).execute(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('my-lists')
      }
    }
  )
}
