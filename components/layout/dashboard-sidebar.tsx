'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Menu, X, LogOut, ChevronRight, Sparkles,
  LayoutDashboard, FolderGit2, BarChart3, Rocket,
  FileText, Swords, Palette, Settings, Flame,
  ExternalLink, HelpCircle, Zap
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { 
    href: '/dashboard', 
    label: 'Overview', 
    icon: LayoutDashboard,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-500/10',
    border: 'border-blue-300 dark:border-blue-500/20'
  },
  { 
    href: '/dashboard/projects', 
    label: 'Projects', 
    icon: FolderGit2,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-500/10',
    border: 'border-emerald-300 dark:border-emerald-500/20'
  },
  { 
    href: '/dashboard/analytics', 
    label: 'Analytics', 
    icon: BarChart3,
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-100 dark:bg-violet-500/10',
    border: 'border-violet-300 dark:border-violet-500/20'
  },
  { 
    href: '/dashboard/deploy', 
    label: 'Deploy', 
    icon: Rocket,
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-100 dark:bg-cyan-500/10',
    border: 'border-cyan-300 dark:border-cyan-500/20'
  },
  { 
    href: '/dashboard/resume', 
    label: 'Resume', 
    icon: FileText,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-500/10',
    border: 'border-amber-300 dark:border-amber-500/20'
  },
  { 
    href: '/dashboard/compare', 
    label: 'Compare', 
    icon: Swords,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-500/10',
    border: 'border-orange-300 dark:border-orange-500/20'
  },
  { 
    href: '/dashboard/templates', 
    label: 'Templates', 
    icon: Palette,
    color: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-100 dark:bg-pink-500/10',
    border: 'border-pink-300 dark:border-pink-500/20'
  },
  { 
    href: '/dashboard/roast', 
    label: 'Roast Me', 
    icon: Flame,
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-500/10',
    border: 'border-red-300 dark:border-red-500/20',
    badge: '🔥 Hot'
  },
]

const BOTTOM_LINKS = [
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/docs', label: 'Help & Docs', icon: HelpCircle },
]

export function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<{ name?: string } | null>(null)
  const [githubUsername, setGithubUsername] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    const gh = localStorage.getItem('githubUsername')
    if (gh) {
      setGithubUsername(gh)
    }
  }, [])

  const closeMobile = () => setMobileOpen(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('githubRepos')
    router.push('/login')
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname?.startsWith(href)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-black text-lg text-foreground leading-tight">
              Folio<span className="text-indigo-500 dark:text-indigo-400">Forge</span>
            </p>
            <p className="text-[10px] text-muted-foreground font-medium">Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold px-3 mb-3">
          Main Menu
        </p>
        
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobile}
              className={cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative',
                active
                  ? 'bg-accent text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              )}
            >
              <div className={cn(
                'h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-200',
                active ? item.bg : 'bg-muted/50 group-hover:bg-muted'
              )}>
                <item.icon className={cn('h-4 w-4', active ? item.color : 'text-muted-foreground group-hover:text-foreground')} />
              </div>
              
              <span className="flex-1">{item.label}</span>
              
              {item.badge && (
                <Badge className={cn(
                  'text-[10px] px-2 py-0 border',
                  item.bg, item.color, item.border
                )}>
                  {item.badge}
                </Badge>
              )}
              
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-r-full" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Quick Actions */}
      <div className="px-3 py-3 space-y-1">
        <Link
          href="/generate"
          onClick={closeMobile}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/20 transition-all group"
        >
          <div className="h-8 w-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <span className="flex-1">Generate Portfolio</span>
          <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-border px-3 pt-3 pb-4 space-y-1">
        {BOTTOM_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={closeMobile}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all group"
          >
            <link.icon className="h-4 w-4 group-hover:text-foreground transition-colors" />
            <span>{link.label}</span>
          </Link>
        ))}

        <button
          onClick={() => { handleLogout(); closeMobile() }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/5 transition-all group"
        >
          <LogOut className="h-4 w-4 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* User Footer */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              {githubUsername ? `@${githubUsername}` : 'Free Plan'}
            </p>
          </div>
        </div>
      </div>

      {/* Version */}
      <div className="px-4 pb-3">
        <p className="text-[10px] text-muted-foreground/50 text-center">
          FolioForge v2.0 · © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-5 right-5 z-50 h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/40 flex items-center justify-center hover:shadow-indigo-500/60 transition-shadow active:scale-95"
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          'hidden lg:block w-64 flex-shrink-0 border-r border-border bg-background',
          'h-screen sticky top-16'
        )}
      >

        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile */}
      <aside
        className={cn(
          'lg:hidden fixed inset-y-0 left-0 z-40 w-72 border-r border-border bg-background shadow-2xl',
          'transition-transform duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={closeMobile}
        />
      )}
    </>
  )
}