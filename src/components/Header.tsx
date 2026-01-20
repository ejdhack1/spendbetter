'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Only show transparent header on home page
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // On non-home pages, always use solid header style
  const useSolidStyle = !isHomePage || scrolled

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${useSolidStyle
          ? 'glass border-b border-ink-100 shadow-glass'
          : 'bg-transparent'
        }
      `}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Logo mark - three colored dots */}
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 group-hover:scale-110 transition-transform" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 group-hover:scale-110 transition-transform delay-75" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 group-hover:scale-110 transition-transform delay-150" />
            </span>
            <span className={`
              text-xl font-display font-semibold tracking-tight transition-colors
              ${useSolidStyle ? 'text-ink-950' : 'text-white'}
            `}>
              SpendBetter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`
                link-underline font-display text-sm font-medium transition-colors
                ${useSolidStyle
                  ? 'text-ink-600 hover:text-ink-950'
                  : 'text-white/80 hover:text-white'
                }
              `}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`
                link-underline font-display text-sm font-medium transition-colors
                ${useSolidStyle
                  ? 'text-ink-600 hover:text-ink-950'
                  : 'text-white/80 hover:text-white'
                }
              `}
            >
              About
            </Link>
            <Link
              href="/methodology"
              className={`
                link-underline font-display text-sm font-medium transition-colors
                ${useSolidStyle
                  ? 'text-ink-600 hover:text-ink-950'
                  : 'text-white/80 hover:text-white'
                }
              `}
            >
              Methodology
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`
              md:hidden p-2 rounded-lg transition-colors
              ${useSolidStyle
                ? 'text-ink-600 hover:bg-ink-50'
                : 'text-white hover:bg-white/10'
              }
            `}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`
            md:hidden py-4 border-t animate-fade-in
            ${useSolidStyle ? 'border-ink-100' : 'border-white/10'}
          `}>
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                className={`
                  font-display text-sm font-medium py-2 px-3 rounded-lg transition-colors
                  ${useSolidStyle
                    ? 'text-ink-600 hover:text-ink-950 hover:bg-ink-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                  }
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`
                  font-display text-sm font-medium py-2 px-3 rounded-lg transition-colors
                  ${useSolidStyle
                    ? 'text-ink-600 hover:text-ink-950 hover:bg-ink-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                  }
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/methodology"
                className={`
                  font-display text-sm font-medium py-2 px-3 rounded-lg transition-colors
                  ${useSolidStyle
                    ? 'text-ink-600 hover:text-ink-950 hover:bg-ink-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                  }
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                Methodology
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
