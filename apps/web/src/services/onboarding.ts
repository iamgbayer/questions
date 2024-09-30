import { gql } from 'graphql-request'
import { GraphQLHttpClient } from './graphql-http-client'
import { OnboardingInput } from '@/gql/graphql'

type OnboardingResponse = {
  onboarding: {
    id: string
  }
}

export class Onboarding {
  public constructor(private readonly httpClient: GraphQLHttpClient) {}

  public async execute(data: OnboardingInput): Promise<string> {
    try {
      const query = gql`
        mutation onboarding(
          $username: String!
          $language: String!
          $location: String!
        ) {
          onboarding(
            input: {
              username: $username
              language: $language
              location: $location
            }
          ) {
            id
          }
        }
      `

      const variables = {
        username: data.username,
        language: data.language,
        location: data.location,
      }

      const response = await this.httpClient.request<OnboardingResponse>(
        query,
        variables
      )

      return response.onboarding.id
    } catch (error) {
      console.error(error)
      throw new Error('Failed to onboard')
    }
  }
}
