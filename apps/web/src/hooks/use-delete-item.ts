import { DeleteItemInput } from '@/list/gql'
import { DeleteItem } from '@/services/delete-item'
import { GraphQLHttpClient } from '@/services/graphql-http-client'
import { useMutation, useQueryClient } from 'react-query'

export const useDeleteItem = () => {
  const queryClient = useQueryClient()
  const httpClient = new GraphQLHttpClient()

  return useMutation(
    async (data: DeleteItemInput) =>
      new DeleteItem(httpClient).execute(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('get-profile')
      }
    }
  )
}
