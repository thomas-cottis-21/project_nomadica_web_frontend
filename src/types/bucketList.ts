export interface DestinationCategory {
  id: string
  name: string
  sortOrder: number
}

export interface BucketListStatus {
  id: string
  name: string
}

export interface Destination {
  id: string
  name: string
  country: string
  continent: string
  description: string | null
  coverImageUrl: string | null
  categoryId: string | null
  createdAt: string
  updatedAt: string
  category: DestinationCategory | null
}

export interface BucketListItem {
  id: string
  userId: string
  destinationId: string
  statusId: string
  notes: string | null
  createdAt: string
  updatedAt: string
  destination: Destination | null
  status: BucketListStatus | null
}
