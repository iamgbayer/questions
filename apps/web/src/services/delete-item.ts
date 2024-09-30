import { gql } from 'graphql-request'
import { GraphQLHttpClient } from './graphql-http-client'
import { DeleteItemInput } from '@/list/gql'

type DeleteItemResponse = {
  deleteItem: {
    id: string
  }
}

export class DeleteItem {
  public constructor(private readonly httpClient: GraphQLHttpClient) {}

  public async execute(data: DeleteItemInput): Promise<string> {
    try {
      const query = gql`
        mutation deleteItem(
          $id: ID!
        ) {
          deleteItem(
            input: {
              id: $id
            }
          )
        }
      `

      const variables: DeleteItemInput = {
        id: data.id,
      }

      const response = await this.httpClient.request<DeleteItemResponse>(
        query,
        variables
      )

      return response.deleteItem.id
    } catch (error) {
      console.error(error)
      throw new Error('Failed to delete item')
    }
  }
}
