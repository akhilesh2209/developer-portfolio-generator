'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Github, Swords, Trophy, Star, GitFork, BookOpen,
  TrendingUp, Search, Crown, Shield, Zap, Target,
  Crosshair, Medal, Sparkles, ArrowRight,
  Globe, Code2, Users, GitBranch, Award, Flame,
  Rocket, ChevronRight, AlertCircle, CheckCircle2
} from 'lucide-react'

type Profile = {
  username: string
  repos: any[]
  totalStars: number
  totalForks: number
  languages: string[]
  topRepo: any
  avgStars: number
}

function buildProfile(username: string, repos: any[]): Profile {
  const totalStars = repos.reduce((a, r) => a + (r.stars || 0), 0)
  const totalForks = repos.reduce((a, r) => a + (r.forks || 0), 0)
  const languages = [...new Set(repos.map(r => r.language).filter(Boolean))]
  const topRepo = repos.sort((a, b) => (b.stars || 0) - (a.stars || 0))[0]
  const avgStars = repos.length > 0 ? Math.round(totalStars / repos.length * 10) / 10 : 0
  return { username, repos, totalStars, totalForks, languages, topRepo, avgStars }
}

function StatBar({ label, a, b, icon, index }: { label: string; a: number; b: number; icon: string; index: number }) {
  const total = a + b || 1
  const pctA = Math.round((a / total) * 100)
  const pctB = 100 - pctA
  const winner = a > b ? 'left' : b > a ? 'right' : 'tie'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="space-y-3 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-sm font-bold tabular-nums ${
            winner === 'left' ? 'text-blue-500 dark:text-blue-400' : 'text-muted-foreground'
          }`}>
            {a.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground/50">vs</span>
          <span className={`text-sm font-bold tabular-nums ${
            winner === 'right' ? 'text-purple-500 dark:text-purple-400' : 'text-muted-foreground'
          }`}>
            {b.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="relative h-4 bg-muted rounded-full overflow-hidden border border-border">
        <motion.div
          className={`absolute left-0 top-0 h-full rounded-l-full ${
            winner === 'left'
              ? 'bg-gradient-to-r from-blue-500 to-blue-400'
              : 'bg-blue-500/30'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${pctA}%` }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
        />
        <motion.div
          className={`absolute right-0 top-0 h-full rounded-r-full ${
            winner === 'right'
              ? 'bg-gradient-to-r from-purple-400 to-purple-500'
              : 'bg-purple-500/30'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${pctB}%` }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
        />
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {winner !== 'tie' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className={`text-xs ${
            winner === 'left' ? 'text-blue-500 dark:text-blue-400' : 'text-purple-500 dark:text-purple-400'
          }`}
        >
          {winner === 'left' ? 'You' : 'Opponent'} leads by {Math.abs(pctA - pctB)}%
        </motion.p>
      )}
    </motion.div>
  )
}

function FloatingParticles() {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const generated = [
      { id: 0, left: '12%', top: '18%', background: '#3b82f6', duration: 4, delay: 0 },
      { id: 1, left: '28%', top: '35%', background: '#8b5cf6', duration: 4, delay: 0.1 },
      { id: 2, left: '44%', top: '62%', background: '#3b82f6', duration: 4, delay: 0.2 },
      { id: 3, left: '58%', top: '22%', background: '#8b5cf6', duration: 4, delay: 0.3 },
      { id: 4, left: '72%', top: '48%', background: '#3b82f6', duration: 4, delay: 0.4 },
      { id: 5, left: '84%', top: '70%', background: '#8b5cf6', duration: 4, delay: 0.5 },
      { id: 6, left: '35%', top: '80%', background: '#3b82f6', duration: 4, delay: 0.6 },
      { id: 7, left: '90%', top: '15%', background: '#8b5cf6', duration: 4, delay: 0.7 },
      { id: 8, left: '15%', top: '45%', background: '#3b82f6', duration: 4, delay: 0.8 },
      { id: 9, left: '65%', top: '25%', background: '#8b5cf6', duration: 4, delay: 0.9 },
      { id: 10, left: '25%', top: '55%', background: '#3b82f6', duration: 4, delay: 1.0 },
      { id: 11, left: '75%', top: '35%', background: '#8b5cf6', duration: 4, delay: 1.1 },
      { id: 12, left: '45%', top: '75%', background: '#3b82f6', duration: 4, delay: 1.2 },
      { id: 13, left: '85%', top: '40%', background: '#8b5cf6', duration: 4, delay: 1.3 },
      { id: 14, left: '20%', top: '60%', background: '#3b82f6', duration: 4, delay: 1.4 },
      { id: 15, left: '55%', top: '85%', background: '#8b5cf6', duration: 4, delay: 1.5 },
      { id: 16, left: '70%', top: '20%', background: '#3b82f6', duration: 4, delay: 1.6 },
      { id: 17, left: '30%', top: '50%', background: '#8b5cf6', duration: 4, delay: 1.7 },
      { id: 18, left: '60%', top: '30%', background: '#3b82f6', duration: 4, delay: 1.8 },
      { id: 19, left: '80%', top: '65%', background: '#8b5cf6', duration: 4, delay: 1.9 },
      { id: 20, left: '40%', top: '90%', background: '#3b82f6', duration: 4, delay: 2.0 },
      { id: 21, left: '95%', top: '55%', background: '#8b5cf6', duration: 4, delay: 2.1 },
      { id: 22, left: '10%', top: '75%', background: '#3b82f6', duration: 4, delay: 2.2 },
      { id: 23, left: '50%', top: '10%', background: '#8b5cf6', duration: 4, delay: 2.3 },
      { id: 24, left: '78%', top: '88%', background: '#3b82f6', duration: 4, delay: 2.4 },
      { id: 25, left: '33%', top: '43%', background: '#8b5cf6', duration: 4, delay: 2.5 },
      { id: 26, left: '67%', top: '27%', background: '#3b82f6', duration: 4, delay: 2.6 },
      { id: 27, left: '23%', top: '73%', background: '#8b5cf6', duration: 4, delay: 2.7 },
      { id: 28, left: '87%', top: '37%', background: '#3b82f6', duration: 4, delay: 2.8 },
      { id: 29, left: '41%', top: '61%', background: '#8b5cf6', duration: 4, delay: 2.9 },
    ]
    setParticles(generated)
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: p.left,
            top: p.top,
            background: p.background,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
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

export default function ComparePage() {
  const router = useRouter()
  const [myProfile, setMyProfile] = useState<Profile | null>(null)
  const [theirUsername, setTheirUsername] = useState('')
  const [theirProfile, setTheirProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [battleStarted, setBattleStarted] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }
    const saved = sessionStorage.getItem('githubRepos')
    const username = localStorage.getItem('githubUsername') || ''
    if (saved && username) setMyProfile(buildProfile(username, JSON.parse(saved)))
  }, [router])

  const handleCompare = async () => {
    if (!theirUsername.trim()) {
      setError('Enter a GitHub username to battle')
      return
    }
    if (theirUsername.trim() === localStorage.getItem('githubUsername')) {
      setError("That's you! Enter someone else's username to battle.")
      return
    }
    setError('')
    setLoading(true)
    setBattleStarted(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/github/${theirUsername.trim()}`)
      if (!res.ok) throw new Error('GitHub user not found')
      const data = await res.json()
      if (!Array.isArray(data) || data.length === 0) throw new Error('This user has no public repositories')
      setTheirProfile(buildProfile(theirUsername.trim(), data))
    } catch (e: any) {
      setError(e.message)
      setTheirProfile(null)
    } finally {
      setLoading(false)
    }
  }

  const getWinner = () => {
    if (!myProfile || !theirProfile) return null
    const myScore = myProfile.totalStars * 3 + myProfile.repos.length * 2 + myProfile.languages.length * 5 + myProfile.totalForks * 2
    const theirScore = theirProfile.totalStars * 3 + theirProfile.repos.length * 2 + theirProfile.languages.length * 5 + theirProfile.totalForks * 2
    if (myScore > theirScore) return { winner: myProfile.username, margin: Math.round(((myScore - theirScore) / theirScore) * 100) }
    if (theirScore > myScore) return { winner: theirProfile.username, margin: Math.round(((theirScore - myScore) / myScore) * 100) }
    return { winner: 'tie', margin: 0 }
  }

  const verdict = myProfile && theirProfile ? getWinner() : null
  const isMyWin = verdict?.winner === myProfile?.username
  const isTie = verdict?.winner === 'tie'

  if (!myProfile) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center space-y-6">
          <div className="mx-auto w-24 h-24 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-300 dark:border-blue-500/30">
            <Github className="h-12 w-12 text-blue-500 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Connect GitHub First</h2>
            <p className="text-muted-foreground mb-4">
              Go to your Dashboard and connect your GitHub account to start battling!
            </p>
            <Button onClick={() => router.push('/dashboard')} className="bg-gradient-to-r from-blue-500 to-purple-500">
              <ArrowRight className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <FloatingParticles />

      <div className="relative space-y-8 max-w-5xl mx-auto px-4 pb-16">
        {/* Hero Header */}
        <div className="relative pt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />

          <div className="relative text-center space-y-4 py-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 dark:bg-blue-500/20 backdrop-blur-xl rounded-full px-6 py-2 border border-blue-500/20 dark:border-blue-500/30 shadow-lg shadow-blue-500/10">
              <Swords className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">GitHub Battle Arena</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                GitHub
              </span>
              <br />
              <span className="text-foreground">
                Battle ⚔️
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Challenge any developer and compare your GitHub stats in real-time
            </p>
          </div>
        </div>

        {/* Challenge Input */}
        <div>
          <Card className="relative overflow-hidden border-2 border-blue-200 dark:border-blue-500/20 bg-card">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />

            <div className="relative p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
                  <Crosshair className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Challenge an Opponent</h3>
                  <p className="text-sm text-muted-foreground">Enter their GitHub username to start the battle</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Github className="h-5 w-5 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <Input
                    className="pl-12 h-14 text-lg bg-muted/50 border-border focus:border-blue-500/50 rounded-2xl"
                    placeholder="Enter GitHub username..."
                    value={theirUsername}
                    onChange={e => {
                      setTheirUsername(e.target.value)
                      setError('')
                    }}
                    onKeyDown={e => e.key === 'Enter' && handleCompare()}
                  />
                </div>
                <Button
                  onClick={handleCompare}
                  disabled={loading}
                  size="lg"
                  className="h-14 px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Searching...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Swords className="h-5 w-5" />
                      Battle!
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  )}
                </Button>
              </div>

              {error && (
                <div className="flex items-center gap-2 mt-4 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-xl p-3 border border-red-200 dark:border-red-500/20">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Battle Results */}
        <AnimatePresence>
          {theirProfile && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-6"
            >
              {/* Winner Banner */}
              {verdict && (
                <div>
                  <Card className={`relative overflow-hidden border-2 ${
                    isMyWin
                      ? 'border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10'
                      : isTie
                      ? 'border-yellow-200 dark:border-yellow-500/30 bg-yellow-50 dark:bg-yellow-500/10'
                      : 'border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/10'
                  }`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" />

                    <div className="relative p-8 md:p-12 text-center">
                      <div className="mx-auto mb-6">
                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                          isMyWin
                            ? 'bg-blue-100 dark:bg-blue-500/20'
                            : isTie
                            ? 'bg-yellow-100 dark:bg-yellow-500/20'
                            : 'bg-purple-100 dark:bg-purple-500/20'
                        }`}>
                          {isMyWin ? (
                            <Crown className="h-10 w-10 text-yellow-500" />
                          ) : isTie ? (
                            <Medal className="h-10 w-10 text-yellow-500" />
                          ) : (
                            <Trophy className="h-10 w-10 text-purple-500 dark:text-purple-400" />
                          )}
                        </div>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
                        {isMyWin ? 'Victory is Yours! 🎉' : isTie ? "It's a Tie! 🤝" : `@${verdict.winner} Wins!`}
                      </h2>

                      {!isTie && (
                        <p className="text-muted-foreground text-lg">
                          {isMyWin
                            ? `You're crushing it with a ${verdict.margin}% higher overall score!`
                            : `They're ${verdict.margin}% ahead. Time to level up your game! 💪`
                          }
                        </p>
                      )}
                    </div>
                  </Card>
                </div>
              )}

              {/* Profile Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                <Card className="relative h-full overflow-hidden border-2 border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/5 group hover:border-blue-500/50 transition-all">
                  <div className="absolute top-0 right-0 p-2">
                    <Badge className="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-300 dark:border-blue-500/30">YOU</Badge>
                  </div>
                  <div className="p-6 text-center">
                    <div className="relative mx-auto w-20 h-20 mb-4">
                      <div className="relative w-full h-full rounded-full bg-blue-100 dark:bg-blue-500/20 border-2 border-blue-300 dark:border-blue-500/30 flex items-center justify-center">
                        <Github className="h-10 w-10 text-blue-500 dark:text-blue-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-foreground mb-1">@{myProfile.username}</h3>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-3 w-3" />
                      {myProfile.totalStars} stars
                    </div>
                  </div>
                </Card>

                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="relative w-20 h-20 rounded-full bg-muted border-2 border-border flex items-center justify-center shadow-xl">
                      <span className="text-3xl font-black text-foreground">VS</span>
                    </div>
                  </div>
                </div>

                <Card className="relative h-full overflow-hidden border-2 border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/5 group hover:border-purple-500/50 transition-all">
                  <div className="absolute top-0 right-0 p-2">
                    <Badge className="bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border-purple-300 dark:border-purple-500/30">OPPONENT</Badge>
                  </div>
                  <div className="p-6 text-center">
                    <div className="relative mx-auto w-20 h-20 mb-4">
                      <div className="relative w-full h-full rounded-full bg-purple-100 dark:bg-purple-500/20 border-2 border-purple-300 dark:border-purple-500/30 flex items-center justify-center">
                        <Github className="h-10 w-10 text-purple-500 dark:text-purple-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-foreground mb-1">@{theirProfile.username}</h3>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-3 w-3" />
                      {theirProfile.totalStars} stars
                    </div>
                  </div>
                </Card>
              </div>

              {/* Battle Stats */}
              <Card className="border border-border bg-card overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center border border-blue-300 dark:border-blue-500/30">
                      <TrendingUp className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Battle Statistics</h3>
                      <p className="text-sm text-muted-foreground">Head-to-head comparison</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <StatBar label="Total Stars" a={myProfile.totalStars} b={theirProfile.totalStars} icon="⭐" index={0} />
                    <StatBar label="Public Repos" a={myProfile.repos.length} b={theirProfile.repos.length} icon="📁" index={1} />
                    <StatBar label="Languages" a={myProfile.languages.length} b={theirProfile.languages.length} icon="💻" index={2} />
                    <StatBar label="Total Forks" a={myProfile.totalForks} b={theirProfile.totalForks} icon="🍴" index={3} />
                    <StatBar label="Avg Stars/Repo" a={myProfile.avgStars} b={theirProfile.avgStars} icon="📊" index={4} />
                  </div>
                </div>
              </Card>

              {/* Top Repos & Languages */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="h-full border border-border bg-card overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-xl bg-yellow-100 dark:bg-yellow-500/10 flex items-center justify-center">
                        <Crown className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                      </div>
                      <h3 className="font-bold text-lg text-foreground">Top Repositories</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { profile: myProfile, label: 'Your Best', color: 'from-blue-500/10 to-cyan-500/5 dark:from-blue-500/20 dark:to-cyan-500/20', border: 'border-blue-200 dark:border-blue-500/30' },
                        { profile: theirProfile, label: 'Their Best', color: 'from-purple-500/10 to-pink-500/5 dark:from-purple-500/20 dark:to-pink-500/20', border: 'border-purple-200 dark:border-purple-500/30' }
                      ].map(({ profile, label, color, border }) => (
                        <div key={label} className={`p-4 rounded-2xl bg-gradient-to-br ${color} border ${border} bg-muted/30`}>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">{label}</p>
                          {profile.topRepo ? (
                            <>
                              <a href={profile.topRepo.html_url || profile.topRepo.url} target="_blank" rel="noreferrer" className="font-bold text-sm text-foreground hover:text-primary transition-colors line-clamp-1">
                                {profile.topRepo.name}
                              </a>
                              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{profile.topRepo.description || 'No description available'}</p>
                              <div className="flex items-center gap-3 mt-3">
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Star className="h-3 w-3" />
                                  {profile.topRepo.stargazers_count || profile.topRepo.stars || 0}
                                </span>
                                {profile.topRepo.language && <Badge variant="outline" className="text-[10px] px-1.5 py-0">{profile.topRepo.language}</Badge>}
                              </div>
                            </>
                          ) : (
                            <p className="text-xs text-muted-foreground">No repos found</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="h-full border border-border bg-card overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-xl bg-green-100 dark:bg-green-500/10 flex items-center justify-center">
                        <Code2 className="h-5 w-5 text-green-500 dark:text-green-400" />
                      </div>
                      <h3 className="font-bold text-lg text-foreground">Language Arsenal</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { profile: myProfile, label: 'Your Stack', color: 'text-blue-500 dark:text-blue-400' },
                        { profile: theirProfile, label: 'Their Stack', color: 'text-purple-500 dark:text-purple-400' }
                      ].map(({ profile, label, color }) => (
                        <div key={label} className="space-y-3">
                          <p className={`text-xs font-semibold uppercase tracking-wide ${color}`}>{label}</p>
                          <div className="flex flex-wrap gap-2">
                            {profile.languages.slice(0, 10).map((lang, i) => (
                              <Badge key={i} variant="secondary" className="bg-muted/50 border-border hover:bg-muted transition-colors">
                                {lang}
                              </Badge>
                            ))}
                            {profile.languages.length === 0 && <p className="text-xs text-muted-foreground">No languages detected</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => { setTheirProfile(null); setTheirUsername(''); setBattleStarted(false); setError('') }}
                  className="group border-border hover:border-primary/30 bg-muted/50 rounded-2xl"
                >
                  <Swords className="h-5 w-5 mr-2" />
                  Battle Someone Else
                </Button>

                <Button
                  size="lg"
                  onClick={() => router.push('/dashboard/roast')}
                  className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl shadow-xl shadow-orange-500/25"
                >
                  <Flame className="h-5 w-5 mr-2" />
                  Get Your Portfolio Roasted
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}