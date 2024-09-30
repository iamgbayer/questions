import { gql } from 'graphql-request'
import { GraphQLHttpClient } from './graphql-http-client'
import { CreateListInput, MutationCreateListArgs } from '@/gql/graphql'

type CreateListResponse = {
  createList: {
    id: string
  }
}

export class CreateList {
  public constructor(private readonly httpClient: GraphQLHttpClient) {}

  public async execute(data: CreateListInput): Promise<string> {
    try {
      const query = gql`
        mutation createList(
          $title: String!
          $isPublic: Boolean!
        ) {
          createList(
            input: {
              title: $title
              isPublic: $isPublic
            }
          ) {
            id
          }
        }
      `

      const variables = {
        title: data.title,
        isPublic: false,
      }

      const response = await this.httpClient.request<CreateListResponse>(
        query,
        variables
      )

      return response.createList.id
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create list')
    }
  }
}
