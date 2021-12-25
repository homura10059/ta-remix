export type Item = {
  id: string
  url: string
  scrapedAt: number
  title: string
}

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
