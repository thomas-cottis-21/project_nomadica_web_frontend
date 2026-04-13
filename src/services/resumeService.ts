import type { ResumeData } from '../types/resume'

/**
 * Fetches resume data.
 * Swap the import for a real API call when the backend is ready:
 *   return fetch('/api/resume').then(r => r.json())
 */
export async function fetchResume(): Promise<ResumeData> {
  const { default: data } = await import('../data/resume.json')
  return data as ResumeData
}
