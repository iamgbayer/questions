import { GraphQLContext } from '@/app'
import { QueryGetItemDetailsByIdArgs } from '@/gql/graphql'
import { checkIsAuthenticated } from '@/services/check-is-authenticated'

export const getItemDetailsById = async (
  parent: unknown,
  args: QueryGetItemDetailsByIdArgs,
  context: GraphQLContext
) => {
  await checkIsAuthenticated(context)

  const where = {
    id: args.id,
  }

  const item = await context.prisma.item.findUnique({
    where,
    include: {
      product: true,
      price: true,
      store: true,
    }
  })

  return {
    item
  }
}
