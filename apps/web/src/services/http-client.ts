import { GetToken } from './get-token'

type HttpClientRequest = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: Record<string, unknown>
}

export class HttpClient {
  public async request<T>({ url, method, body }: HttpClientRequest): Promise<T> {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}${url}`
    
    try {
      const token = await new GetToken().execute()

      const headers = {
        'Content-Type': 'application/json'
      }

      if (token) {
        headers['authorization'] = token
      }
      
      const response = await fetch(URL, {
        method,
        headers,
        body: JSON.stringify(body)
      })
      
      return await response.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
