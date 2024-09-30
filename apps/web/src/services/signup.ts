import { gql } from 'graphql-request'
import { GraphQLHttpClient } from './graphql-http-client'
import { SignupInput } from '@/gql/graphql'

type SignupResponse = {
  signup: {
    id: string
  }
}

export class Signup {
  public constructor(private readonly httpClient: GraphQLHttpClient) {}

  public async execute(data: SignupInput): Promise<string> {
    try {
      const query = gql`
        mutation signup(
          $email: String!
          $providerId: String!
          $provider: String!
        ) {
          signup(
            input: {
              email: $email
              providerId: $providerId
              provider: $provider
            }
          ) {
            id
          }
        }
      `

      const variables: SignupInput = {
        email: data.email,
        providerId: data.providerId,
        provider: data.provider,
      }

      const response = await this.httpClient.request<SignupResponse>(
        query,
        variables
      )

      return response.signup.id
    } catch (error) {
      console.error(error)
      throw new Error('Failed to signup')
    }
  }
}
