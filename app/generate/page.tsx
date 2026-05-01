'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Zap, Layout, PenTool, ChevronRight, Github, Search,
  Check, Sparkles, Rocket, Code2, Palette, ArrowLeft,
  Wand2, FileText, Globe, Star, TrendingUp, Trophy,
  ArrowRight, Terminal, Eye, Layers, Lightbulb
} from 'lucide-react'

const TEMPLATES = [
  { id: 'minimal', label: 'Minimal', desc: 'Clean & simple', icon: '✨' },
  { id: 'modern', label: 'Modern SaaS', desc: 'Bold & sleek', icon: '🚀' },
  { id: 'dark', label: 'Dark Hacker', desc: 'Terminal vibes', icon: '💻' },
  { id: 'startup', label: 'Startup', desc: 'Energetic CTA', icon: '🔥' },
  { id: 'animated', label: 'Animated', desc: 'Smooth motion', icon: '🎬' },
  { id: 'glass', label: 'Glassmorphism', desc: 'Frosted glass', icon: '🪟' },
]

type Mode = 'select' | 'quick' | 'template' | 'custom'

function FloatingParticles() {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const generated = [...Array(12)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4',
      duration: 7,
      delay: i * 0.2,
      size: 1.5,
    }))

    setParticles(generated)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${p.color}, transparent)`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default function GeneratePage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('select')
  const [template, setTemplate] = useState('modern')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('githubUsername')
    if (saved) setUsername(saved)
    const savedTemplate = localStorage.getItem('selectedTemplate')
    if (savedTemplate) setTemplate(savedTemplate)
  }, [])

  const handleQuickGenerate = async () => {
    if (!username.trim()) { setError('Please enter your GitHub username'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/api/github/${username.trim()}`)
      if (!res.ok) throw new Error('GitHub user not found')
      const data = await res.json()
      if (Array.isArray(data)) {
        sessionStorage.setItem('githubRepos', JSON.stringify(data))
        localStorage.setItem('githubUsername', username.trim())
      }
      localStorage.setItem('selectedTemplate', template)
      router.push(`/generate/details?username=${username.trim()}&template=${template}`)
    } catch (e: any) {
      setError(e.message || 'Failed to fetch GitHub data')
    } finally {
      setLoading(false)
    }
  }

  const handleTemplateMode = () => {
    router.push('/dashboard/templates')
  }

  const handleCustomMode = () => {
    router.push('/generate/details?template=' + template)
  }

  const selectedTemplateData = TEMPLATES.find(t => t.id === template)

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#030712] px-4 py-12">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.04),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <FloatingParticles />

      <div className="relative z-10 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {/* Select Mode Screen */}
          {mode === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-full px-5 py-2 border border-indigo-500/30 shadow-lg shadow-indigo-500/10 mb-6">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-semibold text-indigo-300">Portfolio Generator</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                  <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                    Build Your
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Portfolio
                  </span>
                </h1>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  Choose how you want to create your developer portfolio. Fast, flexible, and professional.
                </p>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {[
                  {
                    mode: 'quick' as Mode,
                    icon: Zap,
                    iconBg: 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20',
                    iconColor: 'text-yellow-400',
                    title: 'Quick Generate',
                    desc: 'Enter your GitHub username and get a beautiful portfolio instantly with your real projects.',
                    badge: '⚡ Fastest',
                    badgeColor: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
                    features: ['Auto-import repos', 'AI descriptions', 'Live preview'],
                  },
                  {
                    mode: 'template' as Mode,
                    icon: Palette,
                    iconBg: 'bg-gradient-to-br from-purple-500/20 to-violet-500/20',
                    iconColor: 'text-purple-400',
                    title: 'Browse Templates',
                    desc: 'Preview 6 professionally designed templates with your real GitHub data before choosing.',
                    badge: '🎨 Visual',
                    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
                    features: ['6 templates', 'Live preview', 'GitHub integration'],
                  },
                  {
                    mode: 'custom' as Mode,
                    icon: PenTool,
                    iconBg: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
                    iconColor: 'text-cyan-400',
                    title: 'Custom Build',
                    desc: 'Full control over every detail — name, skills, projects, education, experience, and links.',
                    badge: '🔧 Full Control',
                    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
                    features: ['Manual input', 'Complete control', 'All sections'],
                  },
                ].map((opt) => (
                  <button
                    key={opt.mode}
                    onClick={() => opt.mode === 'template' ? handleTemplateMode() : setMode(opt.mode)}
                    className="w-full text-left group relative"
                  >
                    <Card className="relative overflow-hidden border-2 border-white/5 bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-xl hover:border-white/10 transition-all duration-300">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.06),transparent_50%)]" />
                      
                      <div className="relative p-6">
                        <div className="flex items-start gap-5">
                          <div className={`h-14 w-14 rounded-2xl ${opt.iconBg} flex items-center justify-center flex-shrink-0 border border-white/10 shadow-lg group-hover:scale-110 transition-transform`}>
                            <opt.icon className={`h-6 w-6 ${opt.iconColor}`} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="font-bold text-lg text-white">{opt.title}</h3>
                              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${opt.badgeColor}`}>
                                {opt.badge}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed mb-4">{opt.desc}</p>
                            
                            <div className="flex items-center gap-4">
                              {opt.features.map((f, i) => (
                                <span key={i} className="flex items-center gap-1.5 text-xs text-gray-500">
                                  <Check className="h-3 w-3 text-emerald-400" />
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>

                          <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                        </div>
                      </div>
                    </Card>
                  </button>
                ))}
              </div>

              {/* Footer note */}
              <p className="text-center text-xs text-gray-600 mt-8">
                All options support GitHub integration and professional templates
              </p>
            </motion.div>
          )}

          {/* Quick/Custom Form Screen */}
          {(mode === 'quick' || mode === 'custom') && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setMode('select')}
                className="text-gray-400 hover:text-white text-sm mb-8 flex items-center gap-2 transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to options
              </button>

              <Card className="relative overflow-hidden rounded-3xl border-2 border-white/5 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-2xl shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.1),transparent_70%)]" />

                <div className="relative p-8 md:p-10">
                  {/* Header */}
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                      {mode === 'quick' ? (
                        <Zap className="h-3.5 w-3.5 text-yellow-400" />
                      ) : (
                        <PenTool className="h-3.5 w-3.5 text-cyan-400" />
                      )}
                      <span className="text-xs font-semibold text-gray-400">
                        {mode === 'quick' ? 'Quick Generate' : 'Custom Build'}
                      </span>
                    </div>

                    <h2 className="text-3xl font-black text-white mb-3">
                      {mode === 'quick' ? '⚡ Quick Portfolio Setup' : '✏️ Custom Portfolio Setup'}
                    </h2>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">
                      {mode === 'quick'
                        ? 'Enter your GitHub username and we\'ll import all your projects automatically.'
                        : 'Choose a template and fill in your details on the next screen.'}
                    </p>
                  </div>

                  {/* Template Selector */}
                  <div className="mb-8">
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      <Palette className="h-3.5 w-3.5" />
                      Choose Template
                    </label>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {TEMPLATES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTemplate(t.id)}
                          onMouseEnter={() => setHoveredTemplate(t.id)}
                          onMouseLeave={() => setHoveredTemplate(null)}
                          className={`relative group rounded-2xl border-2 p-4 text-center transition-all duration-300 ${
                            template === t.id
                              ? 'border-indigo-500/60 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                              : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
                          }`}
                        >
                          {template === t.id && (
                            <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                          
                          <div className="text-2xl mb-2">{t.icon}</div>
                          <p className={`text-xs font-bold mb-1 ${template === t.id ? 'text-indigo-300' : 'text-gray-300'}`}>
                            {t.label}
                          </p>
                          <p className={`text-[10px] ${template === t.id ? 'text-indigo-400/70' : 'text-gray-500'}`}>
                            {t.desc}
                          </p>
                          
                          {hoveredTemplate === t.id && template !== t.id && (
                            <div className="absolute inset-0 rounded-2xl bg-indigo-500/5 transition-colors" />
                          )}
                        </button>
                      ))}
                    </div>

                    {selectedTemplateData && (
                      <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{selectedTemplateData.icon}</span>
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {selectedTemplateData.label} Template Selected
                            </p>
                            <p className="text-xs text-gray-400">{selectedTemplateData.desc}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* GitHub Username (Quick mode only) */}
                  {mode === 'quick' && (
                    <div className="mb-8">
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                        <Github className="h-3.5 w-3.5" />
                        GitHub Username
                      </label>
                      
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Github className="h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                        </div>
                        <input
                          type="text"
                          placeholder="e.g. torvalds"
                          value={username}
                          onChange={e => { setUsername(e.target.value); setError('') }}
                          onKeyDown={e => e.key === 'Enter' && handleQuickGenerate()}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-500 bg-white/[0.04] border border-white/[0.08] focus:border-indigo-500/50 focus:bg-white/[0.06] focus:outline-none transition-all"
                          autoFocus
                        />
                      </div>
                      
                      {error && (
                        <div className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-red-500/5 border border-red-500/20">
                          <div className="h-2 w-2 rounded-full bg-red-400 flex-shrink-0" />
                          <p className="text-xs text-red-400">{error}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    onClick={mode === 'quick' ? handleQuickGenerate : handleCustomMode}
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 text-white border border-indigo-500/30 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Fetching GitHub data...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        {mode === 'quick' ? 'Continue to Details' : 'Fill Details'}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </button>

                  {/* Quick tip */}
                  <p className="text-center text-xs text-gray-600 mt-6">
                    💡 {mode === 'quick'
                      ? 'Your public repositories will be automatically imported'
                      : 'You\'ll be able to customize every section of your portfolio'}
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}