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
      {/* Hero Section - Dark with mesh gradient */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-ink-950 overflow-hidden">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-80" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="w-2 h-2 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-display font-medium text-white/60 uppercase tracking-wider">
              Ethical Spending Research
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-gradient leading-normal pb-2 mb-6">
            Make Informed<br />Spending Decisions
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Research companies based on their track record on democracy, civil rights,
            and labor practices. Find ethical alternatives.
          </p>

          {/* Hero Search */}
          <div className="flex justify-center mb-10">
            <SearchBar variant="hero" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#categories" className="btn-hero">
              Browse Categories
            </Link>
            <Link href="/methodology" className="btn-hero-outline">
              How It Works
            </Link>
          </div>
        </div>

        {/* Stats row at bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-semibold text-white">100+</p>
                <p className="text-sm text-white/50 font-display mt-1">Companies Tracked</p>
              </div>
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-semibold text-white">3</p>
                <p className="text-sm text-white/50 font-display mt-1">Signal Categories</p>
              </div>
              <div>
                <p className="font-mono text-2xl sm:text-3xl font-semibold text-white">50+</p>
                <p className="text-sm text-white/50 font-display mt-1">Alternatives Listed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section id="categories" className="py-16 px-4 bg-paper">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-category-democracy via-category-civil to-category-labor rounded-full" />
            <h2 className="section-header">Browse by Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group flex flex-col items-center p-5 bg-white border border-ink-100 rounded-xl hover:border-ink-200 hover:shadow-card-hover transition-all duration-300 text-center opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'forwards' }}
              >
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </span>
                <span className="font-display font-medium text-ink-950 text-sm">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Flagged */}
      {recentlyFlagged.length > 0 && (
        <section className="py-16 px-4 bg-white border-t border-ink-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-red-500" />
              </div>
              <h2 className="section-header">Recently Flagged</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentlyFlagged.map((company, index) => (
                <CompanyCard key={company.id} company={company} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-16 px-4 bg-paper border-t border-ink-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-ink-100 flex items-center justify-center">
              <span className="font-mono text-sm font-bold text-ink-600">?</span>
            </div>
            <h2 className="section-header">How SpendBetter Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="group p-6 bg-white border border-ink-100 rounded-xl hover:border-ink-200 hover:shadow-card transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-category-democracy/20 to-category-democracy/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <span className="font-mono text-lg font-bold text-category-democracy">1</span>
              </div>
              <h3 className="font-display font-semibold text-ink-950 mb-2">We Track Signals</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                We collect verified reports of corporate actions affecting democracy,
                civil rights, and labor practices.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group p-6 bg-white border border-ink-100 rounded-xl hover:border-ink-200 hover:shadow-card transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-category-civil/20 to-category-civil/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <span className="font-mono text-lg font-bold text-category-civil">2</span>
              </div>
              <h3 className="font-display font-semibold text-ink-950 mb-2">We Calculate Scores</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                Each signal is weighted by severity. Companies are rated green, yellow,
                or red based on their total score.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group p-6 bg-white border border-ink-100 rounded-xl hover:border-ink-200 hover:shadow-card transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-category-labor/20 to-category-labor/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <span className="font-mono text-lg font-bold text-category-labor">3</span>
              </div>
              <h3 className="font-display font-semibold text-ink-950 mb-2">We Suggest Alternatives</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
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
