import type { BucketListData } from '../types/bucketList'

/**
 * Fetches bucket list data.
 * Swap the import for a real API call when the backend is ready:
 *   return fetch('/api/bucket-list').then(r => r.json())
 */
export async function fetchBucketList(): Promise<BucketListData> {
  const { default: data } = await import('../data/bucketList.json')
  return data as BucketListData
}
