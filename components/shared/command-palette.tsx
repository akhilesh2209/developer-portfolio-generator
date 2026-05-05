'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import {
  Command,
  Settings,
  Zap,
  Layout,
  BarChart3,
  Rocket,
  Github,
  Search,
} from 'lucide-react'
import Link from 'next/link'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const commands = [
    {
      id: 1,
      name: 'Choose Template',
      description: 'Select a template',
      icon: Layout,
      href: '/dashboard/templates',
    },
    {
      id: 2,
      name: 'View Analytics',
      description: 'Check your portfolio stats',
      icon: BarChart3,
      href: '/dashboard/analytics',
    },
    {
      id: 3,
      name: 'Manage Projects',
      description: 'Edit your projects',
      icon: Github,
      href: '/dashboard/projects',
    },
    {
      id: 4,
      name: 'Deploy Portfolio',
      description: 'Deploy your portfolio',
      icon: Rocket,
      href: '/dashboard/deploy',
    },
    {
      id: 5,
      name: 'Settings',
      description: 'Account settings',
      icon: Settings,
      href: '/dashboard/settings',
    },
    {
      id: 6,
      name: 'Home',
      description: 'Go to dashboard',
      icon: Zap,
      href: '/dashboard',
    },
  ]

  const filtered = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase()),
  )

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(!open)
        setSearch('')
      }
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [open])

  return (
    <>
      {/* Command Palette Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-sm"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="ml-auto text-xs bg-muted/50 border border-border px-1.5 py-0.5 rounded text-muted-foreground">
          Ctrl K
        </kbd>
      </button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Modal - Fixed center positioning */}
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">
              <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="bg-popover border border-border rounded-2xl shadow-2xl overflow-hidden">
                  {/* Search Input */}
                  <div className="p-4 border-b border-border">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search commands..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus
                        className="pl-10 border-0 bg-transparent focus-visible:ring-0 text-base h-12"
                      />
                    </div>
                  </div>

                  {/* Command List */}
                  <div className="max-h-80 overflow-y-auto p-2">
                    {filtered.length > 0 ? (
                      filtered.map((cmd, idx) => {
                        const Icon = cmd.icon
                        return (
                          <motion.div
                            key={cmd.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link
                              href={cmd.href}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-accent transition-colors group"
                            >
                              <div className="h-9 w-9 rounded-lg bg-muted/50 border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                                  {cmd.name}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {cmd.description}
                                </p>
                              </div>
                            </Link>
                          </motion.div>
                        )
                      })
                    ) : (
                      <div className="py-12 text-center">
                        <Command className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">No commands found</p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-3 border-t border-border bg-muted/30 flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <kbd className="px-2 py-0.5 rounded-md bg-background border border-border text-[11px] font-mono">
                        ↑↓
                      </kbd>
                      <span>Navigate</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <kbd className="px-2 py-0.5 rounded-md bg-background border border-border text-[11px] font-mono">
                        ↵
                      </kbd>
                      <span>Select</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <kbd className="px-2 py-0.5 rounded-md bg-background border border-border text-[11px] font-mono">
                        Esc
                      </kbd>
                      <span>Close</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}