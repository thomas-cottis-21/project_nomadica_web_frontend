export type BucketListStatus = 'visited' | 'planned' | 'dreaming'

export interface BucketListItem {
  id: number
  destination: string
  country: string
  continent: string
  description: string
  status: BucketListStatus
  category: string
  image: string
  year?: number
}

export interface BucketListData {
  items: BucketListItem[]
}
