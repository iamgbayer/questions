import { OnboardingInput } from '@/gql/graphql'
import { GraphQLHttpClient } from '@/services/graphql-http-client'
import { Onboarding } from '@/services/onboarding'
import { useMutation } from 'react-query'

export const useOnboarding = () => {
  const httpClient = new GraphQLHttpClient()

  return useMutation(
    async (data: OnboardingInput) =>
      new Onboarding(httpClient).execute(data),
  )
}
