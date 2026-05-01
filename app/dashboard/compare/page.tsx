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
  Crosshair, SwordsIcon, Medal, Sparkles, ArrowRight,
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
            winner === 'left' ? 'text-blue-400' : 'text-muted-foreground'
          }`}>
            {a.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground/50">vs</span>
          <span className={`text-sm font-bold tabular-nums ${
            winner === 'right' ? 'text-purple-400' : 'text-muted-foreground'
          }`}>
            {b.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="relative h-4 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
        {/* Left bar */}
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

        {/* Right bar */}
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

        {/* Center divider */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20 transform -translate-x-1/2" />

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {winner !== 'tie' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className={`text-xs ${
            winner === 'left' ? 'text-blue-400' : 'text-purple-400'
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
    const generated = [...Array(30)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      background: i % 2 === 0 ? '#3b82f6' : '#8b5cf6',
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
      const res = await fetch(`http://localhost:5000/api/github/${theirUsername.trim()}`)
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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30"
          >
            <Github className="h-12 w-12 text-blue-400" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Connect GitHub First</h2>
            <p className="text-muted-foreground mb-4">
              Go to your Dashboard and connect your GitHub account to start battling!
            </p>
            <Button onClick={() => router.push('/dashboard')} className="bg-gradient-to-r from-blue-500 to-purple-500">
              <ArrowRight className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <FloatingParticles />

      <div className="relative space-y-8 max-w-5xl mx-auto px-4 pb-16">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative pt-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />

          <div className="relative text-center space-y-4 py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-full px-6 py-2 border border-blue-500/30 shadow-lg shadow-blue-500/10"
            >
              <Swords className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-300">GitHub Battle Arena</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                GitHub
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Battle ⚔️
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Challenge any developer and compare your GitHub stats in real-time
            </motion.p>
          </div>
        </motion.div>

        {/* Challenge Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden border-2 border-blue-500/20 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />

            <div className="relative p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <Crosshair className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Challenge an Opponent</h3>
                  <p className="text-sm text-muted-foreground">Enter their GitHub username to start the battle</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Github className="h-5 w-5 text-muted-foreground group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <Input
                    className="pl-12 h-14 text-lg bg-white/5 border-white/10 focus:border-blue-500/50 focus:bg-white/10 transition-all rounded-2xl"
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
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-4 text-red-400 bg-red-500/10 rounded-xl p-3"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>

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
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <Card className={`relative overflow-hidden border-2 ${
                    isMyWin
                      ? 'border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/5'
                      : isTie
                      ? 'border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-amber-500/5'
                      : 'border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/5'
                  } backdrop-blur-xl`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" />

                    <div className="relative p-8 md:p-12 text-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mx-auto mb-6"
                      >
                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                          isMyWin
                            ? 'bg-blue-500/20'
                            : isTie
                            ? 'bg-yellow-500/20'
                            : 'bg-purple-500/20'
                        }`}>
                          {isMyWin ? (
                            <Crown className="h-10 w-10 text-yellow-400" />
                          ) : isTie ? (
                            <Medal className="h-10 w-10 text-yellow-400" />
                          ) : (
                            <Trophy className="h-10 w-10 text-purple-400" />
                          )}
                        </div>
                      </motion.div>

                      <h2 className="text-3xl md:text-4xl font-black mb-3">
                        {isMyWin ? (
                          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Victory is Yours! 🎉
                          </span>
                        ) : isTie ? (
                          <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                            It's a Tie! 🤝
                          </span>
                        ) : (
                          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            @{verdict.winner} Wins!
                          </span>
                        )}
                      </h2>

                      {!isTie && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-muted-foreground text-lg"
                        >
                          {isMyWin
                            ? `You're crushing it with a ${verdict.margin}% higher overall score!`
                            : `They're ${verdict.margin}% ahead. Time to level up your game! 💪`
                          }
                        </motion.p>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Profile Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                {/* My Profile */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="relative h-full overflow-hidden border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group hover:border-blue-500/50 transition-all">
                    <div className="absolute top-0 right-0 p-2">
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">YOU</Badge>
                    </div>
                    <div className="p-6 text-center">
                      <div className="relative mx-auto w-20 h-20 mb-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/30 flex items-center justify-center">
                          <Github className="h-10 w-10 text-blue-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-black mb-1">@{myProfile.username}</h3>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-3 w-3" />
                        {myProfile.totalStars} stars
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* VS Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.4 }}
                  className="flex items-center justify-center"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-4 rounded-full border-2 border-dashed border-white/10"
                    />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-white/20 flex items-center justify-center shadow-2xl">
                      <span className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        VS
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Opponent Profile */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="relative h-full overflow-hidden border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-xl group hover:border-purple-500/50 transition-all">
                    <div className="absolute top-0 right-0 p-2">
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">OPPONENT</Badge>
                    </div>
                    <div className="p-6 text-center">
                      <div className="relative mx-auto w-20 h-20 mb-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 flex items-center justify-center">
                          <Github className="h-10 w-10 text-purple-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-black mb-1">@{theirProfile.username}</h3>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-3 w-3" />
                        {theirProfile.totalStars} stars
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Battle Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl overflow-hidden">
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30">
                        <TrendingUp className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Battle Statistics</h3>
                        <p className="text-sm text-muted-foreground">Head-to-head comparison</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <StatBar
                        label="Total Stars"
                        a={myProfile.totalStars}
                        b={theirProfile.totalStars}
                        icon="⭐"
                        index={0}
                      />
                      <StatBar
                        label="Public Repos"
                        a={myProfile.repos.length}
                        b={theirProfile.repos.length}
                        icon="📁"
                        index={1}
                      />
                      <StatBar
                        label="Languages"
                        a={myProfile.languages.length}
                        b={theirProfile.languages.length}
                        icon="💻"
                        index={2}
                      />
                      <StatBar
                        label="Total Forks"
                        a={myProfile.totalForks}
                        b={theirProfile.totalForks}
                        icon="🍴"
                        index={3}
                      />
                      <StatBar
                        label="Avg Stars/Repo"
                        a={myProfile.avgStars}
                        b={theirProfile.avgStars}
                        icon="📊"
                        index={4}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Top Repos & Languages */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Top Repos */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="h-full border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                          <Crown className="h-5 w-5 text-yellow-400" />
                        </div>
                        <h3 className="font-bold text-lg">Top Repositories</h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { profile: myProfile, label: 'Your Best', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30' },
                          { profile: theirProfile, label: 'Their Best', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30' }
                        ].map(({ profile, label, color, border }) => (
                          <div key={label} className={`p-4 rounded-2xl bg-gradient-to-br ${color} border ${border} backdrop-blur-sm`}>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                              {label}
                            </p>
                            {profile.topRepo ? (
                              <>
                                <a
                                  href={profile.topRepo.html_url || profile.topRepo.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-bold text-sm hover:text-primary transition-colors line-clamp-1"
                                >
                                  {profile.topRepo.name}
                                </a>
                                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                                  {profile.topRepo.description || 'No description available'}
                                </p>
                                <div className="flex items-center gap-3 mt-3">
                                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Star className="h-3 w-3" />
                                    {profile.topRepo.stargazers_count || profile.topRepo.stars || 0}
                                  </span>
                                  {profile.topRepo.language && (
                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                      {profile.topRepo.language}
                                    </Badge>
                                  )}
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
                </motion.div>

                {/* Language Arsenal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="h-full border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                          <Code2 className="h-5 w-5 text-green-400" />
                        </div>
                        <h3 className="font-bold text-lg">Language Arsenal</h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { profile: myProfile, label: 'Your Stack', color: 'text-blue-400' },
                          { profile: theirProfile, label: 'Their Stack', color: 'text-purple-400' }
                        ].map(({ profile, label, color }) => (
                          <div key={label} className="space-y-3">
                            <p className={`text-xs font-semibold uppercase tracking-wide ${color}`}>
                              {label}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {profile.languages.slice(0, 10).map((lang, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.05 }}
                                >
                                  <Badge
                                    variant="secondary"
                                    className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors"
                                  >
                                    {lang}
                                  </Badge>
                                </motion.div>
                              ))}
                              {profile.languages.length === 0 && (
                                <p className="text-xs text-muted-foreground">No languages detected</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3 justify-center"
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setTheirProfile(null)
                    setTheirUsername('')
                    setBattleStarted(false)
                    setError('')
                  }}
                  className="group border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-sm rounded-2xl"
                >
                  <Swords className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Battle Someone Else
                </Button>

                <Button
                  size="lg"
                  onClick={() => router.push('/dashboard/roast')}
                  className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl shadow-xl shadow-orange-500/25"
                >
                  <Flame className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Get Your Portfolio Roasted
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}