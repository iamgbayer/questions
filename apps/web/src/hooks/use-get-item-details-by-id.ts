import { QueryGetItemDetailsByIdArgs } from '@/gql/graphql'
import { GetItemDetailsById } from '@/services/get-item-details-by-id'
import { GraphQLHttpClient } from '@/services/graphql-http-client'
import { useQuery } from 'react-query'

export const useGetItemDetailsById = (data: QueryGetItemDetailsByIdArgs, options) => {
  const httpClient = new GraphQLHttpClient()

  return useQuery(
    ['get-item-details-by-id', data.id],
    async () => new GetItemDetailsById(httpClient).execute(data),
    {
      refetchOnWindowFocus: false,
      retry: false,
      ...options
    }
  )
}
