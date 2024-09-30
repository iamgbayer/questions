import { GetProfile } from '@/services/get-profile'
import { GraphQLHttpClient } from '@/services/graphql-http-client'
import { useQuery } from 'react-query'

export const useGetProfile = () => {
  const httpClient = new GraphQLHttpClient()

  return useQuery('get-profile', async () => new GetProfile(httpClient).execute(), {
    refetchOnWindowFocus: false,
    retry: false,
    initialData: {
      items: [],
      lists: [],
      user: {
        username: '',
        email: '',
        createdAt: '',
        id: '',
        isAdmin: false,
        password: '',
        onboarded: true,
        language: '',
        location: ''
      },
      total: 0
    }
  })
}
