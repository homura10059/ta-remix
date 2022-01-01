import { definitions } from '../../types/generated/supabase'

export type Item = definitions['items']

export type User = {
  id: string
  users_to_wishLists: {
    userId: string
    wishListId: string
    wishLists: {
      id: string
      url: string
      scrapedAt: number
      title: string
      wishLists_to_items: {
        wishListId: string
        itemId: string
        items: Item
      }[]
    }[]
  }[]
}

export type ItemHistory = definitions['itemHistories']

export type ItemDetail = definitions['items'] & {
  itemHistories: ItemHistory[]
}
