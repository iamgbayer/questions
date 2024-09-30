import { GraphQLContext } from '@/app'
import { checkIsAuthenticated } from './check-is-authenticated'
import { isNil } from 'lodash'
import { GraphQLError } from 'graphql'

export const checkIsAdmin = async (
  context: GraphQLContext
): Promise<string> => {
  const providerId = await checkIsAuthenticated(context)

  const user = await context.prisma.user.findUnique({
    where: { providerId }
  })

  if (isNil(user)) {
    throw new GraphQLError('Not authorized')
  }

  if (!user.isAdmin) {
    throw new GraphQLError('Not authorized')
  }

  return user.id
}
