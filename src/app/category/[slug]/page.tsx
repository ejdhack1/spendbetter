import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCompaniesByCategory, getAlternativesByCategory } from '@/lib/data'
import { CompanyCard } from '@/components/CompanyCard'
import { AlternativeCard } from '@/components/AlternativeCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const [{ category, companies }, alternatives] = await Promise.all([
    getCompaniesByCategory(slug),
    getAlternativesByCategory(slug)
  ])

  if (!category) {
    notFound()
  }

  const sortedCompanies = [...companies].sort((a, b) => {
    const riskOrder = { red: 0, yellow: 1, green: 2 }
    return riskOrder[a.risk_level] - riskOrder[b.risk_level]
  })

  return (
    <div className="min-h-screen bg-paper">
      {/* Header spacer for fixed header */}
      <div className="h-16" />

      <div className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm font-display">
            <Link href="/" className="text-ink-400 hover:text-ink-600 transition-colors">Home</Link>
            <span className="mx-2 text-ink-300">/</span>
            <span className="text-ink-950 font-medium">{category.name}</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-3">
              {category.icon && (
                <span className="text-5xl">{category.icon}</span>
              )}
              <h1 className="font-serif text-3xl sm:text-4xl text-ink-950">
                {category.name}
              </h1>
            </div>
            {category.description && (
              <p className="text-ink-600 text-lg leading-relaxed max-w-2xl">
                {category.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Companies */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-red-500 via-yellow-500 to-green-500 rounded-full" />
                <h2 className="font-display font-semibold text-ink-950 text-lg">
                  Companies ({companies.length})
                </h2>
              </div>
              {companies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sortedCompanies.map((company, index) => (
                    <CompanyCard key={company.id} company={company} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-ink-500 text-center py-12 bg-white rounded-xl border border-ink-100 font-display">
                  No companies in this category yet.
                </div>
              )}
            </div>

            {/* Alternatives Sidebar */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h2 className="font-display font-semibold text-ink-950 text-lg">
                  Alternatives
                </h2>
              </div>
              {alternatives.length > 0 ? (
                <div className="space-y-4">
                  {alternatives.map((alternative, index) => (
                    <AlternativeCard key={alternative.id} alternative={alternative} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-ink-500 text-center py-12 bg-white rounded-xl border border-ink-100 font-display">
                  No alternatives listed yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const { category } = await getCompaniesByCategory(slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  const description = category.description || `Browse companies in the ${category.name} category. View ethical ratings and find alternatives.`

  return {
    title: category.name,
    description,
    openGraph: {
      title: `${category.name} - SpendBetter`,
      description,
    },
  }
}
