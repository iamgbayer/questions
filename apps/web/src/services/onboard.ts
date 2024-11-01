import { HttpClient } from './http-client'

type OnboardRequest = {
  email: string
  providerId: string
  photoUrl: string
}

type OnboardResponse = {
  id: string
}

export class Onboard {
  public constructor(private readonly httpClient: HttpClient) {}

  public async execute(data: OnboardRequest): Promise<string> {
    try {
      const response = await this.httpClient.request<OnboardResponse>({
        method: 'POST',
        url: '/onboard',
        body: data
      })

      return response.id
    } catch (error) {
      console.error(error)
      throw new Error('Failed to onboard')
    }
  }
}
