import { gql } from 'graphql-request'
import { GraphQLHttpClient } from './graphql-http-client'
import { UpdateItemDescriptionInput } from '@/gql/graphql'
import { UpdateItemInput } from '@/list/gql'

type UpdateItemResponse = {
  updateItem: {
    id: string
  }
}

export class UpdateItem {
  public constructor(private readonly httpClient: GraphQLHttpClient) {}

  public async execute(data: UpdateItemInput): Promise<string> {
    try {
      const query = gql`
        mutation updateItem(
          $id: ID!
          $description: String
          $bought: Boolean
          $isPublic: Boolean
          $purchaseDate: DateTime
          $labels: [String]
        ) {
          updateItem(
            input: {
              id: $id
              description: $description
              bought: $bought
              isPublic: $isPublic
              labels: $labels
              purchaseDate: $purchaseDate
            }
          ) {
            id
          }
        }
      `

      const variables: UpdateItemInput = data

      const response = await this.httpClient.request<UpdateItemResponse>(
        query,
        variables
      )

      return response.updateItem.id
    } catch (error) {
      throw new Error('Failed to update item')
    }
  }
}
