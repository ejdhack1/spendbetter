'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { RiskBadge } from './RiskBadge'
import type { RiskLevel } from '@/types/database'

type SearchResult = {
  id: string
  slug: string
  name: string
  parent_company: string | null
  risk_level: RiskLevel
}

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const searchCompanies = async () => {
      if (query.length < 2) {
        setResults([])
        setIsOpen(false)
        return
      }

      setIsLoading(true)
      const supabase = createClient()

      const { data, error } = await supabase
        .from('companies')
        .select('id, slug, name, parent_company, risk_level')
        .ilike('name', `%${query}%`)
        .order('name')
        .limit(8)

      if (!error && data) {
        setResults(data)
        setIsOpen(true)
      }
      setIsLoading(false)
    }

    const debounceTimer = setTimeout(searchCompanies, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsOpen(false)
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            placeholder="Search companies..."
            className="w-full px-4 py-3 pl-11 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {isLoading && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </form>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {results.map((company) => (
              <li key={company.id}>
                <Link
                  href={`/company/${company.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <span className="font-medium text-gray-900">{company.name}</span>
                    {company.parent_company && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({company.parent_company})
                      </span>
                    )}
                  </div>
                  <RiskBadge level={company.risk_level} size="sm" />
                </Link>
              </li>
            ))}
          </ul>
          {query.trim() && (
            <Link
              href={`/search?q=${encodeURIComponent(query.trim())}`}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-sm text-center text-gray-600 bg-gray-50 hover:bg-gray-100 border-t border-gray-200"
            >
              View all results for &quot;{query}&quot;
            </Link>
          )}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500">
          No companies found for &quot;{query}&quot;
        </div>
      )}
    </div>
  )
}
