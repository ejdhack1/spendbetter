import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">SpendBetter</h3>
            <p className="text-sm text-gray-600">
              Research tool for ethical spending decisions. We track corporate signals
              on democracy, civil rights, and labor practices.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-gray-600 hover:text-gray-900">
                  Methodology
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Disclaimer</h4>
            <p className="text-sm text-gray-600">
              This tool is for informational purposes only. We strive for accuracy
              but cannot guarantee completeness. Always do your own research.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} SpendBetter. Built with care.
        </div>
      </div>
    </footer>
  )
}
