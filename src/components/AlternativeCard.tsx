import type { AlternativeWithDetails } from '@/lib/data'
import type { AlternativeType, Practicality } from '@/types/database'

interface AlternativeCardProps {
  alternative: AlternativeWithDetails
}

const typeConfig: Record<AlternativeType, { label: string; className: string }> = {
  national: {
    label: 'National',
    className: 'bg-blue-100 text-blue-700'
  },
  local_tip: {
    label: 'Local Tip',
    className: 'bg-purple-100 text-purple-700'
  },
  cooperative: {
    label: 'Co-op',
    className: 'bg-green-100 text-green-700'
  }
}

const practicalityConfig: Record<Practicality, { label: string; dots: number }> = {
  easy: { label: 'Easy switch', dots: 3 },
  moderate: { label: 'Moderate effort', dots: 2 },
  niche: { label: 'Niche option', dots: 1 }
}

export function AlternativeCard({ alternative }: AlternativeCardProps) {
  const typeInfo = alternative.type ? typeConfig[alternative.type] : null
  const practicalityInfo = alternative.practicality ? practicalityConfig[alternative.practicality] : null

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900">{alternative.name}</h4>
          {alternative.description && (
            <p className="text-sm text-gray-600 mt-1">{alternative.description}</p>
          )}
          {alternative.rationale && (
            <p className="text-sm text-gray-500 mt-2 italic">
              {alternative.rationale}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 flex-wrap">
        {typeInfo && (
          <span className={`px-2 py-0.5 text-xs font-medium rounded ${typeInfo.className}`}>
            {typeInfo.label}
          </span>
        )}
        {practicalityInfo && (
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <span className="flex gap-0.5">
              {[1, 2, 3].map(i => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i <= practicalityInfo.dots ? 'bg-green-500' : 'bg-gray-200'
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
            className="text-xs text-blue-600 hover:underline ml-auto"
          >
            Visit site
          </a>
        )}
      </div>
    </div>
  )
}
