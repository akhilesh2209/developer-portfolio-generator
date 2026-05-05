'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Flame, CheckCircle2, AlertTriangle, XCircle, Sparkles,
  RefreshCw, Github, Trophy, TrendingUp, Zap, Shield,
  Target, Award, ArrowRight, BarChart3, Code2, Star,
  GitBranch, Users, Eye, Rocket, Crown, Swords
} from 'lucide-react'

type RoastItem = { type: 'good' | 'warn' | 'bad'; text: string }
type ScoreCategory = { label: string; score: number; max: number; icon: string }

function analyzeProfile(repos: any[], user: any, skills: string[], githubUsername: string): { score: number; roasts: RoastItem[]; categories: ScoreCategory[] } {
  const roasts: RoastItem[] = []
  let totalScore = 0

  const withDesc = repos.filter(r => r.description && r.description.length > 20)
  const descPct = repos.length > 0 ? withDesc.length / repos.length : 0
  const descScore = Math.round(descPct * 25)
  totalScore += descScore
  if (descPct >= 0.7) roasts.push({ type: 'good', text: `${withDesc.length} of your repos have descriptions. Recruiters love context. ✅` })
  else if (descPct >= 0.4) roasts.push({ type: 'warn', text: `Only ${withDesc.length}/${repos.length} repos have descriptions. Add them — 30 seconds each, huge difference. ⚠️` })
  else roasts.push({ type: 'bad', text: `${repos.length - withDesc.length} repos have no description. You have ${repos.length} repos and described almost none. That's a red flag for recruiters. 🚨` })

  const totalStars = repos.reduce((a, r) => a + (r.stars || 0), 0)
  const starScore = Math.min(25, Math.round(totalStars / 2))
  totalScore += starScore
  if (totalStars >= 50) roasts.push({ type: 'good', text: `${totalStars} total GitHub stars! You're clearly building things people care about. 🌟` })
  else if (totalStars >= 10) roasts.push({ type: 'warn', text: `${totalStars} stars across all repos. Decent start — share your work more on LinkedIn/Twitter. 📢` })
  else roasts.push({ type: 'bad', text: `${totalStars} total stars. Not great. Try open-sourcing something useful and promoting it. Your work deserves attention. 👀` })

  const langs = [...new Set(repos.map(r => r.language).filter(Boolean))]
  const langScore = Math.min(20, langs.length * 4)
  totalScore += langScore
  if (langs.length >= 5) roasts.push({ type: 'good', text: `You code in ${langs.slice(0, 5).join(', ')} and more. Versatile developer! 💪` })
  else if (langs.length >= 3) roasts.push({ type: 'warn', text: `${langs.length} languages. Good. Explore 1-2 more to show versatility to employers.` })
  else if (langs.length > 0) roasts.push({ type: 'bad', text: `Only ${langs.join(', ')}? Interviewers love polyglots. Learn one new language this month.` })

  const skillScore = Math.min(15, skills.length * 2)
  totalScore += skillScore
  if (skills.length >= 8) roasts.push({ type: 'good', text: `${skills.length} skills listed. Comprehensive tech stack shows real experience. ✅` })
  else if (skills.length >= 4) roasts.push({ type: 'warn', text: `${skills.length} skills on your profile. Add more from your actual repos to complete the picture.` })
  else roasts.push({ type: 'bad', text: `${skills.length || 0} skills listed. This kills your ATS score. Go to Settings → add ALL your skills.` })

  const repoScore = Math.min(15, repos.length)
  totalScore += repoScore
  if (repos.length >= 15) roasts.push({ type: 'good', text: `${repos.length} public repos. Very active on GitHub! Recruiters love consistent builders. 🏗️` })
  else if (repos.length >= 6) roasts.push({ type: 'warn', text: `${repos.length} repos. Solid. Keep shipping — aim for 1 new project per month.` })
  else roasts.push({ type: 'bad', text: `Only ${repos.length} repos? More projects = more proof you can build. Start a weekend project this Friday. 🛠️` })

  const categories: ScoreCategory[] = [
    { label: 'Project Descriptions', score: descScore, max: 25, icon: '📝' },
    { label: 'Community Interest', score: starScore, max: 25, icon: '⭐' },
    { label: 'Language Diversity', score: langScore, max: 20, icon: '💻' },
    { label: 'Skills Profile', score: skillScore, max: 15, icon: '🎯' },
    { label: 'Activity Level', score: repoScore, max: 15, icon: '🔥' },
  ]

  return { score: Math.min(100, totalScore), roasts, categories }
}

export default function RoastPage() {
  const router = useRouter()
  const [repos, setRepos] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<ReturnType<typeof analyzeProfile> | null>(null)
  const [analyzed, setAnalyzed] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    setUser(storedUser)
    const storedSkills = localStorage.getItem('skills')
    if (storedSkills) try { setSkills(JSON.parse(storedSkills)) } catch { }
    const saved = sessionStorage.getItem('githubRepos')
    if (saved) { setRepos(JSON.parse(saved)); setLoading(false) }
    else {
      const username = localStorage.getItem('githubUsername')
      if (username) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/github/${username}`)
          .then(r => r.json())
          .then(d => { if (Array.isArray(d)) { setRepos(d); sessionStorage.setItem('githubRepos', JSON.stringify(d)) } })
          .catch(() => { })
          .finally(() => setLoading(false))
      } else setLoading(false)
    }
  }, [router])

  const handleAnalyze = () => {
    setAnalyzing(true)
    setTimeout(() => {
      const username = localStorage.getItem('githubUsername') || ''
      setResult(analyzeProfile(repos, user, skills, username))
      setAnalyzed(true)
      setAnalyzing(false)
    }, 1800)
  }

  const getGrade = (score: number) => {
    if (score >= 85) return { grade: 'S', label: 'Portfolio Legend', color: 'text-amber-500 dark:text-amber-400', bg: 'from-amber-100 to-yellow-50 dark:from-amber-500/20 dark:via-yellow-500/10 dark:to-orange-500/20', border: 'border-amber-300 dark:border-amber-500/30', shadow: 'shadow-amber-500/20' }
    if (score >= 70) return { grade: 'A', label: 'Hire Me Ready', color: 'text-emerald-500 dark:text-emerald-400', bg: 'from-emerald-100 to-green-50 dark:from-emerald-500/20 dark:via-green-500/10 dark:to-teal-500/20', border: 'border-emerald-300 dark:border-emerald-500/30', shadow: 'shadow-emerald-500/20' }
    if (score >= 55) return { grade: 'B', label: 'Getting There', color: 'text-blue-500 dark:text-blue-400', bg: 'from-blue-100 to-cyan-50 dark:from-blue-500/20 dark:via-cyan-500/10 dark:to-sky-500/20', border: 'border-blue-300 dark:border-blue-500/30', shadow: 'shadow-blue-500/20' }
    if (score >= 40) return { grade: 'C', label: 'Needs Work', color: 'text-orange-500 dark:text-orange-400', bg: 'from-orange-100 to-yellow-50 dark:from-orange-500/20 dark:via-yellow-500/10 dark:to-red-500/20', border: 'border-orange-300 dark:border-orange-500/30', shadow: 'shadow-orange-500/20' }
    return { grade: 'D', label: 'Roast Mode Activated', color: 'text-red-500 dark:text-red-400', bg: 'from-red-100 to-rose-50 dark:from-red-500/20 dark:via-rose-500/10 dark:to-pink-500/20', border: 'border-red-300 dark:border-red-500/30', shadow: 'shadow-red-500/20' }
  }

  const FloatingParticles = () => {
    const [particles, setParticles] = useState<any[]>([])

    useEffect(() => {
      const generated = [
        { id: 0, left: '12%', top: '18%', duration: 4, delay: 0 },
        { id: 1, left: '28%', top: '35%', duration: 4, delay: 0.1 },
        { id: 2, left: '44%', top: '62%', duration: 4, delay: 0.2 },
        { id: 3, left: '58%', top: '22%', duration: 4, delay: 0.3 },
        { id: 4, left: '72%', top: '48%', duration: 4, delay: 0.4 },
        { id: 5, left: '84%', top: '70%', duration: 4, delay: 0.5 },
        { id: 6, left: '35%', top: '80%', duration: 4, delay: 0.6 },
        { id: 7, left: '90%', top: '15%', duration: 4, delay: 0.7 },
        { id: 8, left: '15%', top: '45%', duration: 4, delay: 0.8 },
        { id: 9, left: '65%', top: '25%', duration: 4, delay: 0.9 },
        { id: 10, left: '25%', top: '55%', duration: 4, delay: 1.0 },
        { id: 11, left: '75%', top: '35%', duration: 4, delay: 1.1 },
        { id: 12, left: '45%', top: '75%', duration: 4, delay: 1.2 },
        { id: 13, left: '85%', top: '40%', duration: 4, delay: 1.3 },
        { id: 14, left: '20%', top: '60%', duration: 4, delay: 1.4 },
        { id: 15, left: '55%', top: '85%', duration: 4, delay: 1.5 },
        { id: 16, left: '70%', top: '20%', duration: 4, delay: 1.6 },
        { id: 17, left: '30%', top: '50%', duration: 4, delay: 1.7 },
        { id: 18, left: '60%', top: '30%', duration: 4, delay: 1.8 },
        { id: 19, left: '80%', top: '65%', duration: 4, delay: 1.9 },
      ]
      setParticles(generated)
    }, [])

    if (particles.length === 0) return null

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{ left: p.left, top: p.top }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>
    )
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center space-y-6">
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-xl opacity-50" />
          <div className="relative h-full w-full border-4 border-orange-500/20 rounded-full" />
          <div className="absolute inset-0 h-full w-full border-4 border-transparent border-t-orange-500 rounded-full animate-spin" />
        </div>
        <p className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Preparing the flames...</p>
        <p className="text-muted-foreground text-sm">Fetching your GitHub data</p>
      </div>
    </div>
  )

  return (
    <div className="relative min-h-screen">
      <FloatingParticles />
      
      <div className="relative space-y-8 max-w-4xl mx-auto px-4 pb-16">
        {/* Hero Header */}
        <div className="relative pt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
          
          <div className="relative text-center space-y-4 py-12">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 dark:bg-orange-500/20 backdrop-blur-xl rounded-full px-6 py-2 border border-orange-500/20 dark:border-orange-500/30 shadow-lg shadow-orange-500/10">
              <Swords className="h-4 w-4 text-orange-500 dark:text-orange-400" />
              <span className="text-sm font-semibold text-orange-600 dark:text-orange-300">Portfolio Roaster v2.0</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">Roast My</span>
              <br />
              <span className="text-foreground">Portfolio 🔥</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get brutally honest feedback on your GitHub profile. No sugar-coating, just pure facts.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              {[
                { icon: Shield, label: 'Deep Analysis' },
                { icon: Target, label: 'Actionable Tips' },
                { icon: Award, label: 'Score Report' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GitHub Not Connected Warning */}
        {repos.length === 0 && (
          <div>
            <Card className="p-6 border-yellow-200 dark:border-yellow-500/20 bg-yellow-50 dark:bg-yellow-500/5 backdrop-blur-xl relative overflow-hidden group hover:border-yellow-500/40 transition-all duration-300">
              <div className="relative flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-yellow-100 dark:bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <Github className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="font-semibold text-lg text-foreground">GitHub not connected</p>
                  <p className="text-sm text-muted-foreground">
                    Connect your GitHub account to get started. Visit the{' '}
                    <button onClick={() => router.push('/dashboard')} className="text-primary underline font-medium">Dashboard</button>
                    {' '}to link your account.
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-yellow-500 dark:text-yellow-400 ml-auto flex-shrink-0" />
              </div>
            </Card>
          </div>
        )}

        {/* Analysis Section */}
        <AnimatePresence mode="wait">
          {!analyzed ? (
            <motion.div key="analyze" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <Card className="relative overflow-hidden border-2 border-orange-200 dark:border-orange-500/20 bg-card">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.04),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_70%)]" />
                
                <div className="relative p-8 md:p-12 text-center space-y-8">
                  <div className="relative mx-auto w-24 h-24">
                    <div className="relative h-full w-full rounded-full bg-orange-100 dark:bg-orange-500/10 border border-orange-300 dark:border-orange-500/20 flex items-center justify-center">
                      <Flame className="h-12 w-12 text-orange-500 dark:text-orange-400" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl font-black text-foreground mb-3">
                      Ready for the{' '}
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Roast?</span>
                    </h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                      We'll analyze your GitHub profile, code diversity, and portfolio strength. Prepare for brutal honesty.
                    </p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    {[
                      { icon: GitBranch, label: 'Repos', value: repos.length },
                      { icon: Code2, label: 'Languages', value: new Set(repos.map(r => r.language).filter(Boolean)).size },
                      { icon: Star, label: 'Stars', value: repos.reduce((a, r) => a + (r.stars || 0), 0) },
                    ].map((stat, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-muted/30 border border-border">
                        <stat.icon className="h-5 w-5 text-orange-500 dark:text-orange-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    onClick={handleAnalyze}
                    disabled={analyzing || repos.length === 0}
                    className="relative group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-orange-500/25 transition-all duration-300 hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative flex items-center gap-3">
                      {analyzing ? (
                        <><RefreshCw className="h-5 w-5 animate-spin" />Analyzing Your Soul...</>
                      ) : (
                        <><Flame className="h-5 w-5" />Roast My Portfolio<ArrowRight className="h-5 w-5" /></>
                      )}
                    </span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            result && (
              <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Grade Card */}
                <Card className={`relative overflow-hidden border-2 ${getGrade(result.score).border} bg-gradient-to-br ${getGrade(result.score).bg}`}>
                  <div className="relative p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative">
                        <div className={`w-48 h-48 rounded-full bg-gradient-to-br ${getGrade(result.score).bg} border-4 ${getGrade(result.score).border} flex items-center justify-center shadow-2xl`}>
                          <div className="text-center">
                            <p className={`text-7xl font-black ${getGrade(result.score).color}`}>{getGrade(result.score).grade}</p>
                            <p className="text-sm text-muted-foreground mt-1">{getGrade(result.score).label}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <p className="text-sm text-muted-foreground mb-2">Overall Score</p>
                        <p className="text-6xl font-black text-foreground mb-2">{result.score}<span className="text-2xl text-muted-foreground">/100</span></p>
                        
                        <div className="relative w-full h-4 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${result.score >= 70 ? 'from-emerald-500 to-green-500' : result.score >= 40 ? 'from-orange-500 to-yellow-500' : 'from-red-500 to-pink-500'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${result.score}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Score Categories */}
                <Card className="border border-border bg-card overflow-hidden">
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      Score Breakdown
                    </h3>

                    <div className="space-y-5">
                      {result.categories.map((cat, i) => (
                        <div key={i} className="group">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                              <span className="text-xl">{cat.icon}</span>{cat.label}
                            </span>
                            <span className={`text-sm font-bold ${
                              cat.score >= cat.max * 0.7 ? 'text-emerald-500 dark:text-emerald-400' :
                              cat.score >= cat.max * 0.4 ? 'text-yellow-500 dark:text-yellow-400' :
                              'text-red-500 dark:text-red-400'
                            }`}>{cat.score}/{cat.max}</span>
                          </div>
                          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${
                                cat.score >= cat.max * 0.7 ? 'from-emerald-500 to-green-500' :
                                cat.score >= cat.max * 0.4 ? 'from-yellow-500 to-orange-500' :
                                'from-red-500 to-pink-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${(cat.score / cat.max) * 100}%` }}
                              transition={{ duration: 1, delay: 0.1 * i }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Roast Items */}
                <Card className="border border-border bg-card overflow-hidden">
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center">
                        <Flame className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                      </div>
                      The Roast
                    </h3>

                    <div className="space-y-4">
                      {result.roasts.map((item, i) => (
                        <div key={i} className={`relative group p-5 rounded-2xl border transition-all duration-300 ${
                          item.type === 'good'
                            ? 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-100 dark:hover:bg-emerald-500/10'
                            : item.type === 'warn'
                            ? 'bg-yellow-50 dark:bg-yellow-500/5 border-yellow-200 dark:border-yellow-500/20 hover:border-yellow-500/40 hover:bg-yellow-100 dark:hover:bg-yellow-500/10'
                            : 'bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20 hover:border-red-500/40 hover:bg-red-100 dark:hover:bg-red-500/10'
                        }`}>
                          <div className="relative flex items-start gap-4">
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              item.type === 'good' ? 'bg-emerald-100 dark:bg-emerald-500/10' :
                              item.type === 'warn' ? 'bg-yellow-100 dark:bg-yellow-500/10' :
                              'bg-red-100 dark:bg-red-500/10'
                            }`}>
                              {item.type === 'good' ? <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400" /> :
                               item.type === 'warn' ? <AlertTriangle className="h-5 w-5 text-yellow-500 dark:text-yellow-400" /> :
                               <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />}
                            </div>
                            <p className="text-sm text-foreground leading-relaxed pt-2">{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => { setAnalyzed(false); setResult(null) }} variant="outline" className="group border-border hover:border-primary/30 bg-muted/50">
                    <RefreshCw className="h-4 w-4 mr-2" />Re-analyze
                  </Button>
                  <Button onClick={() => router.push('/dashboard/settings')} className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25">
                    <Sparkles className="h-4 w-4 mr-2" />Fix Issues<ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button onClick={() => router.push('/dashboard/templates')} variant="outline" className="group border-border hover:border-primary/30 bg-muted/50">
                    <Trophy className="h-4 w-4 mr-2" />Build Portfolio
                  </Button>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}