'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  Check, AlertCircle, Plus, X, Sparkles, Github,
  Globe, Code2, Star, Layers, ArrowLeft, ArrowRight,
  Upload, FileCode, Zap, Wand2, Eye, EyeOff,
  Link2, ExternalLink, Info, HelpCircle, ThumbsUp,
  Rocket, Package, Terminal, Braces, Hash
} from 'lucide-react'

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

function FloatingParticles() {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const generated = [...Array(15)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      background:
        i % 3 === 0
          ? '#6366f1'
          : i % 3 === 1
          ? '#8b5cf6'
          : '#06b6d4',
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
            y: [0, -20, 0],
            opacity: [0, 0.5, 0],
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

const languageSuggestions = [
  'TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'Rust',
  'C++', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Dart', 'HTML', 'CSS'
]

const techSuggestions = [
  'React', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Express',
  'Django', 'Flask', 'Spring Boot', 'Laravel', 'MongoDB', 'PostgreSQL',
  'Redis', 'Docker', 'Kubernetes', 'AWS', 'Firebase', 'GraphQL',
  'REST API', 'Tailwind CSS', 'Prisma', 'TypeORM', 'Jest', 'Cypress'
]

export default function AddProjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [tech, setTech] = useState<string[]>([])
  const [techInput, setTechInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeTab, setActiveTab] = useState<'manual' | 'import'>('manual')
  const [form, setForm] = useState({
    name: '',
    description: '',
    url: '',
    githubUrl: '',
    stars: '0',
    language: '',
  })

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const addTech = (techName?: string) => {
    const t = (techName || techInput).trim()
    if (t && !tech.includes(t)) {
      setTech(prev => [...prev, t])
      setTechInput('')
      setShowSuggestions(false)
    }
  }

  const removeTech = (techName: string) => {
    setTech(prev => prev.filter(t => t !== techName))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!form.name.trim()) {
      showToast('Project name is required', 'error')
      return
    }

    setIsLoading(true)

    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
      const newProject = {
        name: form.name,
        description: form.description,
        url: form.url || form.githubUrl,
        stars: parseInt(form.stars) || 0,
        language: form.language || tech[0] || 'Other',
        technologies: tech,
        visible: true,
        userId: storedUser.id || storedUser._id,
      }

      // Save to session repos list
      const savedRepos = sessionStorage.getItem('githubRepos')
      const repos = savedRepos ? JSON.parse(savedRepos) : []
      repos.unshift(newProject)
      sessionStorage.setItem('githubRepos', JSON.stringify(repos))

      // Try backend
      try {
        await fetch('http://localhost:5000/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(newProject),
        })
      } catch {
        // Backend is optional
      }

      showToast('🎉 Project added successfully!')
      setTimeout(() => router.push('/dashboard/projects'), 1500)
    } catch (err) {
      showToast('Failed to add project', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredSuggestions = techSuggestions.filter(
    s => s.toLowerCase().includes(techInput.toLowerCase()) && !tech.includes(s)
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
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Check className="h-5 w-5" />
              </motion.div>
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            {toast.msg}
            <button onClick={() => setToast(null)} className="ml-2 hover:opacity-80">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-4xl mx-auto px-4 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative pt-8 mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />

          <div className="relative">
            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="group text-muted-foreground hover:text-foreground"
              >
                <Link href="/dashboard/projects">
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Projects
                </Link>
              </Button>
            </motion.div>

            <div className="flex items-center gap-4 mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/20"
              >
                <Plus className="h-8 w-8 text-primary" />
              </motion.div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Add New
                  </span>
                  <br className="sm:hidden" />
                  <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                    {' '}Project
                  </span>
                </h1>
                <p className="text-muted-foreground mt-2 text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Create a custom project to showcase on your portfolio
                </p>
              </div>
            </div>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6"
            >
              {[
                { icon: <Eye className="h-4 w-4" />, text: 'Visible on portfolio', color: 'from-emerald-500/20 to-green-500/10', border: 'border-emerald-500/20' },
                { icon: <Wand2 className="h-4 w-4" />, text: 'AI description available', color: 'from-violet-500/20 to-purple-500/10', border: 'border-violet-500/20' },
                { icon: <Rocket className="h-4 w-4" />, text: 'Instant publishing', color: 'from-cyan-500/20 to-blue-500/10', border: 'border-cyan-500/20' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <Card className={`p-3 bg-gradient-to-br ${item.color} ${item.border} border backdrop-blur-sm`}>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="text-primary">{item.icon}</div>
                      <span className="text-xs font-medium">{item.text}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="relative overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.1),transparent_70%)]" />
            
            <div className="relative p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <motion.div
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {/* Project Name */}
                  <motion.div variants={fieldVariants}>
                    <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                      <div className="h-6 w-6 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <Hash className="h-3.5 w-3.5 text-red-400" />
                      </div>
                      Project Name
                      <span className="text-red-400">*</span>
                    </label>
                    <div className="relative group">
                      <Input
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="My Awesome Project"
                        className="h-12 pl-4 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all rounded-2xl text-lg font-semibold"
                        required
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        {form.name.length}/100
                      </div>
                    </div>
                  </motion.div>

                  {/* Description */}
                  <motion.div variants={fieldVariants}>
                    <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                      <div className="h-6 w-6 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <FileCode className="h-3.5 w-3.5 text-blue-400" />
                      </div>
                      Description
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-blue-500/10 text-blue-400 border-blue-500/20">
                        Optional
                      </Badge>
                    </label>
                    <div className="relative">
                      <textarea
                        value={form.description}
                        onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                        placeholder="Describe what this project does, its features, and the technologies you used to build it..."
                        className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-sm min-h-36 resize-none focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-muted-foreground/50"
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                        {form.description.length}/500
                      </div>
                    </div>
                  </motion.div>

                  {/* URLs */}
                  <motion.div variants={fieldVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                        <div className="h-6 w-6 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <Globe className="h-3.5 w-3.5 text-green-400" />
                        </div>
                        Live URL
                      </label>
                      <Input
                        value={form.url}
                        onChange={e => setForm(p => ({ ...p, url: e.target.value }))}
                        placeholder="https://myproject.com"
                        className="h-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                        <div className="h-6 w-6 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <Github className="h-3.5 w-3.5 text-purple-400" />
                        </div>
                        GitHub URL
                      </label>
                      <Input
                        value={form.githubUrl}
                        onChange={e => setForm(p => ({ ...p, githubUrl: e.target.value }))}
                        placeholder="https://github.com/user/repo"
                        className="h-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all rounded-xl"
                      />
                    </div>
                  </motion.div>

                  {/* Language & Stars */}
                  <motion.div variants={fieldVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                        <div className="h-6 w-6 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                          <Code2 className="h-3.5 w-3.5 text-yellow-400" />
                        </div>
                        Primary Language
                      </label>
                      <div className="relative">
                        <Input
                          value={form.language}
                          onChange={e => setForm(p => ({ ...p, language: e.target.value }))}
                          placeholder="TypeScript"
                          className="h-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all rounded-xl"
                        />
                        {form.language && (
                          <button
                            type="button"
                            onClick={() => setForm(p => ({ ...p, language: '' }))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      {!form.language && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {languageSuggestions.slice(0, 6).map(lang => (
                            <button
                              key={lang}
                              type="button"
                              onClick={() => setForm(p => ({ ...p, language: lang }))}
                              className="px-2.5 py-1 text-[10px] rounded-full bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all"
                            >
                              {lang}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                        <div className="h-6 w-6 rounded-lg bg-amber-500/10 flex items-center justify-center">
                          <Star className="h-3.5 w-3.5 text-amber-400" />
                        </div>
                        Stars
                      </label>
                      <Input
                        type="number"
                        value={form.stars}
                        onChange={e => setForm(p => ({ ...p, stars: e.target.value }))}
                        placeholder="0"
                        className="h-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all rounded-xl"
                        min="0"
                      />
                    </div>
                  </motion.div>

                  {/* Technologies */}
                  <motion.div variants={fieldVariants}>
                    <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                      <div className="h-6 w-6 rounded-lg bg-violet-500/10 flex items-center justify-center">
                        <Layers className="h-3.5 w-3.5 text-violet-400" />
                      </div>
                      Technologies
                    </label>
                    <div className="relative">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Input
                            value={techInput}
                            onChange={e => {
                              setTechInput(e.target.value)
                              setShowSuggestions(true)
                            }}
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                addTech()
                              }
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            placeholder="React, Node.js, MongoDB..."
                            className="h-11 pl-10 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all rounded-xl"
                          />
                          <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addTech()}
                          disabled={!techInput.trim()}
                          className="h-11 w-11 border-white/10 hover:border-primary/30 bg-white/5 rounded-xl flex-shrink-0"
                        >
                          <Plus className="h-5 w-5" />
                        </Button>
                      </div>

                      {/* Tech Suggestions Dropdown */}
                      <AnimatePresence>
                        {showSuggestions && techInput && filteredSuggestions.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 top-full mt-2 w-full max-h-48 overflow-y-auto bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl"
                          >
                            {filteredSuggestions.slice(0, 8).map(suggestion => (
                              <button
                                key={suggestion}
                                type="button"
                                onClick={() => addTech(suggestion)}
                                className="w-full text-left px-4 py-2.5 text-sm hover:bg-primary/10 transition-colors flex items-center gap-2"
                              >
                                <Plus className="h-3.5 w-3.5 text-primary" />
                                {suggestion}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Tech Tags */}
                    <AnimatePresence>
                      {tech.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex flex-wrap gap-2 mt-3"
                        >
                          {tech.map((t, i) => (
                            <motion.span
                              key={t}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="group flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full text-sm font-medium text-primary hover:shadow-lg hover:shadow-primary/20 transition-all"
                            >
                              <Braces className="h-3 w-3" />
                              {t}
                              <button
                                type="button"
                                onClick={() => removeTech(t)}
                                className="hover:text-red-400 transition-colors"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </motion.span>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Submit Buttons */}
                  <motion.div
                    variants={fieldVariants}
                    className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10"
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      size="lg"
                      className="group flex-1 bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all rounded-2xl h-14 text-base"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-3">
                          <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Adding Project...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          <Rocket className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          Add Project
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      asChild
                      className="border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-sm rounded-2xl h-14"
                    >
                      <Link href="/dashboard/projects">
                        <X className="h-5 w-5 mr-2" />
                        Cancel
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            </div>
          </Card>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Card className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-xl">
            <div className="relative p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Tips for a Great Project</h3>
                  <p className="text-sm text-muted-foreground">Make your project stand out</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    icon: <FileCode className="h-4 w-4" />,
                    title: 'Clear Description',
                    desc: 'Write a detailed description explaining what your project does and why it matters.',
                    color: 'from-blue-500/10 to-blue-600/5',
                    border: 'border-blue-500/20'
                  },
                  {
                    icon: <Layers className="h-4 w-4" />,
                    title: 'Add Technologies',
                    desc: 'List all technologies used to help recruiters understand your tech stack.',
                    color: 'from-violet-500/10 to-violet-600/5',
                    border: 'border-violet-500/20'
                  },
                  {
                    icon: <Link2 className="h-4 w-4" />,
                    title: 'Include Links',
                    desc: 'Add both live demo and GitHub links to make it easy for visitors to explore.',
                    color: 'from-emerald-500/10 to-emerald-600/5',
                    border: 'border-emerald-500/20'
                  },
                ].map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className={`p-4 rounded-2xl bg-gradient-to-br ${tip.color} ${tip.border} border backdrop-blur-sm`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                        <div className="text-primary">{tip.icon}</div>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-1">{tip.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}