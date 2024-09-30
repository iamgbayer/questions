import { createItem } from './create-item'
import { createList } from './create-list'
import { deleteItem } from './delete-item'
import { getItemDetailsById } from './get-item-details-by-id'
import { getItems } from './get-items'
import { getLists } from './get-lists'
import { getProductByUrl } from './get-product-by-url'
import { getProfile } from './get-profile'
import { onboarding } from './onboarding'
import { signup } from '../services/signup'
import { updateItem } from './update-item'
import { updateItemDescription } from './update-item-description'

export const resolvers = {
  Query: {
    getProductByUrl,
    getProfile,
    getItemDetailsById,
    getItems,
    getLists
  },
  Mutation: {
    updateItemDescription,
    signup,
    onboarding,
    createItem,
    createList,
    deleteItem,
    updateItem
  }
}
