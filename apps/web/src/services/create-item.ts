import { gql } from 'graphql-request'
import { GraphQLHttpClient } from './graphql-http-client'
import { CreateItemInput } from '@/gql/graphql'

type CreateQuestionResponse = {
  createItem: {
    id: string
  }
}

export class CreateItem {
  public constructor(private readonly httpClient: GraphQLHttpClient) {}

  public async execute(data: CreateItemInput): Promise<string> {
    try {
      const query = gql`
        mutation createItem(
          $title: String!
          $url: String
          $currency: String!
          $price: Float!
          $image: String
          $store: String!
          $priority: Int
          $listId: ID
        ) {
          createItem(
            input: {
              title: $title
              url: $url
              currency: $currency
              price: $price
              image: $image
              store: $store
              priority: $priority
              listId: $listId
            }
          ) {
            id
          }
        }
      `

      const variables: CreateItemInput = {
        title: data.title,
        url: data.url,
        listId: data.listId,
        currency: data.currency || 'BRL',
        price: data.price || 0,
        image: data.image,
        store: data.store,
        priority: data.priority,
      }

      const response = await this.httpClient.request<CreateQuestionResponse>(
        query,
        variables
      )

      return response.createItem.id
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create item')
    }
  }
}
