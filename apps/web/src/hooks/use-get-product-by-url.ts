import { QueryGetProductByUrlArgs } from '@/gql/graphql'
import {  GetProductByUrl } from '@/services/get-product-by-url'
import { GraphQLHttpClient } from '@/services/graphql-http-client'
import { useMutation } from 'react-query'

export const useGetProductByUrl = () => {
  const httpClient = new GraphQLHttpClient()

  return useMutation(
    'get-product-by-url',
    async (data: QueryGetProductByUrlArgs) => new GetProductByUrl(httpClient).execute(data),
    {
      retry: false
    }
  )
}
