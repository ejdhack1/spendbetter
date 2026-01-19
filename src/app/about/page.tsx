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
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About SpendBetter</h1>

        <div className="prose prose-gray max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What is SpendBetter?</h2>
            <p className="text-gray-600 mb-4">
              SpendBetter is a free tool that helps you make informed decisions about where you spend your money.
              We track corporate actions that affect democracy, civil rights, and labor practices, then provide
              simple ratings and ethical alternatives.
            </p>
            <p className="text-gray-600">
              Our goal is to make ethical consumerism accessible. You shouldn&apos;t need to spend hours
              researching every company. We do the work so you can make quick, informed choices.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What We Track</h2>
            <p className="text-gray-600 mb-4">
              We monitor three categories of corporate behavior:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">D</span>
                <div>
                  <strong className="text-gray-900">Democracy</strong> &mdash; Political donations, lobbying against
                  voting rights, funding election denial efforts
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-sm font-medium">C</span>
                <div>
                  <strong className="text-gray-900">Civil Rights</strong> &mdash; ICE/DHS contracts, surveillance
                  technology, anti-LGBTQ funding, DEI rollbacks
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-sm font-medium">L</span>
                <div>
                  <strong className="text-gray-900">Labor</strong> &mdash; Anti-union actions, labor law violations,
                  worker exploitation
                </div>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Sources</h2>
            <p className="text-gray-600 mb-4">
              We verify all claims using reputable public sources:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>OpenSecrets (political donations and lobbying)</li>
              <li>FEC filings (campaign contributions)</li>
              <li>News reports from established outlets</li>
              <li>Government contract databases</li>
              <li>NLRB records (labor violations)</li>
              <li>Company press releases and SEC filings</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Each signal on our site includes a link to the primary source so you can verify the information yourself.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How You Can Help</h2>
            <p className="text-gray-600 mb-4">
              SpendBetter is a community effort. Here&apos;s how you can contribute:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Submit new signals with evidence links</li>
              <li>Suggest ethical alternatives we&apos;re missing</li>
              <li>Report inaccuracies or outdated information</li>
              <li>Share SpendBetter with friends and family</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Notes</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-600 text-sm mb-3">
                <strong className="text-gray-900">We&apos;re not perfect.</strong> Companies are complex, and our
                ratings reflect specific documented actions&mdash;not comprehensive moral judgments.
              </p>
              <p className="text-gray-600 text-sm mb-3">
                <strong className="text-gray-900">Green doesn&apos;t mean &quot;good.&quot;</strong> A green rating
                means we haven&apos;t found significant negative signals, not that a company is exemplary.
              </p>
              <p className="text-gray-600 text-sm">
                <strong className="text-gray-900">This is one factor in your decisions.</strong> Consider price,
                quality, availability, and your personal values alongside our ratings.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Learn More</h2>
            <p className="text-gray-600 mb-4">
              Want to understand how we calculate scores and what each rating means?
            </p>
            <Link
              href="/methodology"
              className="inline-block px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              View Our Methodology
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
