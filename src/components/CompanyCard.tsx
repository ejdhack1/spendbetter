import Link from 'next/link'
import { RiskBadge } from './RiskBadge'
import type { CompanyWithCategories } from '@/lib/data'

interface CompanyCardProps {
  company: CompanyWithCategories
  index?: number
}

export function CompanyCard({ company, index = 0 }: CompanyCardProps) {
  const primaryCategory = company.categories.find(() => true)

  return (
    <Link
      href={`/company/${company.slug}`}
      className={`
        group block bg-white border border-ink-100 rounded-xl p-5
        hover:border-ink-200 hover:shadow-card-hover
        transition-all duration-300
        opacity-0 animate-slide-up
      `}
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-semibold text-ink-950 truncate group-hover:text-ink-700 transition-colors">
              {company.name}
            </h3>
            {/* Arrow that appears on hover */}
            <svg
              className="w-4 h-4 text-ink-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          {company.parent_company && (
            <p className="text-sm text-ink-400 truncate">
              ({company.parent_company})
            </p>
          )}
          {primaryCategory && (
            <p className="text-sm text-ink-500 mt-1 font-display">
              {primaryCategory.name}
            </p>
          )}
        </div>
        <RiskBadge level={company.risk_level} size="sm" />
      </div>

      {/* Score Row with colored indicators */}
      <div className="mt-4 pt-4 border-t border-ink-50 grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-category-democracy" />
            <p className="text-xs text-ink-400 font-display">Democracy</p>
          </div>
          <p className="font-mono font-semibold text-ink-950">{company.democracy_score}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-category-civil" />
            <p className="text-xs text-ink-400 font-display">Civil Rights</p>
          </div>
          <p className="font-mono font-semibold text-ink-950">{company.civil_rights_score}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-category-labor" />
            <p className="text-xs text-ink-400 font-display">Labor</p>
          </div>
          <p className="font-mono font-semibold text-ink-950">{company.labor_score}</p>
        </div>
      </div>
    </Link>
  )
}
