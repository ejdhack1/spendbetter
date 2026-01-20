import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about SpendBetter, a tool that helps you make ethical spending decisions by tracking corporate actions on democracy, civil rights, and labor.',
  openGraph: {
    title: 'About SpendBetter',
    description: 'Learn about SpendBetter, a tool that helps you make ethical spending decisions by tracking corporate actions on democracy, civil rights, and labor.',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Header spacer for fixed header */}
      <div className="h-16" />

      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="font-serif text-4xl text-ink-950 mb-8">About SpendBetter</h1>

        <div className="space-y-10">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">What is SpendBetter?</h2>
            <p className="text-ink-600 mb-4 leading-relaxed">
              SpendBetter is a free tool that helps you make informed decisions about where you spend your money.
              We track corporate actions that affect democracy, civil rights, and labor practices, then provide
              simple ratings and ethical alternatives.
            </p>
            <p className="text-ink-600 leading-relaxed">
              Our goal is to make ethical consumerism accessible. You shouldn&apos;t need to spend hours
              researching every company. We do the work so you can make quick, informed choices.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">What We Track</h2>
            <p className="text-ink-600 mb-4 leading-relaxed">
              We monitor three categories of corporate behavior:
            </p>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-category-democracy" />
                </span>
                <div>
                  <strong className="font-display text-ink-950">Democracy</strong>
                  <span className="text-ink-600"> &mdash; Political donations, lobbying against voting rights, funding election denial efforts</span>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-category-civil" />
                </span>
                <div>
                  <strong className="font-display text-ink-950">Civil Rights</strong>
                  <span className="text-ink-600"> &mdash; ICE/DHS contracts, surveillance technology, anti-LGBTQ funding, DEI rollbacks</span>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-category-labor" />
                </span>
                <div>
                  <strong className="font-display text-ink-950">Labor</strong>
                  <span className="text-ink-600"> &mdash; Anti-union actions, labor law violations, worker exploitation</span>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">Our Sources</h2>
            <p className="text-ink-600 mb-4 leading-relaxed">
              We verify all claims using reputable public sources:
            </p>
            <ul className="list-disc list-inside text-ink-600 space-y-2 ml-2">
              <li>OpenSecrets (political donations and lobbying)</li>
              <li>FEC filings (campaign contributions)</li>
              <li>News reports from established outlets</li>
              <li>Government contract databases</li>
              <li>NLRB records (labor violations)</li>
              <li>Company press releases and SEC filings</li>
            </ul>
            <p className="text-ink-600 mt-4 leading-relaxed">
              Each signal on our site includes a link to the primary source so you can verify the information yourself.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">How You Can Help</h2>
            <p className="text-ink-600 mb-4 leading-relaxed">
              SpendBetter is a community effort. Here&apos;s how you can contribute:
            </p>
            <ul className="list-disc list-inside text-ink-600 space-y-2 ml-2">
              <li>Submit new signals with evidence links</li>
              <li>Suggest ethical alternatives we&apos;re missing</li>
              <li>Report inaccuracies or outdated information</li>
              <li>Share SpendBetter with friends and family</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">Important Notes</h2>
            <div className="bg-ink-50 border border-ink-100 rounded-xl p-6 space-y-4">
              <p className="text-ink-600 text-sm">
                <strong className="font-display text-ink-950">We&apos;re not perfect.</strong> Companies are complex, and our
                ratings reflect specific documented actions&mdash;not comprehensive moral judgments.
              </p>
              <p className="text-ink-600 text-sm">
                <strong className="font-display text-ink-950">Green doesn&apos;t mean &quot;good.&quot;</strong> A green rating
                means we haven&apos;t found significant negative signals, not that a company is exemplary.
              </p>
              <p className="text-ink-600 text-sm">
                <strong className="font-display text-ink-950">This is one factor in your decisions.</strong> Consider price,
                quality, availability, and your personal values alongside our ratings.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">Learn More</h2>
            <p className="text-ink-600 mb-4 leading-relaxed">
              Want to understand how we calculate scores and what each rating means?
            </p>
            <Link
              href="/methodology"
              className="btn-primary inline-block"
            >
              View Our Methodology
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
