import { useEffect, useState } from 'react'
import type {
  Certification,
  Education,
  Experience,
  PersonalWorkItem,
  Profile,
  Project,
  ResumeData,
  SkillGroup,
  ToolGroup,
} from '../types/profile'

interface UseProfileDataResult {
  data: ResumeData | null
  loading: boolean
  error: string | null
}

const defaultProdBase =
  'https://raw.githubusercontent.com/ydeepakb/static-profile-dy/main/public/data'

function normalizeBaseUrl(url: string) {
  return url.replace(/\/$/, '')
}

function getBaseUrlCandidates() {
  const envBase = import.meta.env.VITE_DATA_BASE_URL

  if (envBase) {
    return [normalizeBaseUrl(envBase)]
  }

  const localBase = normalizeBaseUrl(`${import.meta.env.BASE_URL}data`)

  // In dev, local files are the fastest source. In non-dev, prefer runtime GitHub JSON
  // so content can update without rebuilding the site.
  if (import.meta.env.DEV) {
    return [localBase, defaultProdBase]
  }

  return [defaultProdBase, localBase]
}

async function fetchJson<T>(baseUrl: string, fileName: string): Promise<T> {
  const response = await fetch(`${baseUrl}/${fileName}`, { cache: 'no-store' })
  if (!response.ok) {
    throw new Error(`Failed to fetch ${fileName}: ${response.status}`)
  }
  return response.json() as Promise<T>
}

export function useProfileData(): UseProfileDataResult {
  const [data, setData] = useState<ResumeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const baseUrlCandidates = getBaseUrlCandidates()

    async function load() {
      try {
        setLoading(true)
        let lastError: unknown = null
        let loadedData: ResumeData | null = null

        for (const baseUrl of baseUrlCandidates) {
          try {
            const [
              profile,
              experience,
              education,
              skills,
              tools,
              certifications,
              projects,
              personalWork,
            ] =
              await Promise.all([
                fetchJson<Profile>(baseUrl, 'profile.json'),
                fetchJson<Experience[]>(baseUrl, 'experience.json'),
                fetchJson<Education[]>(baseUrl, 'education.json'),
                fetchJson<SkillGroup[]>(baseUrl, 'skills.json'),
                fetchJson<ToolGroup[]>(baseUrl, 'tools.json'),
                fetchJson<Certification[]>(baseUrl, 'certifications.json'),
                fetchJson<Project[]>(baseUrl, 'projects.json'),
                fetchJson<PersonalWorkItem[]>(baseUrl, 'personal-work.json'),
              ])

            loadedData = {
              profile,
              experience,
              education,
              skills,
              tools,
              certifications,
              projects,
              personalWork,
            }
            break
          } catch (err) {
            lastError = err
          }
        }

        if (!loadedData) {
          throw lastError ?? new Error('Failed to load profile data from all configured sources')
        }

        if (!mounted) return

        setData(loadedData)
        setError(null)
      } catch (err) {
        if (!mounted) return
        setError(err instanceof Error ? err.message : 'Failed to load profile data')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    void load()

    return () => {
      mounted = false
    }
  }, [])

  return { data, loading, error }
}
