import { gql } from 'graphql-request'
import { GraphQLHttpClient } from './graphql-http-client'
import { QueryGetProductByUrlArgs} from '@/gql/graphql'
import { ProductDetails } from '@/list/gql'

type GetMyListsResponse = {
  getProductByUrl: ProductDetails[]
}

export class GetProductByUrl {
  public constructor(private readonly httpClient: GraphQLHttpClient) {}

  public async execute(data: QueryGetProductByUrlArgs): Promise<ProductDetails[]> {
    try {
      const query = gql`
        query getProductByUrl($url: String!) {
          getProductByUrl(url: $url) {
            title
            price
            store
            image
            currency
          }
        }
      `

      const variables = {
        url: data.url
      }

      const response = await this.httpClient.request<GetMyListsResponse>(query, variables)

      return response.getProductByUrl
    } catch (error) {
      throw new Error('Failed to get product by URL')
    }
  }
}
