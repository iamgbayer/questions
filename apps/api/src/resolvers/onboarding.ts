import { GraphQLContext } from '@/app'
import { MutationOnboardingArgs } from '@/gql/graphql'
import { checkIsAuthenticated } from '@/services/check-is-authenticated'

export const onboarding = async (
  parent: unknown,
  args: MutationOnboardingArgs,
  context: GraphQLContext
) => {
  const userId = await checkIsAuthenticated(context)

  return context.prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username: args.input.username,
      language: args.input.language,
      location: args.input.location,
      onboarded: true,
    }
  })
}
