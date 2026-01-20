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
    <div className="min-h-screen bg-paper">
      {/* Header spacer for fixed header */}
      <div className="h-16" />

      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="font-serif text-4xl text-ink-950 mb-2">Methodology</h1>
        <p className="text-ink-500 font-display mb-10">How we research, score, and rate companies</p>

        <div className="space-y-10">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">Overview</h2>
            <p className="text-ink-600 leading-relaxed">
              Every company in SpendBetter is evaluated based on documented &quot;signals&quot;&mdash;specific
              corporate actions that affect democracy, civil rights, or labor. Each signal is verified,
              weighted by severity, and contributes to the company&apos;s overall score.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">Signal Categories</h2>
            <p className="text-ink-600 mb-6 leading-relaxed">We track three categories of corporate behavior:</p>

            <div className="space-y-4">
              <div className="bg-white border border-blue-100 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-category-democracy" />
                  <h3 className="font-display font-semibold text-ink-950">Democracy Signals</h3>
                </div>
                <p className="text-ink-600 text-sm mb-3 leading-relaxed">
                  Actions that undermine democratic institutions or processes
                </p>
                <ul className="text-sm text-ink-500 space-y-1 font-mono">
                  <li>Election denial funding (weight: 5)</li>
                  <li>Anti-voting rights lobbying (weight: 4)</li>
                  <li>Major Trump PAC donations (weight: 4)</li>
                  <li>General GOP donations (weight: 1)</li>
                </ul>
              </div>

              <div className="bg-white border border-purple-100 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-category-civil" />
                  <h3 className="font-display font-semibold text-ink-950">Civil Rights Signals</h3>
                </div>
                <p className="text-ink-600 text-sm mb-3 leading-relaxed">
                  Actions that harm marginalized communities or enable discrimination
                </p>
                <ul className="text-sm text-ink-500 space-y-1 font-mono">
                  <li>ICE/DHS contracts (weight: 4)</li>
                  <li>Surveillance technology development (weight: 3)</li>
                  <li>Anti-LGBTQ funding (weight: 4)</li>
                  <li>DEI program elimination (weight: 3)</li>
                </ul>
              </div>

              <div className="bg-white border border-orange-100 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-category-labor" />
                  <h3 className="font-display font-semibold text-ink-950">Labor Signals</h3>
                </div>
                <p className="text-ink-600 text-sm mb-3 leading-relaxed">
                  Actions that harm workers or suppress worker rights
                </p>
                <ul className="text-sm text-ink-500 space-y-1 font-mono">
                  <li>Anti-union actions (weight: 3)</li>
                  <li>Labor law violations (weight: 4)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">Score Calculation</h2>
            <p className="text-ink-600 mb-4 leading-relaxed">
              Each category (Democracy, Civil Rights, Labor) receives its own score based on the sum
              of signal weights. The total score is the sum of all three categories.
            </p>

            <div className="bg-ink-950 rounded-xl p-5 mb-4">
              <code className="text-sm text-white font-mono">
                Total Score = Democracy Score + Civil Rights Score + Labor Score
              </code>
            </div>

            <p className="text-ink-600 leading-relaxed">
              Signal weights range from 1 (minor concern) to 5 (severe). Multiple signals of the
              same type stack, so a company with repeated offenses will score higher.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">Risk Levels</h2>
            <p className="text-ink-600 mb-4 leading-relaxed">
              Based on total score, companies are assigned a risk level:
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 risk-badge-green rounded-xl">
                <span className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                  <span className="font-display font-semibold">Green (Low Risk)</span>
                </span>
                <span className="font-mono text-sm">Score 0-3</span>
              </div>

              <div className="flex items-center justify-between p-4 risk-badge-yellow rounded-xl">
                <span className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="font-display font-semibold">Yellow (Medium Risk)</span>
                </span>
                <span className="font-mono text-sm">Score 4-8</span>
              </div>

              <div className="flex items-center justify-between p-4 risk-badge-red rounded-xl">
                <span className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="font-display font-semibold">Red (High Risk)</span>
                </span>
                <span className="font-mono text-sm">Score 9+</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">Verification Process</h2>
            <p className="text-ink-600 mb-4 leading-relaxed">
              Before a signal is added to our database, it must meet these criteria:
            </p>
            <ol className="list-decimal list-inside text-ink-600 space-y-2 ml-2">
              <li>Documented in a credible public source</li>
              <li>Directly attributable to the company (not speculation)</li>
              <li>Verifiable through the provided evidence link</li>
              <li>Relevant to our three tracking categories</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">Alternative Ratings</h2>
            <p className="text-ink-600 mb-4 leading-relaxed">
              For each flagged company, we suggest alternatives categorized by type and practicality:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-white border border-ink-100 rounded-xl">
                <h4 className="font-display font-medium text-ink-950 mb-2">Type</h4>
                <ul className="text-sm text-ink-600 space-y-1">
                  <li><span className="text-category-democracy font-medium">National</span> &mdash; Widely available</li>
                  <li><span className="text-category-civil font-medium">Local</span> &mdash; Support local businesses</li>
                  <li><span className="text-emerald-600 font-medium">Co-op</span> &mdash; Worker/member owned</li>
                </ul>
              </div>

              <div className="p-4 bg-white border border-ink-100 rounded-xl">
                <h4 className="font-display font-medium text-ink-950 mb-2">Practicality</h4>
                <ul className="text-sm text-ink-600 space-y-1">
                  <li><span className="font-medium">Easy</span> &mdash; Simple switch</li>
                  <li><span className="font-medium">Moderate</span> &mdash; Requires some effort</li>
                  <li><span className="font-medium">Niche</span> &mdash; Limited availability</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">Limitations</h2>
            <div className="bg-ink-50 border border-ink-100 rounded-xl p-5">
              <ul className="text-sm text-ink-600 space-y-2">
                <li>We only track documented actions, not company culture or values</li>
                <li>Absence of signals doesn&apos;t guarantee ethical behavior</li>
                <li>Our data may not be complete or up-to-date for all companies</li>
                <li>Weight assignments involve editorial judgment</li>
                <li>We don&apos;t track positive actions that might offset negatives</li>
              </ul>
            </div>
          </section>

          <section className="pt-6 border-t border-ink-100">
            <p className="text-ink-600 mb-4 leading-relaxed">
              Questions about our methodology or want to suggest improvements?
            </p>
            <Link
              href="/about"
              className="font-display font-medium text-ink-950 underline hover:no-underline"
            >
              Learn how to contribute
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
