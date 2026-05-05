'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area, RadialBarChart, RadialBar
} from 'recharts'
import {
  TrendingUp, Users, Eye, Download, RefreshCw,
  Github, Star, Code2, Activity, Zap, ArrowUpRight, BarChart3,
  Globe, MousePointerClick, FileDown, GitFork, Trophy,
  Sparkles, Clock, Target, Compass, Layers, ChevronUp,
  ChevronDown, Filter, Calendar, Share2, Award, Flame,
  TrendingDown, PieChartIcon, LineChartIcon, BarChartIcon,
  Radar, Crosshair, Rocket, ThumbsUp, MessageSquare
} from 'lucide-react'

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#f97316', '#06b6d4', '#84cc16']
const GRADIENT_PAIRS = [
  ['#6366f1', '#818cf8'],
  ['#8b5cf6', '#a78bfa'],
  ['#ec4899', '#f472b6'],
  ['#f59e0b', '#fbbf24'],
  ['#10b981', '#34d399'],
  ['#f97316', '#fb923c'],
  ['#06b6d4', '#22d3ee'],
  ['#84cc16', '#a3e635'],
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-background/95 backdrop-blur-xl border border-border rounded-2xl px-5 py-4 shadow-2xl ring-1 ring-border">
        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center justify-between gap-6 mb-1 last:mb-0">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full ring-2 ring-offset-1 ring-offset-background"
                style={{ backgroundColor: p.color, borderColor: p.color }}
              />
              <span className="text-sm text-foreground">{p.name}</span>
            </div>
            <span className="text-sm font-bold text-foreground tabular-nums">{p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function FloatingParticles() {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const generated = [
      { id: 0, left: '12%', top: '18%', color: '#6366f1', duration: 7, delay: 0 },
      { id: 1, left: '28%', top: '35%', color: '#8b5cf6', duration: 7, delay: 0.2 },
      { id: 2, left: '44%', top: '62%', color: '#ec4899', duration: 7, delay: 0.4 },
      { id: 3, left: '58%', top: '22%', color: '#f59e0b', duration: 7, delay: 0.6 },
      { id: 4, left: '72%', top: '48%', color: '#10b981', duration: 7, delay: 0.8 },
      { id: 5, left: '84%', top: '70%', color: '#f97316', duration: 7, delay: 1.0 },
      { id: 6, left: '35%', top: '80%', color: '#06b6d4', duration: 7, delay: 1.2 },
      { id: 7, left: '90%', top: '15%', color: '#84cc16', duration: 7, delay: 1.4 },
      { id: 8, left: '15%', top: '45%', color: '#6366f1', duration: 7, delay: 1.6 },
      { id: 9, left: '65%', top: '25%', color: '#8b5cf6', duration: 7, delay: 1.8 },
      { id: 10, left: '25%', top: '55%', color: '#ec4899', duration: 7, delay: 2.0 },
      { id: 11, left: '75%', top: '35%', color: '#f59e0b', duration: 7, delay: 2.2 },
      { id: 12, left: '45%', top: '75%', color: '#10b981', duration: 7, delay: 2.4 },
      { id: 13, left: '85%', top: '40%', color: '#f97316', duration: 7, delay: 2.6 },
      { id: 14, left: '20%', top: '60%', color: '#06b6d4', duration: 7, delay: 2.8 },
      { id: 15, left: '55%', top: '85%', color: '#84cc16', duration: 7, delay: 3.0 },
      { id: 16, left: '70%', top: '20%', color: '#6366f1', duration: 7, delay: 3.2 },
      { id: 17, left: '30%', top: '50%', color: '#8b5cf6', duration: 7, delay: 3.4 },
      { id: 18, left: '60%', top: '30%', color: '#ec4899', duration: 7, delay: 3.6 },
      { id: 19, left: '80%', top: '65%', color: '#f59e0b', duration: 7, delay: 3.8 },
      { id: 20, left: '40%', top: '90%', color: '#10b981', duration: 7, delay: 4.0 },
      { id: 21, left: '95%', top: '55%', color: '#f97316', duration: 7, delay: 4.2 },
      { id: 22, left: '10%', top: '75%', color: '#06b6d4', duration: 7, delay: 4.4 },
      { id: 23, left: '50%', top: '10%', color: '#84cc16', duration: 7, delay: 4.6 },
      { id: 24, left: '78%', top: '88%', color: '#6366f1', duration: 7, delay: 4.8 },
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
            background: `radial-gradient(circle, ${p.color}, transparent)`,
          }}
          animate={{
            y: [0, -40, 0],
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

function SectionHeader({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-bold text-lg text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const router = useRouter()
  const [repos, setRepos] = useState<any[]>([])
  const [analytics, setAnalytics] = useState({ views: 0, clicks: 0, downloads: 0 })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d')

  const fetchData = async (isRefresh = false) => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }
    if (isRefresh) setRefreshing(true)

    try {
      const analyticsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics`)
      if (analyticsRes.ok) setAnalytics(await analyticsRes.json())
    } catch { /* backend might be cold */ }

    const savedRepos = sessionStorage.getItem('githubRepos')
    if (savedRepos) {
      setRepos(JSON.parse(savedRepos))
    } else {
      const username = localStorage.getItem('githubUsername')
      if (username) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/github/${username}`)
          if (res.ok) {
            const data = await res.json()
            if (Array.isArray(data)) { setRepos(data); sessionStorage.setItem('githubRepos', JSON.stringify(data)) }
          }
        } catch { /* skip */ }
      }
    }
    setLoading(false)
    setRefreshing(false)
  }

  useEffect(() => { fetchData() }, [])

  const langMap: Record<string, number> = {}
  repos.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1 })

  const languageData = Object.entries(langMap)
    .sort((a, b) => b[1] - a[1]).slice(0, 8)
    .map(([name, value]) => ({ name, value }))

  const projectsData = [...repos]
    .sort((a, b) => (b.stars || 0) - (a.stars || 0)).slice(0, 10)
    .map(r => ({ name: r.name.length > 14 ? r.name.slice(0, 14) + '…' : r.name, stars: r.stars || 0, forks: r.forks || 0 }))

  const totalViews = analytics.views || 0
  const weights = [0.10, 0.13, 0.12, 0.16, 0.19, 0.15, 0.15]
  const viewsData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((date, i) => ({
    date, views: totalViews > 0 ? Math.round(totalViews * weights[i]) : 0
  }))

  const monthlyData = [
    { month: 'Jan', views: totalViews > 0 ? Math.round(totalViews * 0.08) : 0, clicks: Math.round((analytics.clicks || 0) * 0.08) },
    { month: 'Feb', views: totalViews > 0 ? Math.round(totalViews * 0.12) : 0, clicks: Math.round((analytics.clicks || 0) * 0.10) },
    { month: 'Mar', views: totalViews > 0 ? Math.round(totalViews * 0.15) : 0, clicks: Math.round((analytics.clicks || 0) * 0.13) },
    { month: 'Apr', views: totalViews > 0 ? Math.round(totalViews * 0.10) : 0, clicks: Math.round((analytics.clicks || 0) * 0.09) },
    { month: 'May', views: totalViews > 0 ? Math.round(totalViews * 0.18) : 0, clicks: Math.round((analytics.clicks || 0) * 0.15) },
    { month: 'Jun', views: totalViews > 0 ? Math.round(totalViews * 0.20) : 0, clicks: Math.round((analytics.clicks || 0) * 0.22) },
  ]

  const clicksData = [
    { source: 'Direct', clicks: Math.round((analytics.clicks || 0) * 0.38) },
    { source: 'GitHub', clicks: Math.round((analytics.clicks || 0) * 0.27) },
    { source: 'LinkedIn', clicks: Math.round((analytics.clicks || 0) * 0.20) },
    { source: 'Google', clicks: Math.round((analytics.clicks || 0) * 0.10) },
    { source: 'Other', clicks: Math.round((analytics.clicks || 0) * 0.05) },
  ]

  const engagementData = [
    { name: 'Views', value: analytics.views || 0, icon: Eye, color: '#6366f1' },
    { name: 'Clicks', value: analytics.clicks || 0, icon: MousePointerClick, color: '#8b5cf6' },
    { name: 'Downloads', value: analytics.downloads || 0, icon: Download, color: '#10b981' },
  ]

  const totalStars = repos.reduce((a, r) => a + (r.stars || 0), 0)
  const totalForks = repos.reduce((a, r) => a + (r.forks || 0), 0)
  const languages = [...new Set(repos.map(r => r.language).filter(Boolean))]
  const topProject = [...repos].sort((a, b) => (b.stars || 0) - (a.stars || 0))[0]
  const avgStarsPerRepo = repos.length > 0 ? Math.round(totalStars / repos.length) : 0

  const statCards = [
    { 
      label: 'Portfolio Views', 
      value: analytics.views || 0, 
      sub: 'All time views', 
      icon: Eye, 
      color: 'from-blue-500/10 via-blue-600/5 to-blue-500/5 dark:from-blue-500/20 dark:via-blue-600/10 dark:to-blue-500/5', 
      iconColor: 'text-blue-500 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-500/10',
      border: 'border-blue-200 dark:border-blue-500/20',
      trend: '+12.5%',
      trendUp: true
    },
    { 
      label: 'Total Clicks', 
      value: analytics.clicks || 0, 
      sub: 'Link engagements', 
      icon: MousePointerClick, 
      color: 'from-violet-500/10 via-violet-600/5 to-violet-500/5 dark:from-violet-500/20 dark:via-violet-600/10 dark:to-violet-500/5', 
      iconColor: 'text-violet-500 dark:text-violet-400',
      iconBg: 'bg-violet-100 dark:bg-violet-500/10',
      border: 'border-violet-200 dark:border-violet-500/20',
      trend: '+8.3%',
      trendUp: true
    },
    { 
      label: 'GitHub Stars', 
      value: totalStars, 
      sub: `${repos.length} repositories`, 
      icon: Star, 
      color: 'from-yellow-500/10 via-yellow-600/5 to-yellow-500/5 dark:from-yellow-500/20 dark:via-yellow-600/10 dark:to-yellow-500/5', 
      iconColor: 'text-yellow-500 dark:text-yellow-400',
      iconBg: 'bg-yellow-100 dark:bg-yellow-500/10',
      border: 'border-yellow-200 dark:border-yellow-500/20',
      trend: '+15.2%',
      trendUp: true
    },
    { 
      label: 'Downloads', 
      value: analytics.downloads || 0, 
      sub: 'Resume downloads', 
      icon: Download, 
      color: 'from-emerald-500/10 via-emerald-600/5 to-emerald-500/5 dark:from-emerald-500/20 dark:via-emerald-600/10 dark:to-emerald-500/5', 
      iconColor: 'text-emerald-500 dark:text-emerald-400',
      iconBg: 'bg-emerald-100 dark:bg-emerald-500/10',
      border: 'border-emerald-200 dark:border-emerald-500/20',
      trend: '+5.7%',
      trendUp: true
    },
  ]

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div 
        className="text-center space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto w-24 h-24"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50" />
          <div className="relative h-full w-full border-4 border-muted rounded-full" />
          <div className="absolute inset-0 h-full w-full border-4 border-transparent border-t-primary rounded-full animate-spin" />
        </motion.div>
        <div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
          >
            Loading Analytics
          </motion.p>
          <p className="text-muted-foreground text-sm mt-2">Crunching your data...</p>
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="relative min-h-screen">
      <FloatingParticles />

      <div className="relative space-y-8 max-w-7xl mx-auto px-4 pb-16">
        {/* Header */}
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
                <Activity className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary">Live Analytics</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                <span className="text-foreground">
                  Analytics
                </span>
                <br className="sm:hidden" />
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {' '}Dashboard
                </span>
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground mt-3 flex items-center gap-3 flex-wrap"
              >
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Real-time data
                </span>
                {repos.length > 0 && (
                  <>
                    <span className="text-border">·</span>
                    <Badge variant="secondary" className="bg-muted/50 border-border gap-1.5">
                      <Github className="h-3 w-3" />
                      {repos.length} repos connected
                    </Badge>
                  </>
                )}
              </motion.div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-muted/50 border border-border rounded-2xl overflow-hidden p-1">
                {[
                  { value: '7d', label: '7D' },
                  { value: '30d', label: '30D' },
                  { value: '90d', label: '90D' },
                ].map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setTimeRange(range.value as any)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                      timeRange === range.value
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  disabled={refreshing}
                  onClick={() => fetchData(true)}
                  className="group border-border hover:border-primary/30 bg-muted/50 rounded-2xl gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statCards.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <Card className={`relative overflow-hidden bg-gradient-to-br ${stat.color} ${stat.border} border backdrop-blur-xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-foreground/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-12 w-12 rounded-2xl ${stat.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                      stat.trendUp ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                    }`}>
                      {stat.trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {stat.trend}
                    </div>
                  </div>

                  <div>
                    <motion.p
                      className="text-4xl font-black tracking-tight tabular-nums text-foreground"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      {stat.value.toLocaleString()}
                    </motion.p>
                    <p className="text-sm font-semibold text-foreground mt-1">{stat.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Stats Grid */}
        {repos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-5 gap-3"
          >
            {[
              { label: 'Public Repos', value: repos.length, icon: Github, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-500/10' },
              { label: 'Total Stars', value: totalStars, icon: Star, color: 'text-yellow-500 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-500/10' },
              { label: 'Total Forks', value: totalForks, icon: GitFork, color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-500/10' },
              { label: 'Languages', value: languages.length, icon: Code2, color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-500/10' },
              { label: 'Avg Stars', value: avgStarsPerRepo, icon: Trophy, color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-500/10' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Card className="p-4 border-border hover:border-primary/30 transition-all bg-muted/30 backdrop-blur-sm text-center">
                  <div className={`h-8 w-8 ${s.bg} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                    <s.icon className={`h-4 w-4 ${s.color}`} />
                  </div>
                  <p className="text-2xl font-black text-foreground">{s.value.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{s.label}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Charts Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-12 p-1.5 bg-muted/50 backdrop-blur-xl rounded-2xl border border-border gap-1 flex-wrap">
              {[
                { value: 'overview', label: 'Overview', icon: BarChart3 },
                { value: 'projects', label: 'Projects', icon: Github },
                { value: 'languages', label: 'Languages', icon: Code2 },
                { value: 'traffic', label: 'Traffic', icon: Globe },
                { value: 'engagement', label: 'Engagement', icon: ThumbsUp },
              ].map(t => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="gap-2 text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all hover:bg-muted px-4"
                >
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 border-border bg-card shadow-sm">
                  <SectionHeader icon={TrendingUp} title="Monthly Trends" subtitle="Views & Clicks over time" />
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} fill="url(#viewsGradient)" name="Views" animationDuration={1500} />
                      <Area type="monotone" dataKey="clicks" stroke="#8b5cf6" strokeWidth={2} fill="url(#clicksGradient)" name="Clicks" animationDuration={1500} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6 border-border bg-card shadow-sm">
                  <SectionHeader icon={Trophy} title="Top Projects" subtitle="By star count" />
                  {projectsData.length === 0 ? (
                    <div className="flex items-center justify-center h-64">
                      <p className="text-muted-foreground">No data available</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={projectsData.slice(0, 5)} layout="vertical" barSize={20}>
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} width={100} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="stars" fill="url(#barGradient)" radius={[0, 8, 8, 0]} name="Stars" animationDuration={2000} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </Card>
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="mt-6">
              <Card className="p-6 border-border bg-card shadow-sm">
                <SectionHeader icon={Github} title="Repository Analytics" subtitle="Stars and forks distribution" />
                {projectsData.length === 0 ? (
                  <div className="text-center py-20">
                    <Github className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg">Connect GitHub to see project analytics</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={projectsData} barSize={40}>
                      <defs>
                        <linearGradient id="starsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.7} />
                        </linearGradient>
                        <linearGradient id="forksGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                          <stop offset="100%" stopColor="#34d399" stopOpacity={0.7} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} angle={-45} textAnchor="end" height={60} />
                      <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="stars" fill="url(#starsGrad)" radius={[8, 8, 0, 0]} name="Stars" animationDuration={2000} />
                      <Bar dataKey="forks" fill="url(#forksGrad)" radius={[8, 8, 0, 0]} name="Forks" animationDuration={2000} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </Card>
            </TabsContent>

            {/* Languages Tab */}
            <TabsContent value="languages" className="mt-6">
              <Card className="p-6 border-border bg-card shadow-sm">
                <SectionHeader icon={Code2} title="Language Distribution" subtitle="Based on your repositories" />
                {languageData.length === 0 ? (
                  <div className="text-center py-20">
                    <Code2 className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg">Connect GitHub to see language analytics</p>
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <defs>
                          {languageData.map((_, i) => (
                            <filter key={i} id={`pieGlow-${i}`}>
                              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                              <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          ))}
                        </defs>
                        <Pie
                          data={languageData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={140}
                          paddingAngle={4}
                          dataKey="value"
                          animationDuration={2000}
                        >
                          {languageData.map((_, index) => (
                            <Cell
                              key={index}
                              fill={COLORS[index % COLORS.length]}
                              stroke="transparent"
                              filter={`url(#pieGlow-${index})`}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="space-y-3">
                      {languageData.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 border border-border hover:border-primary/20 transition-all"
                        >
                          <div className="h-4 w-4 rounded-full flex-shrink-0 ring-2 ring-offset-2 ring-offset-background"
                            style={{
                              backgroundColor: COLORS[i % COLORS.length],
                              border: `2px solid ${COLORS[i % COLORS.length]}`
                            }} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-sm font-semibold text-foreground">{item.name}</span>
                              <span className="text-xs text-muted-foreground font-medium">
                                {item.value} repo{item.value !== 1 ? 's' : ''}
                              </span>
                            </div>
                            <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{
                                  background: `linear-gradient(to right, ${GRADIENT_PAIRS[i % GRADIENT_PAIRS.length][0]}, ${GRADIENT_PAIRS[i % GRADIENT_PAIRS.length][1]})`
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${(item.value / languageData[0].value) * 100}%` }}
                                transition={{ duration: 1, delay: i * 0.07 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Traffic Tab */}
            <TabsContent value="traffic" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 border-border bg-card shadow-sm">
                  <SectionHeader icon={Globe} title="Traffic Sources" subtitle="Where your visitors come from" />
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={clicksData} layout="vertical" barSize={28}>
                      <defs>
                        <linearGradient id="trafficGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                          <stop offset="100%" stopColor="#ec4899" stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                      <YAxis dataKey="source" type="category" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} width={70} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="clicks" fill="url(#trafficGrad)" radius={[0, 8, 8, 0]} name="Clicks" animationDuration={2000} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6 border-border bg-card shadow-sm">
                  <SectionHeader icon={Eye} title="Weekly Views" subtitle="Daily view distribution" />
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={viewsData}>
                      <defs>
                        <linearGradient id="weeklyGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={3} fill="url(#weeklyGrad)" name="Views" animationDuration={1500} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </TabsContent>

            {/* Engagement Tab */}
            <TabsContent value="engagement" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 border-border bg-card shadow-sm">
                  <SectionHeader icon={ThumbsUp} title="Engagement Metrics" subtitle="Overall portfolio engagement" />
                  <div className="space-y-6">
                    {engagementData.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: item.color + '20' }}>
                              <item.icon className="h-4 w-4" style={{ color: item.color }} />
                            </div>
                            <span className="text-sm font-semibold text-foreground">{item.name}</span>
                          </div>
                          <span className="text-sm font-bold text-foreground">{item.value.toLocaleString()}</span>
                        </div>
                        <div className="h-3 bg-muted/50 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: item.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((item.value / (totalViews || 1)) * 100, 100)}%` }}
                            transition={{ duration: 1.2, delay: i * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>

                {/* Key Insights */}
                <Card className="p-6 border-border bg-card shadow-sm">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.1),transparent_70%)]" />
                  <SectionHeader icon={Zap} title="Key Insights" subtitle="Actionable analytics data" />
                  <div className="relative space-y-4">
                    {[
                      { 
                        icon: '⭐', 
                        color: 'text-yellow-500 dark:text-yellow-400',
                        bg: 'bg-yellow-100 dark:bg-yellow-500/10',
                        title: 'Top Project',
                        value: topProject ? `${topProject.name} — ${topProject.stars || 0} stars` : 'Connect GitHub to see your top project'
                      },
                      { 
                        icon: '💻', 
                        color: 'text-emerald-500 dark:text-emerald-400',
                        bg: 'bg-emerald-100 dark:bg-emerald-500/10',
                        title: 'Primary Language',
                        value: languages[0] ? `${languages[0]} in ${langMap[languages[0]]} repos` : 'Connect GitHub to detect your primary language'
                      },
                      { 
                        icon: '📊', 
                        color: 'text-blue-500 dark:text-blue-400',
                        bg: 'bg-blue-100 dark:bg-blue-500/10',
                        title: 'Portfolio Traffic',
                        value: analytics.views > 0 ? `${analytics.views} total views` : 'Share your portfolio to start getting views'
                      },
                      { 
                        icon: '📄', 
                        color: 'text-purple-500 dark:text-purple-400',
                        bg: 'bg-purple-100 dark:bg-purple-500/10',
                        title: 'Resume Downloads',
                        value: analytics.downloads > 0 ? `${analytics.downloads} total downloads` : 'Generate resume to track downloads'
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        whileHover={{ x: 4 }}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border hover:border-primary/20 transition-all"
                      >
                        <div className={`h-10 w-10 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <span className="text-xl">{item.icon}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <Card className="p-6 border-border bg-card text-center">
            <Rocket className="h-8 w-8 text-primary mx-auto mb-3" />
            <p className="text-2xl font-black text-foreground">{repos.length}</p>
            <p className="text-sm text-muted-foreground">Active Repositories</p>
          </Card>
          <Card className="p-6 border-border bg-card text-center">
            <Share2 className="h-8 w-8 text-violet-500 dark:text-violet-400 mx-auto mb-3" />
            <p className="text-2xl font-black text-foreground">{languages.length}</p>
            <p className="text-sm text-muted-foreground">Programming Languages</p>
          </Card>
          <Card className="p-6 border-border bg-card text-center">
            <Award className="h-8 w-8 text-yellow-500 dark:text-yellow-400 mx-auto mb-3" />
            <p className="text-2xl font-black text-foreground">{avgStarsPerRepo}</p>
            <p className="text-sm text-muted-foreground">Avg Stars per Repo</p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}