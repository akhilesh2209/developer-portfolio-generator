'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
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
    const generated = [
      { id: 0, left: '12%', top: '18%', color: '#6366f1', duration: 7, delay: 0, size: 1.5 },
      { id: 1, left: '28%', top: '35%', color: '#8b5cf6', duration: 7, delay: 0.2, size: 1.5 },
      { id: 2, left: '44%', top: '62%', color: '#06b6d4', duration: 7, delay: 0.4, size: 1.5 },
      { id: 3, left: '58%', top: '22%', color: '#6366f1', duration: 7, delay: 0.6, size: 1.5 },
      { id: 4, left: '72%', top: '48%', color: '#8b5cf6', duration: 7, delay: 0.8, size: 1.5 },
      { id: 5, left: '84%', top: '70%', color: '#06b6d4', duration: 7, delay: 1.0, size: 1.5 },
      { id: 6, left: '35%', top: '80%', color: '#6366f1', duration: 7, delay: 1.2, size: 1.5 },
      { id: 7, left: '90%', top: '15%', color: '#8b5cf6', duration: 7, delay: 1.4, size: 1.5 },
      { id: 8, left: '15%', top: '45%', color: '#06b6d4', duration: 7, delay: 1.6, size: 1.5 },
      { id: 9, left: '65%', top: '25%', color: '#6366f1', duration: 7, delay: 1.8, size: 1.5 },
      { id: 10, left: '25%', top: '55%', color: '#8b5cf6', duration: 7, delay: 2.0, size: 1.5 },
      { id: 11, left: '75%', top: '35%', color: '#06b6d4', duration: 7, delay: 2.2, size: 1.5 },
    ]
    setParticles(generated)
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: `radial-gradient(circle, ${p.color}, transparent)` }}
          animate={{ y: [0, -25, 0], opacity: [0, 0.4, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
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

  useEffect(() => {
    const saved = localStorage.getItem('githubUsername')
    if (saved) setUsername(saved)
    const savedTemplate = localStorage.getItem('selectedTemplate')
    if (savedTemplate) setTemplate(savedTemplate)
  }, [])

  const handleQuickGenerate = async () => {
    if (!username.trim()) { setError('Please enter your GitHub username'); return }
    setError(''); setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/github/${username.trim()}`)
      if (!res.ok) throw new Error('GitHub user not found')
      const data = await res.json()
      if (Array.isArray(data)) { sessionStorage.setItem('githubRepos', JSON.stringify(data)); localStorage.setItem('githubUsername', username.trim()) }
      localStorage.setItem('selectedTemplate', template)
      router.push(`/generate/details?username=${username.trim()}&template=${template}`)
    } catch (e: any) { setError(e.message || 'Failed to fetch GitHub data') }
    finally { setLoading(false) }
  }

  const handleTemplateMode = () => { router.push('/dashboard/templates') }
  const handleCustomMode = () => { router.push('/generate/details?template=' + template) }
  const selectedTemplateData = TEMPLATES.find(t => t.id === template)

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.04),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.03),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.02),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.04),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <FloatingParticles />

      <div className="relative z-10 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {mode === 'select' && (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 dark:bg-indigo-500/20 backdrop-blur-xl rounded-full px-5 py-2 border border-indigo-500/20 dark:border-indigo-500/30 shadow-lg shadow-indigo-500/10 mb-6">
                  <Sparkles className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">Portfolio Generator</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                  <span className="text-foreground">Build Your</span><br />
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">Portfolio</span>
                </h1>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">Choose how you want to create your developer portfolio. Fast, flexible, and professional.</p>
              </div>

              <div className="space-y-4">
                {[
                  { mode: 'quick' as Mode, icon: Zap, iconBg: 'bg-yellow-100 dark:bg-yellow-500/20', iconColor: 'text-yellow-500 dark:text-yellow-400', title: 'Quick Generate', desc: 'Enter your GitHub username and get a beautiful portfolio instantly with your real projects.', badge: '⚡ Fastest', badgeColor: 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-300 border-yellow-300 dark:border-yellow-500/20', features: ['Auto-import repos', 'AI descriptions', 'Live preview'] },
                  { mode: 'template' as Mode, icon: Palette, iconBg: 'bg-purple-100 dark:bg-purple-500/20', iconColor: 'text-purple-500 dark:text-purple-400', title: 'Browse Templates', desc: 'Preview 6 professionally designed templates with your real GitHub data before choosing.', badge: '🎨 Visual', badgeColor: 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-300 dark:border-purple-500/20', features: ['6 templates', 'Live preview', 'GitHub integration'] },
                  { mode: 'custom' as Mode, icon: PenTool, iconBg: 'bg-cyan-100 dark:bg-cyan-500/20', iconColor: 'text-cyan-500 dark:text-cyan-400', title: 'Custom Build', desc: 'Full control over every detail — name, skills, projects, education, experience, and links.', badge: '🔧 Full Control', badgeColor: 'bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/20', features: ['Manual input', 'Complete control', 'All sections'] },
                ].map((opt) => (
                  <button key={opt.mode} onClick={() => opt.mode === 'template' ? handleTemplateMode() : setMode(opt.mode)} className="w-full text-left group relative">
                    <Card className="relative overflow-hidden border-2 border-border bg-card hover:border-primary/30 transition-all duration-300">
                      <div className="relative p-6">
                        <div className="flex items-start gap-5">
                          <div className={`h-14 w-14 rounded-2xl ${opt.iconBg} flex items-center justify-center flex-shrink-0 border border-border`}>
                            <opt.icon className={`h-6 w-6 ${opt.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="font-bold text-lg text-foreground">{opt.title}</h3>
                              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${opt.badgeColor}`}>{opt.badge}</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{opt.desc}</p>
                            <div className="flex items-center gap-4">
                              {opt.features.map((f, i) => (
                                <span key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground"><Check className="h-3 w-3 text-emerald-500" />{f}</span>
                              ))}
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                        </div>
                      </div>
                    </Card>
                  </button>
                ))}
              </div>
              <p className="text-center text-xs text-muted-foreground mt-8">All options support GitHub integration and professional templates</p>
            </motion.div>
          )}

          {(mode === 'quick' || mode === 'custom') && (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <button onClick={() => setMode('select')} className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />Back to options
              </button>

              <Card className="relative overflow-hidden rounded-3xl border-2 border-border bg-card shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.04),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.1),transparent_70%)]" />

                <div className="relative p-8 md:p-10">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 border border-border mb-6">
                      {mode === 'quick' ? <Zap className="h-3.5 w-3.5 text-yellow-500 dark:text-yellow-400" /> : <PenTool className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />}
                      <span className="text-xs font-semibold text-muted-foreground">{mode === 'quick' ? 'Quick Generate' : 'Custom Build'}</span>
                    </div>
                    <h2 className="text-3xl font-black text-foreground mb-3">{mode === 'quick' ? '⚡ Quick Portfolio Setup' : '✏️ Custom Portfolio Setup'}</h2>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">{mode === 'quick' ? 'Enter your GitHub username and we\'ll import all your projects automatically.' : 'Choose a template and fill in your details on the next screen.'}</p>
                  </div>

                  <div className="mb-8">
                    <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4"><Palette className="h-3.5 w-3.5" />Choose Template</label>
                    <div className="grid grid-cols-3 gap-3">
                      {TEMPLATES.map((t) => (
                        <button key={t.id} onClick={() => setTemplate(t.id)}
                          className={`relative group rounded-2xl border-2 p-4 text-center transition-all duration-300 ${template === t.id ? 'border-indigo-500/60 bg-indigo-100 dark:bg-indigo-500/10 shadow-lg shadow-indigo-500/10' : 'border-border bg-muted/30 hover:border-primary/30 hover:bg-muted/50'}`}>
                          {template === t.id && <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg"><Check className="h-3 w-3 text-white" /></div>}
                          <div className="text-2xl mb-2">{t.icon}</div>
                          <p className={`text-xs font-bold mb-1 ${template === t.id ? 'text-indigo-600 dark:text-indigo-300' : 'text-foreground'}`}>{t.label}</p>
                          <p className={`text-[10px] ${template === t.id ? 'text-indigo-500/70 dark:text-indigo-400/70' : 'text-muted-foreground'}`}>{t.desc}</p>
                        </button>
                      ))}
                    </div>
                    {selectedTemplateData && (
                      <div className="mt-4 p-4 rounded-2xl bg-muted/30 border border-border">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{selectedTemplateData.icon}</span>
                          <div><p className="text-sm font-semibold text-foreground">{selectedTemplateData.label} Template Selected</p><p className="text-xs text-muted-foreground">{selectedTemplateData.desc}</p></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {mode === 'quick' && (
                    <div className="mb-8">
                      <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4"><Github className="h-3.5 w-3.5" />GitHub Username</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Github className="h-5 w-5 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input type="text" placeholder="e.g. torvalds" value={username} onChange={e => { setUsername(e.target.value); setError('') }} onKeyDown={e => e.key === 'Enter' && handleQuickGenerate()}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm text-foreground placeholder:text-muted-foreground bg-muted/50 border border-border focus:border-indigo-500/50 focus:outline-none transition-all" autoFocus />
                      </div>
                      {error && (
                        <div className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20">
                          <div className="h-2 w-2 rounded-full bg-red-500 flex-shrink-0" /><p className="text-xs text-red-500">{error}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <button onClick={mode === 'quick' ? handleQuickGenerate : handleCustomMode} disabled={loading}
                    className="w-full py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? (
                      <span className="flex items-center justify-center gap-3"><span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Fetching GitHub data...</span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">{mode === 'quick' ? 'Continue to Details' : 'Fill Details'}<ArrowRight className="h-4 w-4" /></span>
                    )}
                  </button>
                  <p className="text-center text-xs text-muted-foreground mt-6">💡 {mode === 'quick' ? 'Your public repositories will be automatically imported' : 'You\'ll be able to customize every section of your portfolio'}</p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}