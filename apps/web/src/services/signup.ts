import { HttpClient } from './http-client'

type SignupRequest = {
  email: string
  providerId: string
}

type SignupResponse = {
  id: string
}

export class Signup {
  public constructor(private readonly httpClient: HttpClient) {}

  public async execute(data: SignupRequest): Promise<string> {
    try {
      const response = await this.httpClient.request<SignupResponse>({
        method: 'POST',
        url: '/signup',
        body: data
      })

      return response.id
    } catch (error) {
      console.error(error)
      throw new Error('Failed to signup')
    }
  }
}
