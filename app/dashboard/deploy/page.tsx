'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle2, ExternalLink, Copy, Download, Rocket,
  Globe, Code, FileCode, Check, AlertCircle, ArrowRight,
  Zap, Shield, RefreshCw, Clock, Activity, Sparkles,
  Server, Cloud, GitBranch, Layers, Terminal, Cpu
} from 'lucide-react'

function FloatingParticles() {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const generated = [
      { id: 0, left: '12%', top: '18%', color: '#6366f1', duration: 6, delay: 0, size: 1.5 },
      { id: 1, left: '28%', top: '35%', color: '#06b6d4', duration: 6, delay: 0.2, size: 2.5 },
      { id: 2, left: '44%', top: '62%', color: '#8b5cf6', duration: 6, delay: 0.4, size: 1.8 },
      { id: 3, left: '58%', top: '22%', color: '#6366f1', duration: 6, delay: 0.6, size: 2.2 },
      { id: 4, left: '72%', top: '48%', color: '#06b6d4', duration: 6, delay: 0.8, size: 1.6 },
      { id: 5, left: '84%', top: '70%', color: '#8b5cf6', duration: 6, delay: 1.0, size: 2.8 },
      { id: 6, left: '35%', top: '80%', color: '#6366f1', duration: 6, delay: 1.2, size: 1.4 },
      { id: 7, left: '90%', top: '15%', color: '#06b6d4', duration: 6, delay: 1.4, size: 2.6 },
      { id: 8, left: '15%', top: '45%', color: '#8b5cf6', duration: 6, delay: 1.6, size: 1.9 },
      { id: 9, left: '65%', top: '25%', color: '#6366f1', duration: 6, delay: 1.8, size: 2.3 },
    ]
    setParticles(generated)
  }, [])

  if (particles.length === 0) return null

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
            y: [0, -20, 0],
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

export default function DeployPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [template, setTemplate] = useState('modern')
  const [domain, setDomain] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [exportLoading, setExportLoading] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [deployHistory, setDeployHistory] = useState<any[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }
    setUsername(localStorage.getItem('githubUsername') || '')
    setTemplate(localStorage.getItem('selectedTemplate') || 'modern')

    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/user/${storedUser.id || storedUser._id}`)
      .then(r => r.ok ? r.json() : [])
      .then(() => {
        const localHistory = JSON.parse(localStorage.getItem('deployHistory') || '[]')
        setDeployHistory(localHistory)
      })
      .catch(() => {
        const localHistory = JSON.parse(localStorage.getItem('deployHistory') || '[]')
        setDeployHistory(localHistory)
      })
  }, [router])

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
    showToast('Copied to clipboard!')
  }

  const portfolioUrl = username && typeof window !== 'undefined'
    ? `${window.location.origin}/portfolio/${username}?template=${template}`
    : null

  const saveDeployRecord = (method: string) => {
    const record = { method, date: new Date().toISOString(), username, template, status: 'Success' }
    const history = JSON.parse(localStorage.getItem('deployHistory') || '[]')
    history.unshift(record)
    localStorage.setItem('deployHistory', JSON.stringify(history.slice(0, 10)))
    setDeployHistory(history.slice(0, 10))

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics/download`, { method: 'POST' }).catch(() => {})
  }

  const handleVercelDeploy = () => {
    if (!username) { showToast('Connect GitHub first', 'error'); return }
    const url = `https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/hello-world&project-name=${username}-portfolio`
    window.open(url, '_blank')
    saveDeployRecord('Vercel')
    showToast('Opening Vercel deployment...')
  }

  const handleExportHTML = async () => {
    if (!username) { showToast('Connect GitHub first', 'error'); return }
    setExportLoading('html')
    try {
      const savedRepos = sessionStorage.getItem('githubRepos')
      const repos = savedRepos ? JSON.parse(savedRepos) : []
      const user = JSON.parse(localStorage.getItem('user') || '{}')

      const repoCards = repos.slice(0, 6).map((r: any) => `
        <div style="border:1px solid #e5e7eb;border-radius:16px;padding:20px;background:#fafafa;transition:all 0.2s">
          <h3 style="font-weight:700;font-size:14px;margin:0 0 8px;color:#111">${r.name}</h3>
          <p style="font-size:13px;color:#6b7280;margin:0 0 12px;line-height:1.6">${r.description || 'No description'}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;color:#9ca3af">
            <span>${r.language ? `<span style="background:#f3f4f6;padding:2px 8px;border-radius:999px">${r.language}</span>` : ''} ⭐ ${r.stars || 0}</span>
            <a href="${r.url}" target="_blank" style="color:#6366f1;text-decoration:none;font-weight:600">View →</a>
          </div>
        </div>`).join('')

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${user.name || username} — Portfolio</title>
<script src="https://cdn.tailwindcss.com"><\/script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>*{font-family:'Inter',sans-serif}html{scroll-behavior:smooth}</style>
</head>
<body style="background:#0a0a0f;color:#fff;margin:0">
<div style="max-width:960px;margin:0 auto;padding:60px 32px">
  <nav style="display:flex;justify-content:space-between;align-items:center;margin-bottom:80px;padding-bottom:24px;border-bottom:1px solid #ffffff08">
    <span style="font-weight:900;font-size:22px;background:linear-gradient(90deg,#60a5fa,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${user.name || username}</span>
    <a href="https://github.com/${username}" target="_blank" style="font-size:13px;color:#94a3b8;text-decoration:none;padding:8px 16px;border:1px solid #ffffff12;border-radius:10px">GitHub</a>
  </nav>
  <div style="margin-bottom:80px">
    <div style="display:inline-block;padding:4px 14px;background:#4f46e518;border:1px solid #6366f128;border-radius:999px;font-size:12px;color:#818cf8;margin-bottom:28px">✦ Available for opportunities</div>
    <h1 style="font-size:64px;font-weight:900;line-height:1.05;margin:0 0 20px;background:linear-gradient(135deg,#fff 0%,#94a3b8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${user.name || username}</h1>
    <p style="font-size:18px;color:#94a3b8;margin:0 0 36px;max-width:520px;line-height:1.8">${user.bio || `Full-stack developer · ${repos.length} projects on GitHub`}</p>
    <div style="display:flex;gap:16px;flex-wrap:wrap">
      <a href="https://github.com/${username}" target="_blank" style="padding:14px 28px;background:linear-gradient(135deg,#3b82f6,#6366f1);border-radius:14px;font-weight:700;font-size:14px;color:#fff;text-decoration:none">GitHub Profile →</a>
      ${user.email ? `<a href="mailto:${user.email}" style="padding:14px 28px;background:#ffffff06;border:1px solid #ffffff10;border-radius:14px;font-weight:700;font-size:14px;color:#fff;text-decoration:none">Contact Me</a>` : ''}
    </div>
    <div style="display:flex;gap:40px;margin-top:60px">
      <div><p style="font-size:36px;font-weight:900;margin:0;background:linear-gradient(90deg,#60a5fa,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${repos.length}+</p><p style="font-size:13px;color:#64748b;margin:4px 0 0">Projects</p></div>
      <div><p style="font-size:36px;font-weight:900;margin:0;background:linear-gradient(90deg,#60a5fa,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${repos.reduce((a: number, r: any) => a + (r.stars || 0), 0)}+</p><p style="font-size:13px;color:#64748b;margin:4px 0 0">Stars</p></div>
    </div>
  </div>
  <h2 style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#334155;font-weight:700;margin-bottom:24px">Projects</h2>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-bottom:60px">
    ${repoCards}
  </div>
  <div style="border-top:1px solid #ffffff06;padding-top:28px;text-align:center;color:#1e293b;font-size:12px">
    © ${new Date().getFullYear()} ${user.name || username} · Built with Portfolio Generator
  </div>
</div>
</body></html>`

      const blob = new Blob([html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = `${username}-portfolio.html`; a.click()
      URL.revokeObjectURL(url)
      saveDeployRecord('HTML Export')
      showToast('Portfolio HTML downloaded!')
    } finally { setExportLoading(null) }
  }

  const handleExportNextjs = () => {
    if (!username) { showToast('Connect GitHub first', 'error'); return }
    setExportLoading('nextjs')
    const readme = `# ${username}'s Portfolio — Setup Guide\n\nGenerated by Portfolio Generator.\n\n## Getting Started\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\nOpen [http://localhost:3000](http://localhost:3000)\n\n## Portfolio URL\n\nVisit: /portfolio/${username}?template=${template}\n\n## Deploy on Vercel\n\nhttps://vercel.com/new\n`
    const blob = new Blob([readme], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `${username}-portfolio-setup.md`; a.click()
    URL.revokeObjectURL(url)
    saveDeployRecord('Next.js Export')
    showToast('Setup guide downloaded!')
    setExportLoading(null)
  }

  const options = [
    {
      id: 'vercel', title: 'Vercel', subtitle: 'Recommended · Free forever', icon: Rocket,
      iconBg: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400',
      desc: 'One-click deploy. Get a free subdomain instantly with auto-HTTPS and global CDN.',
      features: ['Free custom subdomain', 'Auto HTTPS / SSL', 'Global CDN', 'Instant deployments'],
      badge: 'Most Popular', badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      action: handleVercelDeploy, loading: false, btnText: 'Deploy to Vercel', btnIcon: Rocket,
      border: 'border-blue-500/20 hover:border-blue-500/40', glow: 'hover:shadow-blue-500/10',
    },
    {
      id: 'html', title: 'Static HTML', subtitle: 'Download · Host anywhere', icon: FileCode,
      iconBg: 'bg-gradient-to-br from-emerald-500/20 to-green-500/20', iconColor: 'text-emerald-400',
      desc: 'Download as a single HTML file. Host on GitHub Pages, Netlify, or any static host.',
      features: ['Single file, no deps', 'Works on any host', 'No build step', 'Full ownership'],
      badge: 'Easy', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      action: handleExportHTML, loading: exportLoading === 'html', btnText: 'Download HTML', btnIcon: Download,
      border: 'border-emerald-500/20 hover:border-emerald-500/40', glow: 'hover:shadow-emerald-500/10',
    },
    {
      id: 'nextjs', title: 'Next.js Project', subtitle: 'Full source code', icon: Code,
      iconBg: 'bg-gradient-to-br from-violet-500/20 to-purple-500/20', iconColor: 'text-violet-400',
      desc: 'Download a setup guide for this Next.js portfolio project. Clone and customize everything.',
      features: ['Full source code', 'Customize freely', 'Deploy anywhere', 'You own the code'],
      badge: 'Developer', badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
      action: handleExportNextjs, loading: exportLoading === 'nextjs', btnText: 'Download Guide', btnIcon: Download,
      border: 'border-violet-500/20 hover:border-violet-500/40', glow: 'hover:shadow-violet-500/10',
    },
    {
      id: 'domain', title: 'Custom Domain', subtitle: 'yourname.com', icon: Globe,
      iconBg: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20', iconColor: 'text-amber-400',
      desc: 'After deploying to Vercel, add your own domain for a fully branded professional URL.',
      features: ['Professional URL', 'Full branding', 'Free SSL cert', 'Works with Vercel'],
      badge: 'Pro', badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      action: () => window.open('https://vercel.com/docs/projects/domains', '_blank'),
      loading: false, btnText: 'Domain Guide', btnIcon: ArrowRight,
      border: 'border-amber-500/20 hover:border-amber-500/40', glow: 'hover:shadow-amber-500/10',
    },
  ]

  return (
    <div className="relative min-h-screen">
      <FloatingParticles />

      <div className="relative space-y-8 max-w-7xl mx-auto px-4 pb-16">
        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold backdrop-blur-xl border ${
                toast.type === 'success'
                  ? 'bg-emerald-500/90 text-white border-emerald-400/30'
                  : 'bg-red-500/90 text-white border-red-400/30'
              }`}
            >
              {toast.type === 'success' ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="relative pt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-violet-500/10 rounded-3xl blur-3xl" />

          <div className="relative py-8">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 dark:bg-blue-500/20 backdrop-blur-xl rounded-full px-4 py-1.5 border border-blue-500/20 dark:border-blue-500/30 shadow-lg shadow-blue-500/10 mb-4">
              <Rocket className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Deploy & Publish</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              <span className="text-foreground">
                Deploy Your
              </span>
              <br className="sm:hidden" />
              <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
                {' '}Portfolio
              </span>
            </h1>
            <p className="text-muted-foreground mt-3 text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-500" />
              Publish your portfolio and share it with the world
            </p>
          </div>
        </div>

        {/* Status Banner */}
        <div>
          {username ? (
            <Card className="relative overflow-hidden border-2 border-emerald-200 dark:border-emerald-500/20 bg-gradient-to-r from-emerald-50 to-transparent dark:from-emerald-500/5 backdrop-blur-xl shadow-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent_70%)]" />
              
              <div className="relative p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-300 dark:border-emerald-500/20">
                      <CheckCircle2 className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-bold text-xl text-emerald-600 dark:text-emerald-400">Ready to Deploy</p>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/20">
                          @{username}
                        </Badge>
                        <span className="text-border">·</span>
                        <Badge variant="secondary" className="bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-300 dark:border-cyan-500/20 capitalize">
                          {template} template
                        </Badge>
                      </p>
                    </div>
                  </div>
                  {portfolioUrl && (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 border-emerald-300 dark:border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/5 rounded-xl"
                        onClick={() => copyText(portfolioUrl, 'url')}
                      >
                        {copied === 'url' ? (
                          <><Check className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />Copied</>
                        ) : (
                          <><Copy className="h-3.5 w-3.5" />Copy URL</>
                        )}
                      </Button>
                      <Button size="sm" asChild className="bg-emerald-600 hover:bg-emerald-700 gap-2 rounded-xl shadow-lg shadow-emerald-500/25">
                        <a href={portfolioUrl} target="_blank" rel="noreferrer">
                          <ExternalLink className="h-3.5 w-3.5" /> Preview
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ) : (
            <Card className="relative overflow-hidden border-2 border-yellow-200 dark:border-yellow-500/20 bg-gradient-to-r from-yellow-50 to-transparent dark:from-yellow-500/5 backdrop-blur-xl">
              <div className="relative p-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-yellow-100 dark:bg-yellow-500/10 flex items-center justify-center border border-yellow-300 dark:border-yellow-500/20">
                    <AlertCircle className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-yellow-600 dark:text-yellow-400">GitHub Not Connected</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <button onClick={() => router.push('/dashboard')} className="text-primary underline font-medium">
                        Go to Dashboard
                      </button>
                      {' '}and connect your GitHub account first
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Deploy Options Grid */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
              <Layers className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Deployment Options</h2>
              <p className="text-sm text-muted-foreground">Choose how to publish your portfolio</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {options.map((opt) => (
              <div key={opt.id}>
                <Card className={`group relative overflow-hidden border-2 ${opt.border} bg-card backdrop-blur-xl transition-all duration-300 ${opt.glow} hover:shadow-xl h-full flex flex-col`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.02),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)]" />
                  
                  <div className="relative p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div className={`h-14 w-14 rounded-2xl ${opt.iconBg} flex items-center justify-center border border-border`}>
                          <opt.icon className={`h-6 w-6 ${opt.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-foreground">{opt.title}</h3>
                          <p className="text-xs text-muted-foreground">{opt.subtitle}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border ${opt.badgeColor}`}>
                        {opt.badge}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed flex-1">{opt.desc}</p>

                    <div className="space-y-2.5 mb-6">
                      {opt.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-2.5 text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                          <span className="text-muted-foreground">{f}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className="w-full gap-2 rounded-xl h-11 text-sm"
                      onClick={opt.action}
                      disabled={opt.loading}
                      variant={opt.id === 'vercel' ? 'default' : 'outline'}
                    >
                      {opt.loading ? (
                        <>
                          <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <opt.btnIcon className="h-4 w-4" />
                          {opt.btnText}
                          <ArrowRight className="h-4 w-4 ml-auto" />
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Share URL Section */}
        {portfolioUrl && (
          <div>
            <Card className="relative overflow-hidden border-2 border-border bg-card shadow-sm">
              <div className="relative p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-12 w-12 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 flex items-center justify-center border border-cyan-300 dark:border-cyan-500/20">
                    <Globe className="h-6 w-6 text-cyan-500 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Share Your Portfolio</h3>
                    <p className="text-sm text-muted-foreground">Your portfolio is live at this URL</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1 group">
                    <Input
                      value={portfolioUrl}
                      readOnly
                      className="h-12 pl-4 pr-4 bg-muted/50 border-border rounded-xl font-mono text-xs group-hover:border-primary/30 transition-colors"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-xl flex-shrink-0 gap-2 border-border hover:border-primary/30"
                    onClick={() => copyText(portfolioUrl, 'share')}
                  >
                    {copied === 'share' ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied === 'share' ? 'Copied' : 'Copy'}
                  </Button>
                  <Button className="rounded-xl flex-shrink-0 gap-2" asChild>
                    <a href={portfolioUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" /> Open
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* DNS Setup */}
        <div>
          <Card className="relative overflow-hidden border-2 border-border bg-card shadow-sm">
            <div className="relative p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-12 w-12 rounded-2xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center border border-violet-300 dark:border-violet-500/20">
                  <Shield className="h-6 w-6 text-violet-500 dark:text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Custom Domain DNS Setup</h3>
                  <p className="text-sm text-muted-foreground">Add these records at your domain registrar</p>
                </div>
              </div>

              <div className="bg-muted/30 border border-border rounded-2xl p-5 space-y-3">
                {[
                  { type: 'A', name: '@', value: '76.76.21.21' },
                  { type: 'CNAME', name: 'www', value: 'cname.vercel-dns.com' },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between flex-wrap gap-3 p-3 rounded-xl bg-background border border-border">
                    <div className="flex items-center gap-3 text-sm">
                      <Badge className="bg-primary/10 text-primary border-primary/20 font-bold px-3 py-1">
                        {r.type}
                      </Badge>
                      <span className="text-muted-foreground font-mono">{r.name}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground/50" />
                      <span className="font-semibold font-mono text-foreground">{r.value}</span>
                    </div>
                    <button
                      onClick={() => copyText(r.value, `dns-${i}`)}
                      className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted"
                    >
                      {copied === `dns-${i}` ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Deploy History */}
        <div>
          <Card className="relative overflow-hidden border-2 border-border bg-card shadow-sm">
            <div className="relative p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center border border-amber-300 dark:border-amber-500/20">
                  <Clock className="h-6 w-6 text-amber-500 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Deploy History</h3>
                  <p className="text-sm text-muted-foreground">Your recent deployments</p>
                </div>
                {deployHistory.length > 0 && (
                  <Badge className="ml-auto bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-500/20">
                    {deployHistory.length} deploys
                  </Badge>
                )}
              </div>

              {deployHistory.length === 0 ? (
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
                    <Activity className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                  <p className="text-muted-foreground text-sm">No deployments yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Deploy your portfolio above to get started!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {deployHistory.map((d, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{d.method}</p>
                          <p className="text-xs text-muted-foreground font-mono">
                            @{d.username} · {d.template}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/20 text-xs">
                          {d.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(d.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Tips */}
        <div>
          <Card className="relative overflow-hidden border border-border bg-card">
            <div className="relative p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Quick Tips</h3>
                  <p className="text-xs text-muted-foreground">Get the most out of your deployment</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    icon: <Server className="h-4 w-4" />,
                    title: 'Vercel is Fastest',
                    desc: 'Deploy in under 60 seconds with auto-HTTPS and global CDN.',
                  },
                  {
                    icon: <Globe className="h-4 w-4" />,
                    title: 'Custom Domain',
                    desc: 'Add your own domain for a professional touch that impresses recruiters.',
                  },
                  {
                    icon: <RefreshCw className="h-4 w-4" />,
                    title: 'Auto Updates',
                    desc: 'Push to GitHub and Vercel automatically redeploys your portfolio.',
                  },
                ].map((tip, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-muted/30 border border-border">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <div className="text-primary">{tip.icon}</div>
                    </div>
                    <p className="font-semibold text-sm text-foreground mb-1">{tip.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}