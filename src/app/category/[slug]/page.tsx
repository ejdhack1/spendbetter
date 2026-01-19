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
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {category.icon && <span className="text-4xl">{category.icon}</span>}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {category.name}
            </h1>
          </div>
          {category.description && (
            <p className="text-gray-600">{category.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Companies */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Companies ({companies.length})
            </h2>
            {companies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sortedCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
                No companies in this category yet.
              </p>
            )}
          </div>

          {/* Alternatives Sidebar */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Alternatives
            </h2>
            {alternatives.length > 0 ? (
              <div className="space-y-4">
                {alternatives.map((alternative) => (
                  <AlternativeCard key={alternative.id} alternative={alternative} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
                No alternatives listed yet.
              </p>
            )}
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
