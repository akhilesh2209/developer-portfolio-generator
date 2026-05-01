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

  // — README / descriptions
  const withDesc = repos.filter(r => r.description && r.description.length > 20)
  const descPct = repos.length > 0 ? withDesc.length / repos.length : 0
  const descScore = Math.round(descPct * 25)
  totalScore += descScore
  if (descPct >= 0.7) roasts.push({ type: 'good', text: `${withDesc.length} of your repos have descriptions. Recruiters love context. ✅` })
  else if (descPct >= 0.4) roasts.push({ type: 'warn', text: `Only ${withDesc.length}/${repos.length} repos have descriptions. Add them — 30 seconds each, huge difference. ⚠️` })
  else roasts.push({ type: 'bad', text: `${repos.length - withDesc.length} repos have no description. You have ${repos.length} repos and described almost none. That's a red flag for recruiters. 🚨` })

  // — Stars
  const totalStars = repos.reduce((a, r) => a + (r.stars || 0), 0)
  const starScore = Math.min(25, Math.round(totalStars / 2))
  totalScore += starScore
  if (totalStars >= 50) roasts.push({ type: 'good', text: `${totalStars} total GitHub stars! You're clearly building things people care about. 🌟` })
  else if (totalStars >= 10) roasts.push({ type: 'warn', text: `${totalStars} stars across all repos. Decent start — share your work more on LinkedIn/Twitter. 📢` })
  else roasts.push({ type: 'bad', text: `${totalStars} total stars. Not great. Try open-sourcing something useful and promoting it. Your work deserves attention. 👀` })

  // — Language diversity
  const langs = [...new Set(repos.map(r => r.language).filter(Boolean))]
  const langScore = Math.min(20, langs.length * 4)
  totalScore += langScore
  if (langs.length >= 5) roasts.push({ type: 'good', text: `You code in ${langs.slice(0, 5).join(', ')} and more. Versatile developer! 💪` })
  else if (langs.length >= 3) roasts.push({ type: 'warn', text: `${langs.length} languages. Good. Explore 1-2 more to show versatility to employers.` })
  else if (langs.length > 0) roasts.push({ type: 'bad', text: `Only ${langs.join(', ')}? Interviewers love polyglots. Learn one new language this month.` })

  // — Skills
  const skillScore = Math.min(15, skills.length * 2)
  totalScore += skillScore
  if (skills.length >= 8) roasts.push({ type: 'good', text: `${skills.length} skills listed. Comprehensive tech stack shows real experience. ✅` })
  else if (skills.length >= 4) roasts.push({ type: 'warn', text: `${skills.length} skills on your profile. Add more from your actual repos to complete the picture.` })
  else roasts.push({ type: 'bad', text: `${skills.length || 0} skills listed. This kills your ATS score. Go to Settings → add ALL your skills.` })

  // — Repo count
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
        fetch(`http://localhost:5000/api/github/${username}`)
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
    if (score >= 85) return { grade: 'S', label: 'Portfolio Legend', color: 'text-amber-400', bg: 'from-amber-500/20 via-yellow-500/10 to-orange-500/20', border: 'border-amber-500/30', shadow: 'shadow-amber-500/20' }
    if (score >= 70) return { grade: 'A', label: 'Hire Me Ready', color: 'text-emerald-400', bg: 'from-emerald-500/20 via-green-500/10 to-teal-500/20', border: 'border-emerald-500/30', shadow: 'shadow-emerald-500/20' }
    if (score >= 55) return { grade: 'B', label: 'Getting There', color: 'text-blue-400', bg: 'from-blue-500/20 via-cyan-500/10 to-sky-500/20', border: 'border-blue-500/30', shadow: 'shadow-blue-500/20' }
    if (score >= 40) return { grade: 'C', label: 'Needs Work', color: 'text-orange-400', bg: 'from-orange-500/20 via-yellow-500/10 to-red-500/20', border: 'border-orange-500/30', shadow: 'shadow-orange-500/20' }
    return { grade: 'D', label: 'Roast Mode Activated', color: 'text-red-400', bg: 'from-red-500/20 via-rose-500/10 to-pink-500/20', border: 'border-red-500/30', shadow: 'shadow-red-500/20' }
  }

  // Floating particles for background
const FloatingParticles = () => {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const generated = [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
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
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          style={{
            left: p.left,
            top: p.top,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto w-24 h-24"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-xl opacity-50" />
          <div className="relative h-full w-full border-4 border-orange-500/20 rounded-full" />
          <div className="absolute inset-0 h-full w-full border-4 border-transparent border-t-orange-500 rounded-full animate-spin" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Preparing the flames...
          </p>
          <p className="text-muted-foreground text-sm mt-2">Fetching your GitHub data</p>
        </motion.div>
      </motion.div>
    </div>
  )

  return (
    <div className="relative min-h-screen">
      <FloatingParticles />
      
      <div className="relative space-y-8 max-w-4xl mx-auto px-4 pb-16">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative pt-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
          
          <div className="relative text-center space-y-4 py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-full px-6 py-2 border border-orange-500/30 shadow-lg shadow-orange-500/10"
            >
              <Swords className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-semibold text-orange-300">Portfolio Roaster v2.0</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Roast My
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Portfolio 🔥
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Get brutally honest feedback on your GitHub profile. No sugar-coating, just pure facts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              {[
                { icon: Shield, label: 'Deep Analysis' },
                { icon: Target, label: 'Actionable Tips' },
                { icon: Award, label: 'Score Report' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon className="h-4 w-4 text-orange-400" />
                  {item.label}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* GitHub Not Connected Warning */}
        {repos.length === 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6 border-yellow-500/20 bg-yellow-500/5 backdrop-blur-xl relative overflow-hidden group hover:border-yellow-500/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 group-hover:via-yellow-500/10 transition-all duration-500" />
              <div className="relative flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <Github className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <p className="font-semibold text-lg">GitHub not connected</p>
                  <p className="text-sm text-muted-foreground">
                    Connect your GitHub account to get started. Visit the{' '}
                    <button onClick={() => router.push('/dashboard')} className="text-primary underline font-medium">
                      Dashboard
                    </button>
                    {' '}to link your account.
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-yellow-400 ml-auto flex-shrink-0" />
              </div>
            </Card>
          </motion.div>
        )}

        {/* Analysis Section */}
        <AnimatePresence mode="wait">
          {!analyzed ? (
            <motion.div
              key="analyze"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="relative overflow-hidden border-2 border-orange-500/20 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_70%)]" />
                
                <div className="relative p-8 md:p-12 text-center space-y-8">
                  {/* Flame Animation */}
                  <motion.div
                    animate={{ 
                      scale: analyzing ? [1, 1.2, 1] : 1,
                      rotate: analyzing ? 360 : 0 
                    }}
                    transition={{ 
                      scale: { duration: 1, repeat: analyzing ? Infinity : 0 },
                      rotate: { duration: 3, repeat: analyzing ? Infinity : 0, ease: "linear" }
                    }}
                    className="relative mx-auto w-24 h-24"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-2xl opacity-50 animate-pulse" />
                    <div className="relative h-full w-full rounded-full bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 flex items-center justify-center">
                      <Flame className="h-12 w-12 text-orange-400" />
                    </div>
                  </motion.div>

                  <div>
                    <h2 className="text-3xl font-black mb-3">
                      Ready for the{' '}
                      <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                        Roast?
                      </span>
                    </h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                      We'll analyze your GitHub profile, code diversity, and portfolio strength. 
                      Prepare for brutal honesty.
                    </p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    {[
                      { icon: GitBranch, label: 'Repos', value: repos.length },
                      { icon: Code2, label: 'Languages', value: new Set(repos.map(r => r.language).filter(Boolean)).size },
                      { icon: Star, label: 'Stars', value: repos.reduce((a, r) => a + (r.stars || 0), 0) },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                      >
                        <stat.icon className="h-5 w-5 text-orange-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    onClick={handleAnalyze}
                    disabled={analyzing || repos.length === 0}
                    className="relative group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-orange-500/25 transition-all duration-300 hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                    <span className="relative flex items-center gap-3">
                      {analyzing ? (
                        <>
                          <RefreshCw className="h-5 w-5 animate-spin" />
                          Analyzing Your Soul...
                        </>
                      ) : (
                        <>
                          <Flame className="h-5 w-5" />
                          Roast My Portfolio
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Grade Card */}
                <Card className={`relative overflow-hidden border-2 ${getGrade(result.score).border} bg-gradient-to-br ${getGrade(result.score).bg} backdrop-blur-xl`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" />
                  
                  <div className="relative p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      {/* Grade Circle */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative"
                      >
                        <div className={`w-48 h-48 rounded-full bg-gradient-to-br ${getGrade(result.score).bg} border-4 ${getGrade(result.score).border} flex items-center justify-center ${getGrade(result.score).shadow} shadow-2xl`}>
                          <div className="text-center">
                            <p className={`text-7xl font-black ${getGrade(result.score).color}`}>
                              {getGrade(result.score).grade}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {getGrade(result.score).label}
                            </p>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-3 rounded-full border-2 border-dashed border-white/10"
                        />
                      </motion.div>

                      <div className="flex-1 text-center md:text-left">
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="text-sm text-muted-foreground mb-2">Overall Score</p>
                          <p className="text-6xl font-black mb-2">
                            {result.score}
                            <span className="text-2xl text-muted-foreground">/100</span>
                          </p>
                          
                          {/* Progress Bar */}
                          <div className="relative w-full h-4 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${result.score >= 70 ? 'from-emerald-400 to-green-400' : result.score >= 40 ? 'from-orange-400 to-yellow-400' : 'from-red-400 to-pink-400'}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${result.score}%` }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Score Categories */}
                <Card className="border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl overflow-hidden">
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-blue-400" />
                      </div>
                      Score Breakdown
                    </h3>

                    <div className="space-y-5">
                      {result.categories.map((cat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold flex items-center gap-2">
                              <span className="text-xl">{cat.icon}</span>
                              {cat.label}
                            </span>
                            <span className={`text-sm font-bold ${
                              cat.score >= cat.max * 0.7 ? 'text-emerald-400' :
                              cat.score >= cat.max * 0.4 ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {cat.score}/{cat.max}
                            </span>
                          </div>
                          <div className="relative h-3 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${
                                cat.score >= cat.max * 0.7 ? 'from-emerald-400 to-green-400' :
                                cat.score >= cat.max * 0.4 ? 'from-yellow-400 to-orange-400' :
                                'from-red-400 to-pink-400'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${(cat.score / cat.max) * 100}%` }}
                              transition={{ duration: 1, delay: 0.1 * i }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Roast Items */}
                <Card className="border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl overflow-hidden">
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                        <Flame className="h-5 w-5 text-orange-400" />
                      </div>
                      The Roast
                    </h3>

                    <div className="space-y-4">
                      {result.roasts.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className={`relative group p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                            item.type === 'good'
                              ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/10'
                              : item.type === 'warn'
                              ? 'bg-yellow-500/5 border-yellow-500/20 hover:border-yellow-500/40 hover:bg-yellow-500/10'
                              : 'bg-red-500/5 border-red-500/20 hover:border-red-500/40 hover:bg-red-500/10'
                          }`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                          
                          <div className="relative flex items-start gap-4">
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              item.type === 'good'
                                ? 'bg-emerald-500/10'
                                : item.type === 'warn'
                                ? 'bg-yellow-500/10'
                                : 'bg-red-500/10'
                            }`}>
                              {item.type === 'good' ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                              ) : item.type === 'warn' ? (
                                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-400" />
                              )}
                            </div>
                            <p className="text-sm leading-relaxed pt-2">{item.text}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-3"
                >
                  <Button
                    onClick={() => { setAnalyzed(false); setResult(null) }}
                    variant="outline"
                    className="group border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-sm"
                  >
                    <RefreshCw className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                    Re-analyze
                  </Button>
                  
                  <Button
                    onClick={() => router.push('/dashboard/settings')}
                    className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  >
                    <Sparkles className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Fix Issues
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button
                    onClick={() => router.push('/dashboard/templates')}
                    variant="outline"
                    className="group border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-sm"
                  >
                    <Trophy className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Build Portfolio
                  </Button>
                </motion.div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}