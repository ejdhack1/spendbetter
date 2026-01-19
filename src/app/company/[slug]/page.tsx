import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCompanyBySlug } from '@/lib/data'
import { RiskBadge } from '@/components/RiskBadge'
import { AlternativeCard } from '@/components/AlternativeCard'
import type { SignalCategory } from '@/types/database'

interface PageProps {
  params: Promise<{ slug: string }>
}

const signalCategoryLabels: Record<SignalCategory, string> = {
  democracy: 'Democracy',
  civil_rights: 'Civil Rights',
  labor: 'Labor'
}

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)

  if (!company) {
    notFound()
  }

  const signalsByCategory = company.signals.reduce((acc, signal) => {
    const category = signal.signal_type.category
    if (!acc[category]) acc[category] = []
    acc[category].push(signal)
    return acc
  }, {} as Record<SignalCategory, typeof company.signals>)

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          {company.categories[0] && (
            <>
              <Link
                href={`/category/${company.categories[0].slug}`}
                className="text-gray-500 hover:text-gray-700"
              >
                {company.categories[0].name}
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </>
          )}
          <span className="text-gray-900">{company.name}</span>
        </nav>

        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {company.name}
              </h1>
              {company.parent_company && (
                <p className="text-gray-500 mt-1">
                  Part of {company.parent_company}
                </p>
              )}
            </div>
            <RiskBadge level={company.risk_level} size="lg" />
          </div>

          {company.description && (
            <p className="text-gray-600 mb-4">{company.description}</p>
          )}

          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              {company.website}
            </a>
          )}
        </div>

        {/* Scores */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Scores</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Total</p>
              <p className="text-2xl font-bold text-gray-900">{company.total_score}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Democracy</p>
              <p className="text-2xl font-bold text-gray-900">{company.democracy_score}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Civil Rights</p>
              <p className="text-2xl font-bold text-gray-900">{company.civil_rights_score}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Labor</p>
              <p className="text-2xl font-bold text-gray-900">{company.labor_score}</p>
            </div>
          </div>
        </div>

        {/* Signals */}
        {company.signals.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Signals ({company.signals.length})
            </h2>
            <div className="space-y-6">
              {(Object.keys(signalsByCategory) as SignalCategory[]).map((category) => (
                <div key={category}>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                    {signalCategoryLabels[category]}
                  </h3>
                  <div className="space-y-3">
                    {signalsByCategory[category].map((signal) => (
                      <div
                        key={signal.id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{signal.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {signal.signal_type.name}
                            </p>
                          </div>
                          <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded">
                            {signal.weight_override ?? signal.signal_type.default_weight} pts
                          </span>
                        </div>
                        {signal.description && (
                          <p className="text-sm text-gray-600 mt-2">{signal.description}</p>
                        )}
                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                          {signal.evidence_source && (
                            <span>Source: {signal.evidence_source}</span>
                          )}
                          {signal.evidence_date && (
                            <span>{new Date(signal.evidence_date).toLocaleDateString()}</span>
                          )}
                          <a
                            href={signal.evidence_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View evidence
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alternatives */}
        {company.alternatives.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Alternatives ({company.alternatives.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {company.alternatives.map((alternative) => (
                <AlternativeCard key={alternative.id} alternative={alternative} />
              ))}
            </div>
          </div>
        )}

        {/* Last Updated */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Last updated: {new Date(company.last_updated).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)

  if (!company) {
    return { title: 'Company Not Found' }
  }

  const riskLabels = { green: 'Low Risk', yellow: 'Medium Risk', red: 'High Risk' }
  const description = `${company.name} ethical rating: ${riskLabels[company.risk_level]}. View detailed scores on democracy, civil rights, and labor practices. Find ethical alternatives.`

  return {
    title: company.name,
    description,
    openGraph: {
      title: `${company.name} - SpendBetter`,
      description,
    },
  }
}
