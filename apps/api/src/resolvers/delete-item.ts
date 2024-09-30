import { GraphQLContext } from '@/app'
import { MutationDeleteItemArgs } from '@/list/gql'
import { checkIsAuthenticated } from '@/services/check-is-authenticated'

export const deleteItem = async (
  parent: unknown,
  args: MutationDeleteItemArgs,
  context: GraphQLContext
) => {
  const userId = await checkIsAuthenticated(context)

  const item = await context.prisma.item.delete({
    where: {
      id: args.input.id,
      ownerId: userId,
    }
  })

  return item.id
}
