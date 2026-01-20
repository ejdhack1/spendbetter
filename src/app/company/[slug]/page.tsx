import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCompanyBySlug } from '@/lib/data'
import { RiskBadge } from '@/components/RiskBadge'
import { AlternativeCard } from '@/components/AlternativeCard'
import type { SignalCategory } from '@/types/database'

interface PageProps {
  params: Promise<{ slug: string }>
}

const signalCategoryConfig: Record<SignalCategory, { label: string; color: string; dotClass: string }> = {
  democracy: { label: 'Democracy', color: 'text-category-democracy', dotClass: 'bg-category-democracy' },
  civil_rights: { label: 'Civil Rights', color: 'text-category-civil', dotClass: 'bg-category-civil' },
  labor: { label: 'Labor', color: 'text-category-labor', dotClass: 'bg-category-labor' }
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
    <div className="min-h-screen bg-paper">
      {/* Header spacer for fixed header */}
      <div className="h-16" />

      <div className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm font-display">
            <Link href="/" className="text-ink-400 hover:text-ink-600 transition-colors">Home</Link>
            <span className="mx-2 text-ink-300">/</span>
            {company.categories[0] && (
              <>
                <Link
                  href={`/category/${company.categories[0].slug}`}
                  className="text-ink-400 hover:text-ink-600 transition-colors"
                >
                  {company.categories[0].name}
                </Link>
                <span className="mx-2 text-ink-300">/</span>
              </>
            )}
            <span className="text-ink-950 font-medium">{company.name}</span>
          </nav>

          {/* Header Card */}
          <div className="bg-white border border-ink-100 rounded-2xl p-8 mb-6 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl text-ink-950 mb-2">
                  {company.name}
                </h1>
                {company.parent_company && (
                  <p className="text-ink-500 font-display">
                    Part of {company.parent_company}
                  </p>
                )}
              </div>
              <RiskBadge level={company.risk_level} size="lg" />
            </div>

            {company.description && (
              <p className="text-ink-600 mb-6 leading-relaxed">{company.description}</p>
            )}

            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-display text-category-democracy hover:underline"
              >
                {company.website}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>

          {/* Scores Card */}
          <div className="bg-white border border-ink-100 rounded-2xl p-8 mb-6 shadow-card">
            <h2 className="font-display font-semibold text-ink-950 mb-6 text-lg">Scores</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-5 bg-ink-50 rounded-xl">
                <p className="text-sm text-ink-500 font-display mb-2">Total</p>
                <p className="font-mono text-3xl font-bold text-ink-950">{company.total_score}</p>
              </div>
              <div className="text-center p-5 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-category-democracy" />
                  <p className="text-sm text-ink-500 font-display">Democracy</p>
                </div>
                <p className="font-mono text-3xl font-bold text-category-democracy">{company.democracy_score}</p>
              </div>
              <div className="text-center p-5 bg-purple-50 rounded-xl border border-purple-100">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-category-civil" />
                  <p className="text-sm text-ink-500 font-display">Civil Rights</p>
                </div>
                <p className="font-mono text-3xl font-bold text-category-civil">{company.civil_rights_score}</p>
              </div>
              <div className="text-center p-5 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-category-labor" />
                  <p className="text-sm text-ink-500 font-display">Labor</p>
                </div>
                <p className="font-mono text-3xl font-bold text-category-labor">{company.labor_score}</p>
              </div>
            </div>
          </div>

          {/* Signals Card */}
          {company.signals.length > 0 && (
            <div className="bg-white border border-ink-100 rounded-2xl p-8 mb-6 shadow-card">
              <h2 className="font-display font-semibold text-ink-950 mb-6 text-lg">
                Signals ({company.signals.length})
              </h2>
              <div className="space-y-8">
                {(Object.keys(signalsByCategory) as SignalCategory[]).map((category) => {
                  const config = signalCategoryConfig[category]
                  return (
                    <div key={category}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`w-2 h-2 rounded-full ${config.dotClass}`} />
                        <h3 className={`text-sm font-display font-medium uppercase tracking-wider ${config.color}`}>
                          {config.label}
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {signalsByCategory[category].map((signal) => (
                          <div
                            key={signal.id}
                            className="p-5 bg-ink-50 rounded-xl border border-ink-100"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h4 className="font-display font-semibold text-ink-950">{signal.title}</h4>
                                <p className="text-xs text-ink-500 font-display mt-1">
                                  {signal.signal_type.name}
                                </p>
                              </div>
                              <span className="font-mono text-xs px-2.5 py-1 bg-ink-200 text-ink-600 rounded-full">
                                {signal.weight_override ?? signal.signal_type.default_weight} pts
                              </span>
                            </div>
                            {signal.description && (
                              <p className="text-sm text-ink-600 mt-3 leading-relaxed">{signal.description}</p>
                            )}
                            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-ink-500 font-display">
                              {signal.evidence_source && (
                                <span className="flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                  </svg>
                                  {signal.evidence_source}
                                </span>
                              )}
                              {signal.evidence_date && (
                                <span className="flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {new Date(signal.evidence_date).toLocaleDateString()}
                                </span>
                              )}
                              <a
                                href={signal.evidence_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-category-democracy hover:underline flex items-center gap-1"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                View evidence
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Alternatives Card */}
          {company.alternatives.length > 0 && (
            <div className="bg-white border border-ink-100 rounded-2xl p-8 shadow-card">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h2 className="font-display font-semibold text-ink-950 text-lg">
                  Alternatives ({company.alternatives.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {company.alternatives.map((alternative, index) => (
                  <AlternativeCard key={alternative.id} alternative={alternative} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Last Updated */}
          <p className="text-sm text-ink-400 text-center mt-8 font-display">
            Last updated: {new Date(company.last_updated).toLocaleDateString()}
          </p>
        </div>
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
