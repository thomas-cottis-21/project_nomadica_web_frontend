import { request } from './client'
import type { BucketListItem } from '../types/bucketList'

const OWNER_ID = import.meta.env.VITE_OWNER_USER_ID

export function fetchBucketList(): Promise<BucketListItem[]> {
  return request('GET', `/api/v1/users/${OWNER_ID}/bucket-list`)
}
