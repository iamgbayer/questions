import { HttpClient } from "@/services/http-client"

export type User = {
  id: string
  email: string
  username: string
}

export class GetUser {
  constructor(private readonly httpClient: HttpClient) {}

  async execute() {
    const response = await this.httpClient.request<User>({
      method: 'GET',
      url: '/user',
    })

    return response
  }
}
