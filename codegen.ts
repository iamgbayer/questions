import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'apps/api/schema.graphql',
  generates: {
    'libs/gql/src/': {
      preset: 'client'
    },
    'apps/web/src/gql/': {
      preset: 'client'
    },
    'apps/api/src/gql/': {
      preset: 'client'
    },
    'libs/get-product-info-from-json-ld/src/gql/': {
      preset: 'client'
    }
  }
}
export default config
