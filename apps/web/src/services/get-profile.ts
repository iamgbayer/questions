import { gql } from 'graphql-request'
import { GraphQLHttpClient } from './graphql-http-client'
import { ProfileOutput } from '@/gql/graphql'

type GetProfileResponse = {
  getProfile: ProfileOutput
}

export class GetProfile {
  public constructor(private readonly httpClient: GraphQLHttpClient) {}

  public async execute(): Promise<ProfileOutput> {
    try {
      const query = gql`
        query getProfile {
          getProfile {
            user {
              id
              username
              language
              location
              onboarded
            }
            lists {
              id
              title
            }
            items {
              id
              url
              createdAt
              purchaseDate
              listId
              bought
              labels
              product {
                id
                title
                image
              }
              price {
                value
                currency
              }
              store {
                url
              }
            }
            total
          }
        }
      `

      const response = await this.httpClient.request<GetProfileResponse>(query)

      return response.getProfile
    } catch (error) {
      console.log(error)
      throw new Error('Failed to get profile')
    }
  }
}
