'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Download, Copy, Check, Github, Star, Code2, Palette,
  ExternalLink, Sparkles, Share2, Eye, Zap, Wand2,
  Layout, Smartphone, Monitor, Tablet, ArrowRight,
  Heart, Users, Trophy, TrendingUp, Crown, Flame,
  ChevronRight, Layers, Grid3X3, Image, FileCode,Globe
} from 'lucide-react'

const CARD_THEMES = [
  { 
    id: 'dark', 
    label: 'Dark Pro', 
    bg: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)', 
    text: '#ffffff', 
    accent: '#818cf8', 
    border: 'rgba(99,102,241,0.3)', 
    sub: '#94a3b8',
    orb1: 'rgba(99,102,241,0.15)',
    orb2: 'rgba(139,92,246,0.1)',
  },
  { 
    id: 'ocean', 
    label: 'Ocean Blue', 
    bg: 'linear-gradient(135deg, #0c1445 0%, #0e3460 50%, #0c1445 100%)', 
    text: '#ffffff', 
    accent: '#38bdf8', 
    border: 'rgba(56,189,248,0.3)', 
    sub: '#7dd3fc',
    orb1: 'rgba(56,189,248,0.15)',
    orb2: 'rgba(14,165,233,0.1)',
  },
  { 
    id: 'forest', 
    label: 'Emerald Forest', 
    bg: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #052e16 100%)', 
    text: '#ffffff', 
    accent: '#4ade80', 
    border: 'rgba(74,222,128,0.3)', 
    sub: '#86efac',
    orb1: 'rgba(74,222,128,0.15)',
    orb2: 'rgba(34,197,94,0.1)',
  },
  { 
    id: 'sunset', 
    label: 'Sunset Glow', 
    bg: 'linear-gradient(135deg, #431407 0%, #7c2d12 50%, #431407 100%)', 
    text: '#ffffff', 
    accent: '#fb923c', 
    border: 'rgba(251,146,60,0.3)', 
    sub: '#fdba74',
    orb1: 'rgba(251,146,60,0.15)',
    orb2: 'rgba(249,115,22,0.1)',
  },
  { 
    id: 'purple', 
    label: 'Cosmic Galaxy', 
    bg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)', 
    text: '#ffffff', 
    accent: '#c084fc', 
    border: 'rgba(192,132,252,0.3)', 
    sub: '#d8b4fe',
    orb1: 'rgba(192,132,252,0.15)',
    orb2: 'rgba(168,85,247,0.1)',
  },
  { 
    id: 'rose', 
    label: 'Rose Gold', 
    bg: 'linear-gradient(135deg, #4c0519 0%, #881337 50%, #4c0519 100%)', 
    text: '#ffffff', 
    accent: '#fb7185', 
    border: 'rgba(251,113,133,0.3)', 
    sub: '#fda4af',
    orb1: 'rgba(251,113,133,0.15)',
    orb2: 'rgba(244,63,94,0.1)',
  },
  { 
    id: 'light', 
    label: 'Clean Light', 
    bg: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)', 
    text: '#0f172a', 
    accent: '#6366f1', 
    border: 'rgba(99,102,241,0.2)', 
    sub: '#64748b',
    orb1: 'rgba(99,102,241,0.08)',
    orb2: 'rgba(139,92,246,0.05)',
  },
  { 
    id: 'midnight', 
    label: 'Midnight Blue', 
    bg: 'linear-gradient(135deg, #020617 0%, #1e293b 50%, #020617 100%)', 
    text: '#ffffff', 
    accent: '#60a5fa', 
    border: 'rgba(96,165,250,0.3)', 
    sub: '#93c5fd',
    orb1: 'rgba(96,165,250,0.15)',
    orb2: 'rgba(59,130,246,0.1)',
  },
]

function FloatingParticles() {

 const [particles, setParticles] = useState<
    { left: string; top: string }[]
  >([])

useEffect(() => {
    const newParticles = [
      { left: '12%', top: '18%' },
      { left: '28%', top: '35%' },
      { left: '44%', top: '62%' },
      { left: '58%', top: '22%' },
      { left: '72%', top: '48%' },
      { left: '84%', top: '70%' },
      { left: '35%', top: '80%' },
      { left: '90%', top: '15%' },
      { left: '15%', top: '45%' },
      { left: '65%', top: '25%' },
      { left: '25%', top: '55%' },
      { left: '75%', top: '35%' },
      { left: '45%', top: '75%' },
      { left: '85%', top: '40%' },
      { left: '20%', top: '60%' },
      { left: '55%', top: '85%' },
      { left: '70%', top: '20%' },
      { left: '30%', top: '50%' },
      { left: '60%', top: '30%' },
      { left: '80%', top: '65%' },
    ]
    setParticles(newParticles)
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-violet-400/20"
          style={{
  left: p.left,
  top: p.top,
}}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}

export default function DevCardPage() {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const [repos, setRepos] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [theme, setTheme] = useState(CARD_THEMES[0])
  const [copied, setCopied] = useState(false)
  const [username, setUsername] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)
  const [previewScale, setPreviewScale] = useState(1)
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    const gh = localStorage.getItem('githubUsername') || ''
    setUser(storedUser)
    setUsername(gh)
    const saved = sessionStorage.getItem('githubRepos')
    if (saved) setRepos(JSON.parse(saved))
  }, [router])

  const totalStars = repos.reduce((a, r) => a + (r.stars || 0), 0)
  const totalForks = repos.reduce((a, r) => a + (r.forks || 0), 0)
  const languages = [...new Set(repos.map(r => r.language).filter(Boolean))].slice(0, 5)
  const topRepo = repos.sort((a, b) => (b.stars || 0) - (a.stars || 0))[0]
  const name = user?.name || username || 'Developer'
  const title = user?.bio?.split('.')[0] || `${languages[0] || 'Full-Stack'} Developer`

  const handleDownload = async () => {
    if (!cardRef.current) return
    setIsDownloading(true)
    
    // Add a small delay for the animation
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} - Developer Card</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  min-height: 100vh; 
  background: #0a0a0f; 
  font-family: 'Inter', system-ui, -apple-system, sans-serif; 
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
${cardRef.current.outerHTML}
</body>
</html>`
    
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${username || 'developer'}-dev-card.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setIsDownloading(false)
  }

  const handleCopyEmbed = () => {
    const embed = `<iframe src="${window.location.origin}/card/${username}" width="400" height="240" frameborder="0" style="border-radius:16px;border:1px solid rgba(255,255,255,0.1)"></iframe>`
    navigator.clipboard.writeText(embed)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative min-h-screen">
      <FloatingParticles />

      <div className="relative space-y-8 max-w-6xl mx-auto px-4 pb-16">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative pt-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />

          <div className="relative text-center space-y-4 py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-xl rounded-full px-6 py-2 border border-violet-500/30 shadow-lg shadow-violet-500/10"
            >
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-semibold text-violet-300">Dev Card Generator</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Dev
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Identity Card 🃏
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Create a stunning, shareable developer card to showcase your GitHub stats anywhere
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              {[
                { icon: Wand2, label: 'Customizable' },
                { icon: Share2, label: 'Shareable' },
                { icon: Download, label: 'Downloadable' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon className="h-4 w-4 text-violet-400" />
                  {item.label}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Theme Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="relative overflow-hidden border-2 border-violet-500/20 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />

            <div className="relative p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                  <Palette className="h-6 w-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Choose Your Theme</h3>
                  <p className="text-sm text-muted-foreground">Select a style that matches your personality</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {CARD_THEMES.map((t, index) => (
                  <motion.button
                    key={t.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTheme(t)}
                    className={`relative group p-4 rounded-2xl border-2 transition-all duration-300 ${
                      theme.id === t.id 
                        ? 'border-violet-500 shadow-xl shadow-violet-500/20' 
                        : 'border-white/10 hover:border-violet-500/30'
                    }`}
                    style={{ background: t.bg }}
                  >
                    <div className="relative z-10">
                      {/* Theme preview dots */}
                      <div className="flex gap-1.5 mb-3">
                        <div className="w-3 h-3 rounded-full" style={{ background: t.accent }} />
                        <div className="w-3 h-3 rounded-full opacity-50" style={{ background: t.text }} />
                        <div className="w-3 h-3 rounded-full opacity-30" style={{ background: t.sub }} />
                      </div>
                      
                      <p className="text-sm font-bold mb-1" style={{ color: t.text }}>
                        {t.label}
                      </p>
                      
                      {theme.id === t.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center"
                        >
                          <Check className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </div>

                    {/* Hover glow */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${t.accent}22, transparent 70%)` }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Card Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Live Preview</h3>
                <p className="text-sm text-muted-foreground">See your card in real-time</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreviewModal(true)}
                className="border-white/10 hover:border-white/20"
              >
                <Eye className="h-4 w-4 mr-2" />
                Full Preview
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-full max-w-2xl"
            >
              {/* Card shadow/glow */}
              <div 
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-50"
                style={{ background: theme.accent }}
              />

              {/* Actual Card */}
              <div 
                ref={cardRef}
                className="relative"
                style={{
                  background: theme.bg,
                  border: `2px solid ${theme.border}`,
                  borderRadius: '24px',
                  padding: '36px',
                  width: '100%',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 25px 50px -12px ${theme.accent}33`,
                }}
              >
                {/* Glow orbs */}
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', background: theme.orb1, borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '140px', height: '140px', background: theme.orb2, borderRadius: '50%', filter: 'blur(35px)', pointerEvents: 'none' }} />

                {/* Grid pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: `radial-gradient(${theme.accent} 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Header */}
                <div className="relative" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <div style={{ 
                        width: '10px', 
                        height: '10px', 
                        borderRadius: '50%', 
                        background: '#22c55e',
                        boxShadow: '0 0 10px rgba(34,197,94,0.5)',
                      }} />
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 12px',
                        background: `${theme.accent}15`,
                        border: `1px solid ${theme.border}`,
                        borderRadius: '999px',
                      }}>
                        <Code2 size={12} style={{ color: theme.accent }} />
                        <span style={{ fontSize: '10px', color: theme.accent, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                          Developer
                        </span>
                      </div>
                    </div>
                    <h2 style={{ fontSize: '32px', fontWeight: 900, color: theme.text, margin: 0, lineHeight: 1.2, letterSpacing: '-0.5px' }}>
                      {name}
                    </h2>
                    <p style={{ fontSize: '14px', color: theme.sub, marginTop: '6px', fontWeight: 500 }}>
                      {title}
                    </p>
                  </div>

                  <div style={{ 
                    width: '56px', 
                    height: '56px', 
                    borderRadius: '16px', 
                    background: `${theme.accent}15`, 
                    border: `2px solid ${theme.border}`, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    flexShrink: 0,
                    backdropFilter: 'blur(10px)',
                  }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill={theme.accent}>
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                </div>

                {/* Stats row */}
                <div className="relative" style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { label: 'Repos', value: repos.length, icon: '📁' },
                    { label: 'Stars', value: totalStars, icon: '⭐' },
                    { label: 'Forks', value: totalForks, icon: '🍴' },
                    { label: 'Languages', value: languages.length, icon: '💻' },
                  ].map((s, i) => (
                    <div key={i} style={{ 
                      flex: 1, 
                      background: `${theme.accent}0a`, 
                      border: `1px solid ${theme.border}`, 
                      borderRadius: '14px', 
                      padding: '14px 16px', 
                      textAlign: 'center',
                      backdropFilter: 'blur(10px)',
                    }}>
                      <span style={{ fontSize: '16px' }}>{s.icon}</span>
                      <p style={{ fontSize: '24px', fontWeight: 900, color: theme.accent, margin: '4px 0' }}>
                        {s.value.toLocaleString()}
                      </p>
                      <p style={{ fontSize: '10px', color: theme.sub, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Top repo */}
                {topRepo && (
                  <div className="relative" style={{ 
                    background: `${theme.accent}08`, 
                    border: `1px solid ${theme.border}`, 
                    borderRadius: '14px', 
                    padding: '16px 18px', 
                    marginBottom: '16px',
                    backdropFilter: 'blur(10px)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <Trophy size={14} style={{ color: theme.accent }} />
                      <p style={{ fontSize: '10px', color: theme.sub, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                        Top Repository
                      </p>
                    </div>
                    <p style={{ fontWeight: 700, color: theme.text, fontSize: '15px', margin: '0 0 4px 0' }}>
                      {topRepo.name}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '12px', color: theme.sub, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={12} style={{ color: '#fbbf24' }} />
                        {topRepo.stargazers_count || topRepo.stars || 0}
                      </span>
                      {topRepo.language && (
                        <span style={{ fontSize: '12px', color: theme.accent, fontWeight: 600 }}>
                          {topRepo.language}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {languages.length > 0 && (
                  <div className="relative" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {languages.map((l, i) => (
                      <span key={i} style={{ 
                        padding: '6px 14px', 
                        background: `${theme.accent}12`, 
                        border: `1px solid ${theme.border}`, 
                        borderRadius: '999px', 
                        fontSize: '11px', 
                        color: theme.accent, 
                        fontWeight: 700,
                        backdropFilter: 'blur(10px)',
                      }}>
                        {l}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="relative" style={{ 
                  marginTop: '24px', 
                  paddingTop: '18px', 
                  borderTop: `1px solid ${theme.border}`, 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <span style={{ fontSize: '12px', color: theme.sub, fontWeight: 500 }}>
                    github.com/{username}
                  </span>
                  <span style={{ 
                    fontSize: '10px', 
                    color: `${theme.sub}99`, 
                    fontWeight: 600,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}>
                    Portfolio Generator
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="relative overflow-hidden border-2 border-violet-500/20 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
            
            <div className="relative p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                  <Share2 className="h-6 w-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Export & Share</h3>
                  <p className="text-sm text-muted-foreground">Download or embed your card anywhere</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  size="lg"
                  className="relative group bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white rounded-2xl shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 h-14"
                >
                  <span className="flex items-center gap-2">
                    {isDownloading ? (
                      <>
                        <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        Download Card
                        <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleCopyEmbed}
                  className="group border-white/10 hover:border-violet-500/30 bg-white/5 backdrop-blur-sm rounded-2xl h-14"
                >
                  <span className="flex items-center gap-2">
                    {copied ? (
                      <>
                        <Check className="h-5 w-5 text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        Copy Embed Code
                      </>
                    )}
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="group border-white/10 hover:border-violet-500/30 bg-white/5 backdrop-blur-sm rounded-2xl h-14"
                >
                  <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer">
                    <span className="flex items-center gap-2">
                      <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      View GitHub
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </span>
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-xl">
            <div className="relative p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Pro Tips</h3>
                  <p className="text-sm text-muted-foreground">Make the most of your dev card</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: <Layout className="h-5 w-5" />,
                    title: 'GitHub README',
                    desc: 'Add the embed code to your GitHub profile README to impress visitors instantly.',
                  },
                  {
                    icon: <Users className="h-5 w-5" />,
                    title: 'LinkedIn Profile',
                    desc: 'Embed your card in your LinkedIn featured section to stand out to recruiters.',
                  },
                  {
                    icon: <Globe className="h-5 w-5" />,
                    title: 'Personal Website',
                    desc: 'Showcase your dev card on your portfolio website as a dynamic GitHub stats badge.',
                  },
                ].map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all group cursor-default"
                  >
                    <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-3 group-hover:bg-violet-500/20 transition-colors">
                      <div className="text-violet-400">{tip.icon}</div>
                    </div>
                    <h4 className="font-semibold text-sm mb-2">{tip.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Full Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPreviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full max-h-[90vh] overflow-auto rounded-2xl"
              onClick={e => e.stopPropagation()}
            >
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm border-white/20"
                onClick={() => setShowPreviewModal(false)}
              >
                Close
              </Button>
              
              {/* Clone the card for full preview */}
              <div 
                style={{
                  background: theme.bg,
                  border: `2px solid ${theme.border}`,
                  borderRadius: '24px',
                  padding: '48px',
                  width: '100%',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 25px 50px -12px ${theme.accent}33`,
                }}
              >
                {/* Same card content as above */}
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', background: theme.orb1, borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '140px', height: '140px', background: theme.orb2, borderRadius: '50%', filter: 'blur(35px)', pointerEvents: 'none' }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
                      <span style={{ fontSize: '11px', color: theme.accent, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                        Developer
                      </span>
                    </div>
                    <h2 style={{ fontSize: '32px', fontWeight: 900, color: theme.text, margin: 0 }}>{name}</h2>
                    <p style={{ fontSize: '14px', color: theme.sub, marginTop: '6px' }}>{title}</p>
                  </div>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${theme.accent}15`, border: `2px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill={theme.accent}>
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { label: 'Repos', value: repos.length },
                    { label: 'Stars', value: totalStars },
                    { label: 'Languages', value: languages.length },
                  ].map((s, i) => (
                    <div key={i} style={{ flex: 1, background: `${theme.accent}0a`, border: `1px solid ${theme.border}`, borderRadius: '14px', padding: '14px 16px', textAlign: 'center' }}>
                      <p style={{ fontSize: '24px', fontWeight: 900, color: theme.accent, margin: 0 }}>{s.value}</p>
                      <p style={{ fontSize: '10px', color: theme.sub, marginTop: '4px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                {topRepo && (
                  <div style={{ background: `${theme.accent}08`, border: `1px solid ${theme.border}`, borderRadius: '14px', padding: '16px 18px', marginBottom: '16px' }}>
                    <p style={{ fontSize: '10px', color: theme.sub, marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>⭐ Top Repository</p>
                    <p style={{ fontWeight: 700, color: theme.text, fontSize: '15px', margin: '0 0 4px 0' }}>{topRepo.name}</p>
                    <p style={{ fontSize: '12px', color: theme.sub, margin: 0 }}>{topRepo.stargazers_count || topRepo.stars || 0} stars · {topRepo.language || 'Unknown'}</p>
                  </div>
                )}

                {languages.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {languages.map((l, i) => (
                      <span key={i} style={{ padding: '6px 14px', background: `${theme.accent}12`, border: `1px solid ${theme.border}`, borderRadius: '999px', fontSize: '11px', color: theme.accent, fontWeight: 700 }}>
                        {l}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: theme.sub }}>github.com/{username}</span>
                  <span style={{ fontSize: '10px', color: `${theme.sub}99`, letterSpacing: '1.5px' }}>PORTFOLIO GENERATOR</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}