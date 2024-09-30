import { UpdateItemInput } from '@/list/gql'
import { UpdateItem } from '@/services/update-item'
import { GraphQLHttpClient } from '@/services/graphql-http-client'
import { useMutation, useQueryClient } from 'react-query'

export const useUpdateItem = () => {
  const httpClient = new GraphQLHttpClient()
  const queryClient = useQueryClient()

  return useMutation(
    async (data: UpdateItemInput) =>
      new UpdateItem(httpClient).execute(data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['get-item-details-by-id', data])
      }
    }
  )
}
