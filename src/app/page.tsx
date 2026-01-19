import Link from 'next/link'
import { getCategories, getRecentlyFlaggedCompanies } from '@/lib/data'
import { CompanyCard } from '@/components/CompanyCard'
import { SearchBar } from '@/components/SearchBar'

export default async function Home() {
  const [categories, recentlyFlagged] = await Promise.all([
    getCategories(),
    getRecentlyFlaggedCompanies(6)
  ])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Make Informed Spending Decisions
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Research companies based on their track record on democracy, civil rights,
            and labor practices. Find ethical alternatives.
          </p>
          <div className="flex justify-center mb-8">
            <SearchBar />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#categories"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Browse Categories
            </Link>
            <Link
              href="/methodology"
              className="px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section id="categories" className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-center"
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="font-medium text-gray-900 text-sm">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Flagged */}
      {recentlyFlagged.length > 0 && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Flagged</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentlyFlagged.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How SpendBetter Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-gray-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">We Track Signals</h3>
              <p className="text-sm text-gray-600">
                We collect verified reports of corporate actions affecting democracy,
                civil rights, and labor practices.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-gray-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">We Calculate Scores</h3>
              <p className="text-sm text-gray-600">
                Each signal is weighted by severity. Companies are rated green, yellow,
                or red based on their total score.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-gray-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">We Suggest Alternatives</h3>
              <p className="text-sm text-gray-600">
                For each flagged company, we provide ethical alternatives ranging from
                easy switches to local options.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
