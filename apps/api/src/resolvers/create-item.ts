import { GraphQLContext } from '@/app'
import { MutationCreateItemArgs } from '@/gql/graphql'
import { checkIsAuthenticated } from '@/services/check-is-authenticated'

export const createItem = async (
  parent: unknown,
  args: MutationCreateItemArgs,
  context: GraphQLContext
) => {
  const userId = await checkIsAuthenticated(context)

  return context.prisma.$transaction(async (prisma) => {
    // Find or create store
    const store = await prisma.store.upsert({
      where: { url: args.input.store },
      update: {},
      create: {
        url: args.input.store,
        name: args.input.store
      },
    })

    // Find or create product
    const product = await prisma.product.upsert({
      where: { title: args.input.title },
      update: {},
      create: {
        title: args.input.title,
        keywords: [],
        image: args.input.image,
      },
    })

    const data = {
      data: {
        url: args.input.url,
        ownerId: userId,
        price: {
          create: {
            currency: args.input.currency,
            value: args.input.price,
            storeId: store.id,
            productId: product.id,
          },
        },
        store: {
          connect: {
            id: store.id
          }
        },
        product: {
          connect: {
            id: product.id,
            title: product.title,
            image: product.image,
          }
        },
        priority: args.input.priority,
      }
    }

    if (args.input.listId) {
      data.data['list'] = {
        connect: {
          id: args.input.listId
        }
      }
    }

    // Create item
    return prisma.item.create(data)
  })
}
