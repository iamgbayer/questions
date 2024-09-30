import { gql } from 'graphql-request'
import { GraphQLHttpClient } from './graphql-http-client'
import { QueryGetItemDetailsByIdArgs, ItemDetailsOutput } from '@/gql/graphql'

type GetItemDetailsByIdResponse = {
  getItemDetailsById: ItemDetailsOutput
}

export class GetItemDetailsById {
  public constructor(private readonly httpClient: GraphQLHttpClient) {}

  public async execute(data: QueryGetItemDetailsByIdArgs): Promise<ItemDetailsOutput> {
    try {
      const query = gql`
        query getItemDetailsById($id: ID!) {
          getItemDetailsById(id: $id) {
            item {
              id
              description
              labels
              bought
              product {
                title
                id
                image
              }
              price {
                value
                currency
              }
              store {
                url
              }
              description
              createdAt
              url
            }
          }
        }
      `

      const variables = {
        id: data.id
      }

      const response = await this.httpClient.request<GetItemDetailsByIdResponse>(query, variables)

      return response.getItemDetailsById
    } catch (error) {
      throw new Error('Failed to get item details by id')
    }
  }
}
