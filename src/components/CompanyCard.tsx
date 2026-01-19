import Link from 'next/link'
import { RiskBadge } from './RiskBadge'
import type { CompanyWithCategories } from '@/lib/data'

interface CompanyCardProps {
  company: CompanyWithCategories
}

export function CompanyCard({ company }: CompanyCardProps) {
  const primaryCategory = company.categories.find(() => true)

  return (
    <Link
      href={`/company/${company.slug}`}
      className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {company.name}
          </h3>
          {company.parent_company && (
            <p className="text-sm text-gray-500 truncate">
              ({company.parent_company})
            </p>
          )}
          {primaryCategory && (
            <p className="text-sm text-gray-600 mt-1">
              {primaryCategory.name}
            </p>
          )}
        </div>
        <RiskBadge level={company.risk_level} size="sm" />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-xs text-gray-500">Democracy</p>
          <p className="font-medium text-sm">{company.democracy_score}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Civil Rights</p>
          <p className="font-medium text-sm">{company.civil_rights_score}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Labor</p>
          <p className="font-medium text-sm">{company.labor_score}</p>
        </div>
      </div>
    </Link>
  )
}
