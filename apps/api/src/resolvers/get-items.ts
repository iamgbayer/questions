import { GraphQLContext } from '@/app'
import { QueryGetItemsArgs } from '@/gql/graphql'
import { checkIsAuthenticated } from '@/services/check-is-authenticated'

export const getItems = async (
  parent: unknown,
  args: QueryGetItemsArgs,
  context: GraphQLContext
) => {
  const userId = await checkIsAuthenticated(context)

  const where: Record<string, string> = {
    ownerId: userId,
  }

  if (args.listId) {
    where.listId = args.listId
  }

  const items = await context.prisma.item.findMany({
    include: {
      product: true,
      price: true,
      store: true
    },
    where,
    orderBy: {
      createdAt: 'desc'
    }
  })

  return items
}
