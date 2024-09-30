import { GraphQLContext } from '@/app'
import { MutationCreateListArgs } from '@/gql/graphql'
import { checkIsAuthenticated } from '@/services/check-is-authenticated'

export const createList = async (
  parent: unknown,
  args: MutationCreateListArgs,
  context: GraphQLContext
) => {
  const userId = await checkIsAuthenticated(context)

  return context.prisma.list.create({
    data: {
      title: args.input.title,
      isPublic: args.input.isPublic,
      ownerId: userId,
    }
  })
}
