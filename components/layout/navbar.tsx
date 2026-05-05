'use client'

import Link from 'next/link'
import { Menu, X, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'
import { CommandPalette } from '@/components/shared'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      setIsLoggedIn(!!token)
      if (user) {
        try { setUserName(JSON.parse(user).name?.split(' ')[0] || '') } catch { }
      }
    }
    checkAuth()
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('githubRepos')
    setIsLoggedIn(false)
    setMobileMenuOpen(false)
    router.push('/login')
  }

  const navLinks = isLoggedIn
    ? [
        { href: '/', label: 'Home', icon: '🏠' },
        { href: '/dashboard/templates', label: 'Templates', icon: '🎨' },
        { href: '/pricing', label: 'Pricing', icon: '💎' },
        { href: '/docs', label: 'Docs', icon: '📚' },
      ]
    : [
        { href: '/', label: 'Home', icon: '🏠' },
        { href: '/pricing', label: 'Pricing', icon: '💎' },
        { href: '/docs', label: 'Docs', icon: '📚' },
        { href: '/demo', label: 'Demo', icon: '👀' },
      ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return false
    return pathname === href || pathname?.startsWith(href + '/')
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'border-b border-border bg-background/90 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/20'
        : 'border-b border-transparent bg-background/80 backdrop-blur-lg'
    }`}>
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={isLoggedIn ? '/' : '/'}
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-lg text-foreground tracking-tight">
                Folio<span className="text-indigo-500 dark:text-indigo-400">Forge</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                  isActive(item.href)
                    ? 'text-foreground bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-xs">{item.icon}</span>
                  {item.label}
                </span>
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-indigo-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <CommandPalette />
            <ThemeToggle />

            {isLoggedIn ? (
              <div className="hidden md:flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => router.push('/generate')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 rounded-xl gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Generate
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => router.push('/dashboard')}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl"
                >
                  Dashboard
                </Button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-xl hover:bg-accent/50 transition-all"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-accent/50 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 text-sm font-semibold bg-foreground text-background rounded-xl hover:bg-foreground/90 transition-all shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden h-10 w-10 rounded-xl border border-border bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="border-t border-border py-4 space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? 'text-foreground bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
                {isActive(item.href) && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-indigo-500" />
                )}
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-border space-y-3 px-4">
              {isLoggedIn ? (
                <>
                  <Button
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 rounded-xl gap-2"
                    onClick={() => { router.push('/generate'); setMobileMenuOpen(false) }}
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate Portfolio
                  </Button>
                  <Button
                    className="w-full border-border bg-muted/50 rounded-xl"
                    variant="outline"
                    onClick={() => { router.push('/dashboard'); setMobileMenuOpen(false) }}
                  >
                    Dashboard
                  </Button>
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 text-sm text-muted-foreground hover:text-foreground rounded-xl hover:bg-accent/50 transition-all text-center"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-3 text-center text-sm font-semibold bg-foreground text-background rounded-xl hover:bg-foreground/90 transition-all"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-3 text-center text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-accent/50 transition-all border border-border"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}