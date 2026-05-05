'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import {
  ArrowRight, Github, Eye, Download, Users, X, Search,
  Star, GitFork, ExternalLink, Sparkles, Zap, TrendingUp,
  Rocket, Palette, FileText, BarChart3, Layers, Globe,
  Trophy, Code2, Briefcase, GraduationCap, Activity,
  ChevronRight, CheckCircle2, AlertCircle
} from 'lucide-react'

function FloatingParticles() {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const generated = [
      { id: 0, left: '12%', top: '18%', color: '#6366f1', duration: 7, delay: 0, size: 1 },
      { id: 1, left: '28%', top: '35%', color: '#8b5cf6', duration: 7, delay: 0.2, size: 1 },
      { id: 2, left: '44%', top: '62%', color: '#06b6d4', duration: 7, delay: 0.4, size: 1 },
      { id: 3, left: '58%', top: '22%', color: '#6366f1', duration: 7, delay: 0.6, size: 1 },
      { id: 4, left: '72%', top: '48%', color: '#8b5cf6', duration: 7, delay: 0.8, size: 1 },
      { id: 5, left: '84%', top: '70%', color: '#06b6d4', duration: 7, delay: 1.0, size: 1 },
      { id: 6, left: '35%', top: '80%', color: '#6366f1', duration: 7, delay: 1.2, size: 1 },
      { id: 7, left: '90%', top: '15%', color: '#8b5cf6', duration: 7, delay: 1.4, size: 1 },
      { id: 8, left: '15%', top: '45%', color: '#06b6d4', duration: 7, delay: 1.6, size: 1 },
      { id: 9, left: '65%', top: '25%', color: '#6366f1', duration: 7, delay: 1.8, size: 1 },
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
            y: [0, -15, 0],
            opacity: [0, 0.3, 0],
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

export default function DashboardPage() {
  const router = useRouter();
  const [repos, setRepos] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [analytics, setAnalytics] = useState({ views: 0, clicks: 0, downloads: 0 });
  const [loading, setLoading] = useState(true);
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [githubUsername, setGithubUsername] = useState("");
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState("");
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);

      const savedRepos = sessionStorage.getItem("githubRepos");
      const savedUsername = localStorage.getItem("githubUsername");

      if (savedRepos) {
        setRepos(JSON.parse(savedRepos));
        setLoading(false);
      } else if (savedUsername) {
        loadGithubRepos(savedUsername).then(() => setLoading(false));
      } else {
        setLoading(false);
        setShowGithubModal(true);
      }

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics`)
        .then(res => res.ok ? res.json() : { views: 0, clicks: 0, downloads: 0 })
        .then(data => setAnalytics(data))
        .catch(() => setAnalytics({ views: 0, clicks: 0, downloads: 0 }));
    } else {
      setLoading(false);
      setShowGithubModal(true);
    }
  }, [router]);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadGithubRepos = async (username: string) => {
    setGithubLoading(true);
    setGithubError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/github/${username}`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No public repositories found");
      }
      setRepos(data);
      sessionStorage.setItem("githubRepos", JSON.stringify(data));
      localStorage.setItem("githubUsername", username);
      setShowGithubModal(false);
      showToast(`${data.length} repositories loaded successfully!`);
      return data;
    } catch (err: any) {
      setGithubError(err.message || "Failed to fetch repositories");
      return [];
    } finally {
      setGithubLoading(false);
    }
  };

  const handleGithubConnect = async () => {
    if (!githubUsername.trim()) {
      setGithubError("Please enter a GitHub username");
      return;
    }
    await loadGithubRepos(githubUsername.trim());
  };

  const totalStars = repos.reduce((acc, repo) => acc + (repo.stars || 0), 0);
  const totalForks = repos.reduce((acc, repo) => acc + (repo.forks || 0), 0);
  const languages = [...new Set(repos.map(r => r.language).filter(Boolean))];
  const topRepo = [...repos].sort((a, b) => (b.stars || 0) - (a.stars || 0))[0];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center space-y-6">
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full blur-xl opacity-50" />
            <div className="relative h-full w-full border-4 border-primary/20 rounded-full" />
            <div className="absolute inset-0 h-full w-full border-4 border-transparent border-t-primary rounded-full animate-spin" />
          </div>
          <p className="text-lg font-semibold text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <FloatingParticles />

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
            {toast.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* GitHub Connect Modal */}
      <AnimatePresence>
        {showGithubModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md bg-background border-2 border-border rounded-3xl p-8 shadow-2xl backdrop-blur-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_70%)] rounded-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <Github className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Connect GitHub</h2>
                      <p className="text-xs text-muted-foreground">Import your repositories</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowGithubModal(false)}
                    className="h-10 w-10 rounded-xl hover:bg-muted flex items-center justify-center transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Enter your GitHub username to automatically import all your public repositories into your dashboard.
                </p>

                <div className="space-y-4">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="e.g. torvalds"
                      value={githubUsername}
                      onChange={(e) => { setGithubUsername(e.target.value); setGithubError(""); }}
                      className="pl-12 h-12 bg-muted/50 border-border focus:border-primary/50 rounded-xl text-sm"
                      onKeyDown={(e) => e.key === 'Enter' && handleGithubConnect()}
                      autoFocus
                    />
                  </div>

                  {githubError && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/5 border border-destructive/20">
                      <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                      <p className="text-sm text-destructive">{githubError}</p>
                    </div>
                  )}

                  <Button
                    className="w-full h-12 bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-xl text-sm font-semibold"
                    onClick={handleGithubConnect}
                    disabled={githubLoading}
                  >
                    {githubLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Loading repositories...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        Load My Repositories
                      </span>
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full rounded-xl"
                    onClick={() => setShowGithubModal(false)}
                  >
                    Skip for now
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative space-y-8 max-w-7xl mx-auto px-4 pb-16">
        {/* Welcome Header */}
        <div className="relative pt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-violet-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />

          <div className="relative py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 backdrop-blur-xl rounded-full px-4 py-1.5 border border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/10 mb-4">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold text-primary">Dashboard</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                  <span className="text-foreground">
                    Welcome back,
                  </span>
                  <br className="sm:hidden" />
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                    {' '}{user?.name?.split(' ')[0] || 'Developer'} 👋
                  </span>
                </h1>
                <p className="text-muted-foreground mt-3 text-sm">
                  Here's your portfolio overview and quick actions
                </p>
              </div>

              {!repos.length && (
                <Button
                  onClick={() => setShowGithubModal(true)}
                  className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-2xl gap-2"
                >
                  <Github className="h-4 w-4" />
                  Connect GitHub
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Portfolio Views', value: analytics.views, sub: 'All time', icon: Eye, color: 'from-blue-500/10 via-blue-600/5 to-blue-500/5 dark:from-blue-500/20 dark:via-blue-600/10 dark:to-blue-500/5', iconColor: 'text-blue-500 dark:text-blue-400', iconBg: 'bg-blue-100 dark:bg-blue-500/10', border: 'border-blue-200 dark:border-blue-500/20' },
            { label: 'Link Clicks', value: analytics.clicks, sub: 'Total clicks', icon: TrendingUp, color: 'from-violet-500/10 via-violet-600/5 to-violet-500/5 dark:from-violet-500/20 dark:via-violet-600/10 dark:to-violet-500/5', iconColor: 'text-violet-500 dark:text-violet-400', iconBg: 'bg-violet-100 dark:bg-violet-500/10', border: 'border-violet-200 dark:border-violet-500/20' },
            { label: 'GitHub Stars', value: totalStars, sub: `${repos.length} repos`, icon: Star, color: 'from-yellow-500/10 via-yellow-600/5 to-yellow-500/5 dark:from-yellow-500/20 dark:via-yellow-600/10 dark:to-yellow-500/5', iconColor: 'text-yellow-500 dark:text-yellow-400', iconBg: 'bg-yellow-100 dark:bg-yellow-500/10', border: 'border-yellow-200 dark:border-yellow-500/20' },
            { label: 'Downloads', value: analytics.downloads, sub: 'Resume PDFs', icon: Download, color: 'from-emerald-500/10 via-emerald-600/5 to-emerald-500/5 dark:from-emerald-500/20 dark:via-emerald-600/10 dark:to-emerald-500/5', iconColor: 'text-emerald-500 dark:text-emerald-400', iconBg: 'bg-emerald-100 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/20' },
          ].map((stat, idx) => (
            <div key={idx}>
              <Card className={`relative overflow-hidden bg-gradient-to-br ${stat.color} ${stat.border} border backdrop-blur-xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-default`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-foreground/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <div className="relative p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`h-11 w-11 rounded-xl ${stat.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-3xl font-black tracking-tight text-foreground tabular-nums">{stat.value.toLocaleString()}</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Status Card */}
          <Card className="lg:col-span-2 relative overflow-hidden border border-border bg-card shadow-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.04),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_70%)]" />
            <div className="relative p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Portfolio Status</h2>
                  <p className="text-sm text-muted-foreground">Current configuration overview</p>
                </div>
                <Badge className="ml-auto bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/20">
                  {repos.length > 0 ? 'Active' : 'Setup Needed'}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border">
                  <div>
                    <p className="font-semibold text-sm text-foreground">Repository Status</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {repos.length > 0 ? `${repos.length} repositories loaded` : 'No repositories connected'}
                    </p>
                  </div>
                  <div className={`h-3 w-3 rounded-full ${repos.length > 0 ? 'bg-emerald-500' : 'bg-yellow-500'}`} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border">
                  <div>
                    <p className="font-semibold text-sm text-foreground">GitHub Account</p>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">
                      {localStorage.getItem("githubUsername") ? `@${localStorage.getItem("githubUsername")}` : 'Not connected'}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowGithubModal(true)} className="rounded-xl">
                    {repos.length > 0 ? "Change" : "Connect"}
                    <ChevronRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border">
                  <div>
                    <p className="font-semibold text-sm text-foreground">Active Template</p>
                    <p className="text-xs text-muted-foreground mt-1 capitalize">
                      {localStorage.getItem("selectedTemplate") || 'Not selected'}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild className="rounded-xl border-border hover:border-primary/30">
                    <Link href="/dashboard/templates">Choose</Link>
                  </Button>
                </div>

                {topRepo && (
                  <div className="p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-500/5 border border-yellow-200 dark:border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                      <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">Top Repository</p>
                    </div>
                    <p className="font-bold text-sm text-foreground">{topRepo.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ⭐ {topRepo.stars || 0} stars · {topRepo.language || 'Unknown'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Quick Actions Card */}
          <Card className="relative overflow-hidden border border-border bg-card shadow-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.1),transparent_70%)]" />
            <div className="relative p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Quick Actions</h2>
                  <p className="text-sm text-muted-foreground">Jump to any section</p>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { href: '/dashboard/templates', icon: Palette, label: 'Choose Template', color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-100 dark:bg-violet-500/10' },
                  { href: '/dashboard/projects', icon: Code2, label: 'Manage Projects', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-500/10' },
                  { href: '/dashboard/analytics', icon: BarChart3, label: 'View Analytics', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-500/10' },
                  { href: '/dashboard/deploy', icon: Rocket, label: 'Deploy Portfolio', color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-100 dark:bg-cyan-500/10' },
                  { href: '/dashboard/resume', icon: FileText, label: 'Generate Resume', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-500/10' },
                  { href: '/dashboard/roast', icon: Sparkles, label: 'Portfolio Roast', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-500/10' },
                ].map((action) => (
                  <Link key={action.label} href={action.href}>
                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/30 border border-border hover:border-primary/30 hover:bg-muted/50 transition-all group cursor-pointer">
                      <div className={`h-9 w-9 rounded-xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <action.icon className={`h-4 w-4 ${action.color}`} />
                      </div>
                      <span className="text-sm font-semibold text-foreground flex-1">{action.label}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* GitHub Repositories */}
        <Card className="relative overflow-hidden border border-border bg-card shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.03),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.05),transparent_70%)]" />
          <div className="relative p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 flex items-center justify-center border border-cyan-300 dark:border-cyan-500/20">
                  <Github className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">GitHub Repositories</h2>
                  <p className="text-sm text-muted-foreground">
                    {repos.length > 0
                      ? `Showing ${Math.min(repos.length, 6)} of ${repos.length} repositories`
                      : 'Connect GitHub to see your repositories'}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowGithubModal(true)}
                className="rounded-xl border-border hover:border-primary/30 gap-2"
              >
                <Github className="h-4 w-4" />
                {repos.length > 0 ? "Change Username" : "Connect GitHub"}
              </Button>
            </div>

            {repos.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl">
                <div className="h-16 w-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
                  <Github className="h-8 w-8 text-muted-foreground/40" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">No repositories loaded</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                  Connect your GitHub account to display your projects and build your portfolio
                </p>
                <Button onClick={() => setShowGithubModal(true)} className="rounded-xl gap-2">
                  <Github className="h-4 w-4" />
                  Connect GitHub
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos
                  .sort((a, b) => (b.stars || 0) - (a.stars || 0))
                  .slice(0, 6)
                  .map((repo, index) => (
                    <div
                      key={index}
                      className="group p-5 rounded-2xl bg-muted/30 border border-border hover:border-primary/30 hover:bg-muted/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {repo.name}
                        </h3>
                        <a
                          href={repo.url || repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2"
                        >
                          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                        </a>
                      </div>
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                        {repo.description || "No description available"}
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        {repo.language && (
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
                          <Star className="h-3 w-3 fill-current" />
                          {repo.stars || 0}
                        </span>
                        {(repo.forks || 0) > 0 && (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <GitFork className="h-3 w-3" />
                            {repo.forks}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </Card>

        {/* Recent Activity & Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Feed */}
          <Card className="relative overflow-hidden border border-border bg-card shadow-sm">
            <div className="relative p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center border border-amber-300 dark:border-amber-500/20">
                  <Activity className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
                  <p className="text-sm text-muted-foreground">Your latest actions</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Dashboard Accessed', desc: `Welcome back, ${user?.name?.split(' ')[0] || 'Developer'}! Ready to build something great.`, time: 'Just now', icon: '👋' },
                  { title: 'Account Active', desc: 'Your developer portfolio account is set up and ready to go.', time: 'Today', icon: '✅' },
                  { title: 'GitHub Integration', desc: repos.length > 0 ? `${repos.length} repos synced from GitHub.` : 'Connect GitHub to import your projects.', time: repos.length > 0 ? 'Active' : 'Pending', icon: '🔗' },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border">
                    <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0 text-lg">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{activity.desc}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Pro Tips */}
          <Card className="relative overflow-hidden border border-border bg-card shadow-sm">
            <div className="relative p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Pro Tips</h2>
                  <p className="text-sm text-muted-foreground">Get the most out of your portfolio</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { icon: '🎨', title: 'Choose a Template', desc: 'Pick from 6 professional templates that match your style.' },
                  { icon: '📁', title: 'Manage Projects', desc: 'Toggle visibility, add descriptions, and organize your repos.' },
                  { icon: '📊', title: 'Track Analytics', desc: 'Monitor views, clicks, and downloads in real-time.' },
                  { icon: '🚀', title: 'Deploy Quickly', desc: 'One-click deploy to Vercel or download as static HTML.' },
                ].map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-muted/30 border border-border hover:border-primary/30 transition-all">
                    <span className="text-xl flex-shrink-0">{tip.icon}</span>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{tip.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{tip.desc}</p>
                    </div>
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