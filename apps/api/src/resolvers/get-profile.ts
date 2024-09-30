import { GraphQLContext } from '@/app'
import { checkIsAuthenticated } from '@/services/check-is-authenticated'

export const getProfile = async (
  parent: unknown,
  args: unknown,
  context: GraphQLContext
) => {
  const userId = await checkIsAuthenticated(context)

  const items = await context.prisma.item.findMany({
    include: {
      product: true,
      price: true,
      store: true
    },
    where: {
      ownerId: userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const lists = context.prisma.list.findMany({
    where: {
      ownerId: userId
    }
  })

  const user = context.prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  const total = items.reduce((acc, item) => acc + item.price.value, 0)

  return {
    items,
    lists,
    user,
    total
  }
}
