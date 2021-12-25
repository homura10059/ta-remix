import { supabase } from '../../libs/auth'
import { Item, User } from '../models'

export const getAllItemsBy = async (userId?: string): Promise<Item[]> => {
  if (!userId) {
    return []
  }

  const { data: users, error } = await supabase
    .from<User>('users')
    .select(
      `
      id,
      notification (
        userId,
        serviceType,
        webhookUrl
      ),
      users_to_wishLists (
        userId,
        wishListId,
        wishLists (
          id,
          url,
          scrapedAt,
          title,
          wishLists_to_items (
            wishListId,
            itemId,
            items (
              id,
              url,
              scrapedAt,
              title
            )
          )
        )
      )
    `
    )
    .eq('id', userId)
  if (error || users === null || users.length === 0) {
    return []
  }
  return users
    .flatMap(x => x.users_to_wishLists)
    .flatMap(x => x.wishLists)
    .flatMap(x => x.wishLists_to_items)
    .flatMap(x => x.items)
}
