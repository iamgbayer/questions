import { GraphQLContext } from '@/app'
import { MutationUpdateItemArgs } from '@/gql/graphql'
import { checkIsAuthenticated } from '@/services/check-is-authenticated'

export const updateItem = async (
  parent: unknown,
  args: MutationUpdateItemArgs,
  context: GraphQLContext
) => {
  await checkIsAuthenticated(context)

  const where = {
    id: args.input.id,
  }

  const data: Record<string, unknown> = {}

  if (args.input.labels !== undefined) {
    data.labels = args.input.labels
  }

  if (args.input.description !== undefined) {
    data.description = args.input.description
  }

  if (args.input.purchaseDate !== undefined) {
    data.purchaseDate = args.input.purchaseDate
  }

  if (args.input.bought !== undefined) {
    data.bought = args.input.bought
  }

  const item = await context.prisma.item.update({
    where,
    data,
  })

  return item
}
