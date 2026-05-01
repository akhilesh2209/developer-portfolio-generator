'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import {
  Plus, ExternalLink, Eye, EyeOff, Star, RefreshCw,
  Github, Search, Sparkles, AlertCircle, Check, Code2,
  GitFork, Filter, LayoutGrid, List, Zap, ArrowUpRight, ArrowRight,
  Command, Terminal, Globe, Database, Palette, Cpu,
  ChevronRight, SlidersHorizontal, X, Layers, Box,
  TrendingUp, Clock, Bookmark, Share2, Download,
  FolderGit2, GitBranch, GitCommit, GitPullRequest
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const langColors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  JavaScript: { bg: '#f7df1e15', text: '#f7df1e', border: '#f7df1e30', glow: '#f7df1e40' },
  TypeScript: { bg: '#3178c615', text: '#3178c6', border: '#3178c630', glow: '#3178c640' },
  Python: { bg: '#3776ab15', text: '#3776ab', border: '#3776ab30', glow: '#3776ab40' },
  Java: { bg: '#ed8b0015', text: '#ed8b00', border: '#ed8b0030', glow: '#ed8b0040' },
  'C++': { bg: '#00599c15', text: '#00599c', border: '#00599c30', glow: '#00599c40' },
  Go: { bg: '#00acd715', text: '#00acd7', border: '#00acd730', glow: '#00acd740' },
  Rust: { bg: '#ce422b15', text: '#ce422b', border: '#ce422b30', glow: '#ce422b40' },
  Ruby: { bg: '#cc342d15', text: '#cc342d', border: '#cc342d30', glow: '#cc342d40' },
  PHP: { bg: '#8892be15', text: '#8892be', border: '#8892be30', glow: '#8892be40' },
  Swift: { bg: '#fa734315', text: '#fa7343', border: '#fa734330', glow: '#fa734340' },
  Kotlin: { bg: '#7f52ff15', text: '#7f52ff', border: '#7f52ff30', glow: '#7f52ff40' },
  CSS: { bg: '#563d7c15', text: '#563d7c', border: '#563d7c30', glow: '#563d7c40' },
  HTML: { bg: '#e34c2615', text: '#e34c26', border: '#e34c2630', glow: '#e34c2640' },
  Dart: { bg: '#0175c215', text: '#0175c2', border: '#0175c230', glow: '#0175c240' },
}

function getLangStyle(lang: string) {
  return langColors[lang] || { bg: '#6366f115', text: '#6366f1', border: '#6366f130', glow: '#6366f140' }
}

function FloatingParticles() {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const generated = [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      background:
        i % 3 === 0
          ? '#6366f1'
          : i % 3 === 1
          ? '#8b5cf6'
          : '#ec4899',
      duration: 4,
      delay: i * 0.1,
    }))
    setParticles(generated)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: p.left,
            top: p.top,
            background: `radial-gradient(circle, ${p.background}, transparent)`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}

function SkeletonLoader() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="p-6 border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 bg-muted rounded animate-pulse" />
                <div className="h-3 w-72 bg-muted rounded animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-16 bg-muted rounded-lg animate-pulse" />
                <div className="h-8 w-8 bg-muted rounded-lg animate-pulse" />
                <div className="h-8 w-8 bg-muted rounded-lg animate-pulse" />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [generating, setGenerating] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterLang, setFilterLang] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'name' | 'stars' | 'recent'>('stars')
  const router = useRouter()

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }
    loadProjects()
  }, [router])

  useEffect(() => {
    let result = [...projects]
    
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.language?.toLowerCase().includes(q)
      )
    }
    
    if (filterLang !== 'all') {
      result = result.filter(p => p.language === filterLang)
    }
    
    result.sort((a, b) => {
      if (sortBy === 'stars') return (b.stars || 0) - (a.stars || 0)
      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '')
      return 0
    })
    
    setFiltered(result)
  }, [search, projects, filterLang, sortBy])

  const loadProjects = () => {
    setLoading(true)
    const savedRepos = sessionStorage.getItem('githubRepos')
    if (savedRepos) {
      const repos = JSON.parse(savedRepos).map((r: any) => ({ ...r, visible: r.visible !== false }))
      setProjects(repos)
      setFiltered(repos)
      setLoading(false)
      return
    }
    const username = localStorage.getItem('githubUsername')
    if (!username) { setLoading(false); return }
    fetch(`http://localhost:5000/api/github/${username}`)
      .then(r => r.json())
      .then(data => {
        const repos = Array.isArray(data) ? data.map(r => ({ ...r, visible: true })) : []
        setProjects(repos)
        setFiltered(repos)
        sessionStorage.setItem('githubRepos', JSON.stringify(repos))
      })
      .catch(() => { setProjects([]); setFiltered([]) })
      .finally(() => setLoading(false))
  }

  const toggleVisibility = (idx: number) => {
    setProjects(prev => {
      const updated = prev.map((p, i) => i === idx ? { ...p, visible: !p.visible } : p)
      sessionStorage.setItem('githubRepos', JSON.stringify(updated))
      return updated
    })
  }

  const generateDescription = async (project: any, idx: number) => {
    setGenerating(project.name)
    try {
      const res = await fetch('http://localhost:5000/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: project.name, description: project.description, language: project.language }),
      })
      if (!res.ok) throw new Error('AI unavailable')
      const data = await res.json()
      if (data.description) {
        setProjects(prev => {
          const updated = prev.map((p, i) => i === idx ? { ...p, description: data.description } : p)
          sessionStorage.setItem('githubRepos', JSON.stringify(updated))
          return updated
        })
        showToast('✨ AI description generated successfully!')
      }
    } catch {
      showToast('AI service temporarily unavailable', 'error')
    }
    finally { setGenerating(null) }
  }

  const totalStars = projects.reduce((a, r) => a + (r.stars || 0), 0)
  const totalForks = projects.reduce((a, r) => a + (r.forks || 0), 0)
  const languages = [...new Set(projects.map(r => r.language).filter(Boolean))] as string[]
  const visibleCount = projects.filter(p => p.visible !== false).length
  const displayList = filtered

  if (loading) return (
    <div className="relative min-h-screen">
      <FloatingParticles />
      <div className="relative max-w-7xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-6">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-24 h-24"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full blur-xl opacity-50" />
              <div className="relative h-full w-full border-4 border-primary/20 rounded-full" />
              <div className="absolute inset-0 h-full w-full border-4 border-transparent border-t-primary rounded-full animate-spin" />
            </motion.div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Loading Projects
              </p>
              <p className="text-muted-foreground text-sm mt-2">Fetching your repositories...</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative min-h-screen">
      <FloatingParticles />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: -20, scale: 0.95, x: '-50%' }}
            className={`fixed top-6 left-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-sm font-semibold backdrop-blur-xl border ${
              toast.type === 'success'
                ? 'bg-emerald-500/90 text-white border-emerald-400/30'
                : 'bg-red-500/90 text-white border-red-400/30'
            }`}
          >
            {toast.type === 'success' ? (
              <Check className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            {toast.msg}
            <button
              onClick={() => setToast(null)}
              className="ml-2 hover:opacity-80"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative space-y-8 max-w-7xl mx-auto px-4 pb-16">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative pt-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-8">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 backdrop-blur-xl rounded-full px-4 py-1.5 border border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/10 mb-4"
              >
                <FolderGit2 className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary">
                  {projects.length > 0 ? `${projects.length} Repositories` : 'No Repos Yet'}
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  My
                </span>
                {' '}
                <span className="text-foreground">
                  Projects
                </span>
              </h1>

              {projects.length > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground mt-3 flex items-center gap-3 flex-wrap"
                >
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20">
                    <Eye className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">{visibleCount} visible</span>
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-300 dark:border-yellow-500/20">
                    <Star className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">{totalStars} stars</span>
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/10 border border-violet-300 dark:border-violet-500/20">
                    <Code2 className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                    <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">{languages.length} languages</span>
                  </span>
                </motion.p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={loadProjects}
                  className="group border-border hover:border-primary/30 bg-background rounded-2xl gap-2"
                >
                  <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                  Sync
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  asChild
                  className="group bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all rounded-2xl gap-2"
                >
                  <Link href="/dashboard/projects/new">
                    <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
                    Add Project
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        {projects.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { label: 'Total Repos', value: projects.length, icon: FolderGit2, color: 'from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/5', iconColor: 'text-blue-500 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-500/20' },
              { label: 'Visible', value: visibleCount, icon: Eye, color: 'from-emerald-500/10 to-emerald-600/5 dark:from-emerald-500/20 dark:to-emerald-600/5', iconColor: 'text-emerald-500 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-500/20' },
              { label: 'Total Stars', value: totalStars, icon: Star, color: 'from-yellow-500/10 to-yellow-600/5 dark:from-yellow-500/20 dark:to-yellow-600/5', iconColor: 'text-yellow-500 dark:text-yellow-400', border: 'border-yellow-200 dark:border-yellow-500/20' },
              { label: 'Languages', value: languages.length, icon: Code2, color: 'from-violet-500/10 to-violet-600/5 dark:from-violet-500/20 dark:to-violet-600/5', iconColor: 'text-violet-500 dark:text-violet-400', border: 'border-violet-200 dark:border-violet-500/20' },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -4, scale: 1.02 }}>
                <Card className={`relative overflow-hidden p-5 bg-gradient-to-br ${stat.color} ${stat.border} border backdrop-blur-xl group cursor-default shadow-sm`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-foreground/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <div className="relative flex items-start justify-between">
                    <div>
                      <p className="text-3xl font-black tracking-tight text-foreground">{stat.value.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</p>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Search & Filters */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search projects by name, description, or language..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-12 h-12 bg-muted/50 border-border focus:border-primary/50 rounded-2xl text-sm"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-border hover:border-primary/30 bg-background rounded-2xl gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {filterLang !== 'all' && (
                    <Badge className="ml-1 bg-primary/20 text-primary border-primary/30">1</Badge>
                  )}
                </Button>

                <div className="flex items-center bg-muted/50 border border-border rounded-2xl overflow-hidden">
                  {(['grid', 'list'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setViewMode(m)}
                      className={`h-12 w-12 flex items-center justify-center transition-all duration-300 ${
                        viewMode === m
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {m === 'grid' ? <LayoutGrid className="h-4 w-4" /> : <List className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Extended Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <Card className="p-4 border-border bg-card backdrop-blur-xl">
                    <div className="flex flex-wrap items-center gap-4">
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-2 block">Language</label>
                        <select
                          value={filterLang}
                          onChange={e => setFilterLang(e.target.value)}
                          className="h-10 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary/50 cursor-pointer"
                        >
                          <option value="all">All Languages</option>
                          {languages.map(l => (
                            <option key={l} value={l}>{l}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-2 block">Sort By</label>
                        <select
                          value={sortBy}
                          onChange={e => setSortBy(e.target.value as any)}
                          className="h-10 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary/50 cursor-pointer"
                        >
                          <option value="stars">Most Stars</option>
                          <option value="name">Name A-Z</option>
                          <option value="recent">Recently Updated</option>
                        </select>
                      </div>

                      <div className="flex items-end gap-2 ml-auto">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setFilterLang('all')
                            setSortBy('stars')
                            setSearch('')
                          }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Clear Filters
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="relative overflow-hidden p-16 text-center border-2 border-dashed border-border bg-card backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />
              
              <div className="relative space-y-6">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mx-auto w-24 h-24 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center"
                >
                  <Github className="h-12 w-12 text-primary/60" />
                </motion.div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">No Repositories Yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Connect your GitHub account to automatically import all your repositories and start managing them beautifully.
                  </p>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    onClick={() => router.push('/dashboard')}
                    className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-2xl px-8 py-6 text-lg"
                  >
                    <Github className="h-5 w-5 mr-3" />
                    Connect GitHub Account
                    <ArrowRight className="h-5 w-5 ml-3" />
                  </Button>
                </motion.div>

                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Command className="h-4 w-4" />
                    Auto-import repos
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" />
                    AI descriptions
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" />
                    Toggle visibility
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <>
            {/* Project List/Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
                  : 'space-y-3'
              }
            >
              <AnimatePresence mode="popLayout">
                {displayList.map((project, idx) => {
                  const langStyle = getLangStyle(project.language)
                  
                  return (
                    <motion.div
                      key={project.name + idx}
                      layout
                      variants={itemVariants}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    >
                      {viewMode === 'list' ? (
                        /* List View Card */
                        <motion.div
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Card className={`group relative overflow-hidden border transition-all duration-300 hover:shadow-xl ${
                            project.visible === false
                              ? 'border-border opacity-60 hover:opacity-80'
                              : 'border-border hover:border-primary/30'
                          } bg-card backdrop-blur-xl`}
                          >
                            <div
                              className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 group-hover:w-1.5"
                              style={{
                                background: project.visible !== false
                                  ? `linear-gradient(to bottom, ${langStyle.text}, ${langStyle.text}50, transparent)`
                                  : 'linear-gradient(to bottom, #6b7280, #6b728050, transparent)'
                              }}
                            />

                            <div className="p-5 pl-6 flex items-center gap-5">
                              <div
                                className="relative flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                style={{
                                  backgroundColor: langStyle.bg,
                                  border: `1px solid ${langStyle.border}`,
                                  boxShadow: `0 0 20px ${langStyle.glow}`
                                }}
                              >
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: langStyle.text }}
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                                    {project.name}
                                  </h3>
                                  {project.language && (
                                    <span
                                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                      style={{
                                        backgroundColor: langStyle.bg,
                                        color: langStyle.text,
                                        border: `1px solid ${langStyle.border}`
                                      }}
                                    >
                                      {project.language}
                                    </span>
                                  )}
                                  {project.visible === false && (
                                    <Badge variant="secondary" className="text-[10px] px-2 py-0 bg-muted">
                                      <EyeOff className="h-3 w-3 mr-1" />
                                      Hidden
                                    </Badge>
                                  )}
                                </div>

                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1">
                                  {project.description || (
                                    <span className="italic opacity-50">
                                      No description — click ✨ AI to generate one
                                    </span>
                                  )}
                                </p>

                                {project.stars > 0 && (
                                  <div className="flex items-center gap-3 mt-2 text-xs">
                                    <span className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
                                      <Star className="h-3 w-3 fill-current" />
                                      <span className="font-semibold">{project.stars}</span>
                                    </span>
                                    {project.forks > 0 && (
                                      <span className="flex items-center gap-1 text-muted-foreground">
                                        <GitFork className="h-3 w-3" />
                                        <span>{project.forks}</span>
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={generating === project.name}
                                    onClick={() => generateDescription(project, idx)}
                                    className="h-9 px-3 text-xs gap-1.5 border-border hover:border-primary/30 hover:bg-primary/5 rounded-xl"
                                  >
                                    {generating === project.name ? (
                                      <span className="h-3.5 w-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                                    )}
                                    AI
                                  </Button>
                                </motion.div>

                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => toggleVisibility(idx)}
                                  className="h-9 w-9 rounded-xl border border-border hover:border-primary/30 hover:bg-muted flex items-center justify-center transition-all"
                                >
                                  {project.visible === false ? (
                                    <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
                                  ) : (
                                    <Eye className="h-3.5 w-3.5 text-primary" />
                                  )}
                                </motion.button>

                                {project.url && (
                                  <motion.a
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    href={project.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="h-9 w-9 rounded-xl border border-border hover:border-primary/30 hover:bg-muted flex items-center justify-center transition-all"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </motion.a>
                                )}
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ) : (
                        /* Grid View Card */
                        <motion.div
                          whileHover={{ y: -8 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Card className={`group relative overflow-hidden h-full border transition-all duration-300 hover:shadow-xl ${
                            project.visible === false
                              ? 'border-border opacity-60 hover:opacity-80'
                              : 'border-border hover:border-primary/30'
                          } bg-card backdrop-blur-xl`}
                          >
                            <div
                              className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                              style={{ backgroundColor: langStyle.text }}
                            />

                            <div className="relative p-6 flex flex-col h-full">
                              <div className="flex items-start justify-between mb-4">
                                <div
                                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                                  style={{
                                    backgroundColor: langStyle.bg,
                                    border: `2px solid ${langStyle.border}`,
                                    boxShadow: `0 0 30px ${langStyle.glow}`
                                  }}
                                >
                                  <div
                                    className="w-5 h-5 rounded-full"
                                    style={{ backgroundColor: langStyle.text }}
                                  />
                                </div>

                                <div className="flex items-center gap-2">
                                  {project.stars > 0 && (
                                    <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-300 dark:border-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs font-semibold">
                                      <Star className="h-3 w-3 fill-current" />
                                      {project.stars}
                                    </span>
                                  )}
                                  {project.visible === false && (
                                    <Badge variant="secondary" className="bg-muted text-[10px]">
                                      <EyeOff className="h-3 w-3 mr-1" />
                                      Hidden
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div className="flex-1">
                                <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                  {project.name}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                                  {project.description || (
                                    <span className="italic opacity-50">
                                      No description available. Use AI to generate a professional description.
                                    </span>
                                  )}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 mt-auto">
                                {project.language && (
                                  <span
                                    className="text-[10px] font-semibold px-2 py-1 rounded-full"
                                    style={{
                                      backgroundColor: langStyle.bg,
                                      color: langStyle.text,
                                      border: `1px solid ${langStyle.border}`
                                    }}
                                  >
                                    {project.language}
                                  </span>
                                )}
                                <div className="flex-1" />
                              </div>

                              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  disabled={generating === project.name}
                                  onClick={() => generateDescription(project, idx)}
                                  className="flex-1 h-9 text-xs gap-1.5 border-border hover:border-primary/30 hover:bg-primary/5 rounded-xl"
                                >
                                  {generating === project.name ? (
                                    <span className="h-3.5 w-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                                  )}
                                  AI Generate
                                </Button>

                                <button
                                  onClick={() => toggleVisibility(idx)}
                                  className="h-9 w-9 rounded-xl border border-border hover:border-primary/30 hover:bg-muted flex items-center justify-center transition-all"
                                >
                                  {project.visible === false ? (
                                    <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
                                  ) : (
                                    <Eye className="h-3.5 w-3.5 text-primary" />
                                  )}
                                </button>

                                {project.url && (
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="h-9 w-9 rounded-xl border border-border hover:border-primary/30 hover:bg-muted flex items-center justify-center transition-all"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>

            {/* No Results */}
            {displayList.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="mx-auto w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mb-6">
                  <Search className="h-10 w-10 text-muted-foreground/40" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">No projects found</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Try adjusting your search or filters
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearch('')
                    setFilterLang('all')
                    setSortBy('stars')
                  }}
                  className="border-border hover:border-primary/30"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </>
        )}

        {/* Pro Tips */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="relative overflow-hidden border border-border bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />
              
              <div className="relative p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Pro Tips</h3>
                    <p className="text-sm text-muted-foreground">Get the most out of your projects</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: <Eye className="h-5 w-5" />,
                      title: 'Toggle Visibility',
                      desc: 'Use the eye icon to show or hide projects on your portfolio.',
                    },
                    {
                      icon: <Sparkles className="h-5 w-5" />,
                      title: 'AI Descriptions',
                      desc: 'Click the AI button to generate professional descriptions instantly.',
                    },
                    {
                      icon: <LayoutGrid className="h-5 w-5" />,
                      title: 'Grid & List Views',
                      desc: 'Switch between grid and list views for different browsing experiences.',
                    },
                  ].map((tip, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-muted/30 border border-border hover:border-primary/30 transition-all"
                    >
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <div className="text-primary">{tip.icon}</div>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground mb-1">{tip.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}