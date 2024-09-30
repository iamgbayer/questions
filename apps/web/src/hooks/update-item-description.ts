import { UpdateItemDescriptionInput } from '@/list/gql'
import { UpdateItemDescription } from '@/services/update-item-description'
import { GraphQLHttpClient } from '@/services/graphql-http-client'
import { useMutation } from 'react-query'

export const useUpdateItemDescription = () => {
  const httpClient = new GraphQLHttpClient()

  return useMutation(
    async (data: UpdateItemDescriptionInput) =>
      new UpdateItemDescription(httpClient).execute(data),
  )
}
