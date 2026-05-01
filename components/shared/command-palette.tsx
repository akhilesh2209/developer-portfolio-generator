'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Command, Settings, Zap, Layout, BarChart3, Rocket, Github, Search } from 'lucide-react'
import Link from 'next/link'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const commands = [
    { id: 1, name: 'Choose Template', description: 'Select a template', icon: Layout, href: '/dashboard/templates' },
    { id: 2, name: 'View Analytics', description: 'Check your portfolio stats', icon: BarChart3, href: '/dashboard/analytics' },
    { id: 3, name: 'Manage Projects', description: 'Edit your projects', icon: Github, href: '/dashboard/projects' },
    { id: 4, name: 'Deploy Portfolio', description: 'Deploy your portfolio', icon: Rocket, href: '/dashboard/deploy' },
    { id: 5, name: 'Settings', description: 'Account settings', icon: Settings, href: '/dashboard/settings' },
    { id: 6, name: 'Home', description: 'Go to dashboard', icon: Zap, href: '/dashboard' },
  ]

  const filtered = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.description.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(!open)
        setSearch('')
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [open])

  return (
    <>
      {/* Command Palette Trigger */}
      <motion.button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background/50 hover:bg-background text-muted-foreground hover:text-foreground transition-colors text-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="ml-auto text-xs bg-muted px-1.5 py-0.5 rounded">Ctrl K</kbd>
      </motion.button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
              initial={{ opacity: 0, scale: 0.95, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="bg-background border border-border rounded-lg shadow-lg overflow-hidden">
                {/* Search Input */}
                <div className="p-4 border-b border-border">
                  <Input
                    placeholder="Search commands..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                    className="border-0 bg-transparent focus-visible:ring-0 text-lg"
                  />
                </div>

                {/* Command List */}
                <motion.div className="max-h-96 overflow-y-auto">
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
                            className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors border-b border-border/50 last:border-b-0 group cursor-pointer"
                          >
                            <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            <div className="flex-1">
                              <p className="font-medium group-hover:text-primary transition-colors">{cmd.name}</p>
                              <p className="text-xs text-muted-foreground">{cmd.description}</p>
                            </div>
                          </Link>
                        </motion.div>
                      )
                    })
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No commands found</p>
                    </div>
                  )}
                </motion.div>

                {/* Footer */}
                <div className="p-3 border-t border-border/50 bg-muted/50 flex gap-2 text-xs text-muted-foreground">
                  <kbd className="px-2 py-1 rounded bg-background border border-border">↑↓</kbd>
                  <span>to navigate</span>
                  <kbd className="px-2 py-1 rounded bg-background border border-border ml-2">Enter</kbd>
                  <span>to select</span>
                  <kbd className="px-2 py-1 rounded bg-background border border-border ml-2">Esc</kbd>
                  <span>to close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
