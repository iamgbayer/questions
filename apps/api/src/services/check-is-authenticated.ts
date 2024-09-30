import { GraphQLContext } from '@/app'
import { GraphQLError } from 'graphql'
import * as firebase from 'firebase-admin/auth'

export const checkIsAuthenticated = async (
  context: GraphQLContext
): Promise<string> => {
  if (!context.token) {
    throw new GraphQLError('Not authenticated')
  }

  try {
    const payload = await firebase.getAuth().verifyIdToken(context.token)

    const user = await context.prisma.user.findUnique({
      where: { providerId: payload.sub }
    })

    if (!user) {
      throw new GraphQLError('User not found')
    }

    return user.id
  } catch (error) {
    console.error(error)
    throw new GraphQLError('Not authenticated')
  }
}
