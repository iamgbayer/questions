import { CreateItemInput } from '@/gql/graphql'
import { CreateItem } from '@/services/create-item'
import { GraphQLHttpClient } from '@/services/graphql-http-client'
import { useMutation, useQueryClient } from 'react-query'

export const useCreateItem = () => {
  const queryClient = useQueryClient()
  const httpClient = new GraphQLHttpClient()

  return useMutation(
    async (data: CreateItemInput) =>
      new CreateItem(httpClient).execute(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('get-profile')
      }
    }
  )
}
