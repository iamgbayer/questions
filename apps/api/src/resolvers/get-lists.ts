import { GraphQLContext } from '@/app'
import { checkIsAuthenticated } from '@/services/check-is-authenticated'

export const getLists = async (
  parent: unknown,
  args: unknown,
  context: GraphQLContext
) => {
  const userId = await checkIsAuthenticated(context)

  const lists = context.prisma.list.findMany({
    where: {
      ownerId: userId
    }
  })

  return lists
}
