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

interface SearchBarProps {
  variant?: 'default' | 'hero'
}

export function SearchBar({ variant = 'default' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const isHero = variant === 'hero'

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard shortcut: "/" to focus search (only for hero variant)
  useEffect(() => {
    if (!isHero) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      const target = event.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return
      }

      if (event.key === '/') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isHero])

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
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            placeholder="Search companies..."
            className={`
              w-full transition-all duration-300
              ${isHero
                ? 'px-5 py-4 pl-12 text-lg bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/40 focus:shadow-glow-white'
                : 'px-4 py-3 pl-11 bg-white border border-ink-200 rounded-xl text-ink-950 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-ink-950 focus:border-transparent'
              }
            `}
          />
          <svg
            className={`
              absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5
              ${isHero ? 'text-white/50' : 'text-ink-400'}
            `}
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
              <div className={`
                w-5 h-5 border-2 rounded-full animate-spin
                ${isHero
                  ? 'border-white/30 border-t-white'
                  : 'border-ink-200 border-t-ink-600'
                }
              `} />
            </div>
          )}
          {/* Keyboard hint */}
          {isHero && !query && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
              <kbd className="px-2 py-1 text-xs font-mono bg-white/10 text-white/40 rounded border border-white/10">
                /
              </kbd>
              <span className="text-xs text-white/30">to search</span>
            </div>
          )}
        </div>
      </form>

      {isOpen && results.length > 0 && (
        <div className={`
          absolute z-50 w-full mt-2 rounded-xl shadow-lg overflow-hidden animate-fade-in
          ${isHero
            ? 'bg-ink-900/95 backdrop-blur-lg border border-white/10'
            : 'bg-white border border-ink-100'
          }
        `}>
          <ul className={`divide-y ${isHero ? 'divide-white/5' : 'divide-ink-50'}`}>
            {results.map((company) => (
              <li key={company.id}>
                <Link
                  href={`/company/${company.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center justify-between px-4 py-3 transition-colors
                    ${isHero
                      ? 'hover:bg-white/5'
                      : 'hover:bg-ink-50'
                    }
                  `}
                >
                  <div>
                    <span className={`font-display font-medium ${isHero ? 'text-white' : 'text-ink-950'}`}>
                      {company.name}
                    </span>
                    {company.parent_company && (
                      <span className={`text-sm ml-2 ${isHero ? 'text-white/50' : 'text-ink-400'}`}>
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
              className={`
                block px-4 py-3 text-sm text-center font-display transition-colors border-t
                ${isHero
                  ? 'text-white/60 bg-white/5 hover:bg-white/10 border-white/5'
                  : 'text-ink-600 bg-ink-50 hover:bg-ink-100 border-ink-100'
                }
              `}
            >
              View all results for &quot;{query}&quot;
            </Link>
          )}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
        <div className={`
          absolute z-50 w-full mt-2 rounded-xl shadow-lg p-4 text-center animate-fade-in
          ${isHero
            ? 'bg-ink-900/95 backdrop-blur-lg border border-white/10 text-white/50'
            : 'bg-white border border-ink-100 text-ink-500'
          }
        `}>
          No companies found for &quot;{query}&quot;
        </div>
      )}
    </div>
  )
}
