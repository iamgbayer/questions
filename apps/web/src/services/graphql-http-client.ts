import { GraphQLClient, Variables } from 'graphql-request'
import { GetToken } from './get-token'

export class GraphQLHttpClient {
  public async request<T>(query: string, variables?: Variables) {
    const token = await new GetToken().execute()

    const graphQLClient = new GraphQLClient(
      `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
      {
        headers: {
          authorization: `${token}`
        }
      }
    )

    return await graphQLClient.request<T>(query, variables)
  }
}
