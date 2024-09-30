import { GraphQLContext } from '@/app'
import { MutationUpdateItemDescriptionArgs } from '@/gql/graphql'
import { checkIsAuthenticated } from '@/services/check-is-authenticated'

export const updateItemDescription = async (
  parent: unknown,
  args: MutationUpdateItemDescriptionArgs,
  context: GraphQLContext
) => {
  await checkIsAuthenticated(context)

  const where = {
    id: args.input.id,
  }

  const item = await context.prisma.item.update({
    where,
    data: {
      description: args.input.description,
    }
  })

  return item
}
