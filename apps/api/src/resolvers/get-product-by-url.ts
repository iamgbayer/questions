import { GraphQLContext } from '@/app'
import { QueryGetProductByUrlArgs } from '@/gql/graphql'
import { checkIsAuthenticated } from '@/services/check-is-authenticated'
import { GetProductFromJsonLd } from '@/services/get-product-from-json-ld'
import { GraphQLError } from 'graphql'

export const getProductByUrl = async (
  parent: unknown,
  args: QueryGetProductByUrlArgs,
  context: GraphQLContext
) => {
  await checkIsAuthenticated(context)

  // later on, we will add scrapping using Playwright instead of json ld for some sites like amazon because they don't use json ld, but we will add Playwright just for top most used sites
  const data = await new GetProductFromJsonLd().execute(args.url)

  if (!data) {
    throw new GraphQLError('Failed to fetch product information')
  }

  return data
}
