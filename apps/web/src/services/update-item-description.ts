import { gql } from 'graphql-request'
import { GraphQLHttpClient } from './graphql-http-client'
import { UpdateItemDescriptionInput } from '@/gql/graphql'

type UpdateItemDescriptionResponse = {
  updateItemDescription: {
    id: string
  }
}

export class UpdateItemDescription {
  public constructor(private readonly httpClient: GraphQLHttpClient) {}

  public async execute(data: UpdateItemDescriptionInput): Promise<string> {
    try {
      const query = gql`
        mutation updateItemDescription(
          $id: ID!
          $description: String!
        ) {
          updateItemDescription(
            input: {
              id: $id
              description: $description
            }
          ) {
            id
          }
        }
      `

      const variables: UpdateItemDescriptionInput = {
        id: data.id,
        description: data.description || '',
      }

      const response = await this.httpClient.request<UpdateItemDescriptionResponse>(
        query,
        variables
      )

      return response.updateItemDescription.id
    } catch (error) {
      console.error(error)
      throw new Error('Failed to update item description')
    }
  }
}
