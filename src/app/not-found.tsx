import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/#categories"
            className="px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Browse Categories
          </Link>
        </div>

        <div className="mt-12 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
          <p className="text-sm text-gray-600">
            Looking for a specific company? Try searching:
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 mt-2 text-gray-900 font-medium hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search companies
          </Link>
        </div>
      </div>
    </div>
  )
}
