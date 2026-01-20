import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-ink-900 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="w-2 h-2 rounded-full bg-green-500" />
              </span>
              <span className="text-lg font-display font-semibold text-white tracking-tight">
                SpendBetter
              </span>
            </Link>
            <p className="text-sm text-ink-300 leading-relaxed">
              Research tool for ethical spending decisions. We track corporate signals
              on democracy, civil rights, and labor practices.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-ink-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-ink-300 hover:text-white transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-ink-300 hover:text-white transition-colors text-sm">
                  Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Signal Categories */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Signals We Track
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-category-democracy" />
                <span className="text-ink-300 text-sm">Democracy</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-category-civil" />
                <span className="text-ink-300 text-sm">Civil Rights</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-category-labor" />
                <span className="text-ink-300 text-sm">Labor</span>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Disclaimer
            </h4>
            <p className="text-sm text-ink-300 leading-relaxed">
              This tool is for informational purposes only. We strive for accuracy
              but cannot guarantee completeness. Always do your own research.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-ink-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink-400">
            &copy; {new Date().getFullYear()} SpendBetter. Built with care.
          </p>
          <p className="font-mono text-xs text-ink-500">
            v1.0.0
          </p>
        </div>
      </div>
    </footer>
  )
}
