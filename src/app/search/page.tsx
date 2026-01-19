import { Metadata } from 'next'
import Link from 'next/link'
import { searchCompanies } from '@/lib/data'
import { CompanyCard } from '@/components/CompanyCard'
import { SearchBar } from '@/components/SearchBar'

type Props = {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams
  const query = q || ''

  const title = query ? `Search: ${query}` : 'Search'
  const description = query
    ? `Search results for "${query}" on SpendBetter. Find company ratings for democracy, civil rights, and labor practices.`
    : 'Search for companies on SpendBetter to see their ethical ratings and find alternatives.'

  return {
    title,
    description,
    openGraph: {
      title: query ? `Search: ${query} - SpendBetter` : 'Search - SpendBetter',
      description,
    },
  }
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = q || ''
  const results = query ? await searchCompanies(query) : []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Companies</h1>
          <SearchBar />
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-4">
        {query ? (
          <>
            <p className="text-gray-600 mb-6">
              {results.length === 0
                ? `No results found for "${query}"`
                : `${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`
              }
            </p>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <p className="text-gray-500 mb-4">
                  We couldn&apos;t find any companies matching your search.
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  Try a different search term or browse by category.
                </p>
                <Link
                  href="/#categories"
                  className="inline-block px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Browse Categories
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-500 mb-4">
              Enter a company name to search.
            </p>
            <p className="text-sm text-gray-400">
              Or <Link href="/#categories" className="text-gray-900 underline hover:no-underline">browse by category</Link> to explore companies.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
