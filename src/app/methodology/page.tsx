import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Methodology',
  description: 'Learn how SpendBetter calculates company scores based on democracy, civil rights, and labor signals. Understand our rating system and signal weights.',
  openGraph: {
    title: 'SpendBetter Methodology',
    description: 'Learn how SpendBetter calculates company scores based on democracy, civil rights, and labor signals.',
  },
}

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Methodology</h1>
        <p className="text-gray-600 mb-8">How we research, score, and rate companies</p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 mb-4">
              Every company in SpendBetter is evaluated based on documented &quot;signals&quot;&mdash;specific
              corporate actions that affect democracy, civil rights, or labor. Each signal is verified,
              weighted by severity, and contributes to the company&apos;s overall score.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Signal Categories</h2>
            <p className="text-gray-600 mb-4">We track three categories of corporate behavior:</p>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Democracy Signals</h3>
                <p className="text-blue-800 text-sm mb-3">
                  Actions that undermine democratic institutions or processes
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>Election denial funding (weight: 5)</li>
                  <li>Anti-voting rights lobbying (weight: 4)</li>
                  <li>Major Trump PAC donations (weight: 4)</li>
                  <li>General GOP donations (weight: 1)</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">Civil Rights Signals</h3>
                <p className="text-purple-800 text-sm mb-3">
                  Actions that harm marginalized communities or enable discrimination
                </p>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>ICE/DHS contracts (weight: 4)</li>
                  <li>Surveillance technology development (weight: 3)</li>
                  <li>Anti-LGBTQ funding (weight: 4)</li>
                  <li>DEI program elimination (weight: 3)</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-2">Labor Signals</h3>
                <p className="text-orange-800 text-sm mb-3">
                  Actions that harm workers or suppress worker rights
                </p>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>Anti-union actions (weight: 3)</li>
                  <li>Labor law violations (weight: 4)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Score Calculation</h2>
            <p className="text-gray-600 mb-4">
              Each category (Democracy, Civil Rights, Labor) receives its own score based on the sum
              of signal weights. The total score is the sum of all three categories.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <code className="text-sm text-gray-700">
                Total Score = Democracy Score + Civil Rights Score + Labor Score
              </code>
            </div>

            <p className="text-gray-600">
              Signal weights range from 1 (minor concern) to 5 (severe). Multiple signals of the
              same type stack, so a company with repeated offenses will score higher.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Risk Levels</h2>
            <p className="text-gray-600 mb-4">
              Based on total score, companies are assigned a risk level:
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="font-semibold text-green-800">Green (Low Risk)</span>
                </span>
                <span className="text-green-700 text-sm">Total score 0-3</span>
              </div>

              <div className="flex items-center gap-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="font-semibold text-yellow-800">Yellow (Medium Risk)</span>
                </span>
                <span className="text-yellow-700 text-sm">Total score 4-8</span>
              </div>

              <div className="flex items-center gap-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="font-semibold text-red-800">Red (High Risk)</span>
                </span>
                <span className="text-red-700 text-sm">Total score 9+</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Verification Process</h2>
            <p className="text-gray-600 mb-4">
              Before a signal is added to our database, it must meet these criteria:
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-2">
              <li>Documented in a credible public source</li>
              <li>Directly attributable to the company (not speculation)</li>
              <li>Verifiable through the provided evidence link</li>
              <li>Relevant to our three tracking categories</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Alternative Ratings</h2>
            <p className="text-gray-600 mb-4">
              For each flagged company, we suggest alternatives categorized by type and practicality:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-3 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">Type</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><span className="text-blue-600 font-medium">National</span> &mdash; Widely available</li>
                  <li><span className="text-purple-600 font-medium">Local</span> &mdash; Support local businesses</li>
                  <li><span className="text-green-600 font-medium">Co-op</span> &mdash; Worker/member owned</li>
                </ul>
              </div>

              <div className="p-3 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">Practicality</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><span className="font-medium">Easy</span> &mdash; Simple switch</li>
                  <li><span className="font-medium">Moderate</span> &mdash; Requires some effort</li>
                  <li><span className="font-medium">Niche</span> &mdash; Limited availability</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Limitations</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <ul className="text-sm text-gray-600 space-y-2">
                <li>We only track documented actions, not company culture or values</li>
                <li>Absence of signals doesn&apos;t guarantee ethical behavior</li>
                <li>Our data may not be complete or up-to-date for all companies</li>
                <li>Weight assignments involve editorial judgment</li>
                <li>We don&apos;t track positive actions that might offset negatives</li>
              </ul>
            </div>
          </section>

          <section className="pt-4 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Questions about our methodology or want to suggest improvements?
            </p>
            <Link
              href="/about"
              className="text-gray-900 font-medium underline hover:no-underline"
            >
              Learn how to contribute
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
