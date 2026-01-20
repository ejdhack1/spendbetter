import type { AlternativeWithDetails } from '@/lib/data'
import type { AlternativeType, Practicality } from '@/types/database'

interface AlternativeCardProps {
  alternative: AlternativeWithDetails
  index?: number
}

const typeConfig: Record<AlternativeType, { label: string; className: string }> = {
  national: {
    label: 'National',
    className: 'bg-blue-900/20 text-blue-400 border border-blue-800/30'
  },
  local_tip: {
    label: 'Local Tip',
    className: 'bg-purple-900/20 text-purple-400 border border-purple-800/30'
  },
  cooperative: {
    label: 'Co-op',
    className: 'bg-emerald-900/20 text-emerald-400 border border-emerald-800/30'
  }
}

const practicalityConfig: Record<Practicality, { label: string; dots: number }> = {
  easy: { label: 'Easy switch', dots: 3 },
  moderate: { label: 'Moderate effort', dots: 2 },
  niche: { label: 'Niche option', dots: 1 }
}

export function AlternativeCard({ alternative, index = 0 }: AlternativeCardProps) {
  const typeInfo = alternative.type ? typeConfig[alternative.type] : null
  const practicalityInfo = alternative.practicality ? practicalityConfig[alternative.practicality] : null

  return (
    <div
      className="card-alternative opacity-0 animate-slide-up"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-semibold text-ink-950">
            {alternative.name}
          </h4>
          {alternative.description && (
            <p className="text-sm text-ink-600 mt-1 leading-relaxed">
              {alternative.description}
            </p>
          )}
          {alternative.rationale && (
            <p className="text-sm text-emerald-700 mt-2 italic">
              {alternative.rationale}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center gap-3 flex-wrap">
        {typeInfo && (
          <span className={`px-2.5 py-1 text-xs font-display font-medium rounded-full ${typeInfo.className}`}>
            {typeInfo.label}
          </span>
        )}
        {practicalityInfo && (
          <span className="flex items-center gap-1.5 text-xs text-ink-500 font-display">
            <span className="flex gap-0.5">
              {[1, 2, 3].map(i => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i <= practicalityInfo.dots ? 'bg-emerald-500' : 'bg-ink-200'
                  }`}
                />
              ))}
            </span>
            {practicalityInfo.label}
          </span>
        )}
        {alternative.website && (
          <a
            href={alternative.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-display font-medium text-emerald-600 hover:text-emerald-700 transition-colors ml-auto"
          >
            Visit site
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}
