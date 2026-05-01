'use client'

import { Card } from '@/components/ui/card'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen, Search, Sparkles, ArrowRight,Eye, Github,
  Palette, Rocket, BarChart3, Code2, Globe, Zap,
  FileText, Shield, Users, ChevronRight, Star,
  Clock, Lightbulb, Terminal, Heart, ExternalLink,
  Play, Download, Cloud, Lock, Mail, MessageSquare,
  HelpCircle, LifeBuoy, BookMarked
} from 'lucide-react'

function FloatingParticles() {
  const [particles, setParticles] = useState<
    {
      id: number
      left: string
      top: string
      size: number
      color: string
      duration: number
      delay: number
    }[]
  >([])

  useEffect(() => {
    const generated = [...Array(6)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 200 + 150,
      color:
        i % 3 === 0
          ? 'rgba(99,102,241,0.08)'
          : i % 3 === 1
          ? 'rgba(139,92,246,0.06)'
          : 'rgba(6,182,212,0.05)',
      duration: 10 + Math.random() * 8,
      delay: Math.random() * 5,
    }))

    setParticles(generated)
  }, [])

  if (!particles.length) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${p.color}, transparent)`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

const docCategories = [
  {
    title: 'Getting Started',
    description: 'Learn the basics and create your first portfolio in under 5 minutes.',
    icon: Rocket,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    gradient: 'from-blue-500/10 to-cyan-500/5',
    href: '/docs/getting-started',
    badge: 'Quick Start',
    articles: 4,
  },
  {
    title: 'GitHub Integration',
    description: 'Connect your GitHub account, sync repositories, and auto-import projects.',
    icon: Github,
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    gradient: 'from-purple-500/10 to-violet-500/5',
    href: '/docs/github',
    badge: 'Popular',
    articles: 6,
  },
  {
    title: 'Templates & Themes',
    description: 'Explore all 6 templates and learn how to customize every aspect.',
    icon: Palette,
    iconColor: 'text-pink-400',
    iconBg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    gradient: 'from-pink-500/10 to-rose-500/5',
    href: '/docs/templates',
    badge: 'Featured',
    articles: 8,
  },
  {
    title: 'Deployment Guide',
    description: 'Deploy to Vercel, download HTML, host on GitHub Pages, or use custom domains.',
    icon: Globe,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    gradient: 'from-emerald-500/10 to-green-500/5',
    href: '/docs/deployment',
    badge: 'Essential',
    articles: 5,
  },
  {
    title: 'Analytics & Insights',
    description: 'Track portfolio views, clicks, downloads, and visitor engagement.',
    icon: BarChart3,
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    gradient: 'from-orange-500/10 to-amber-500/5',
    href: '/docs/analytics',
    badge: 'Pro',
    articles: 3,
  },
  {
    title: 'API Reference',
    description: 'Integrate our REST API into your own applications and workflows.',
    icon: Code2,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    gradient: 'from-cyan-500/10 to-teal-500/5',
    href: '/docs/api',
    badge: 'Advanced',
    articles: 7,
  },
]

const quickLinks = [
  { icon: Play, label: 'Video Tutorials', href: '/docs/videos', color: 'text-red-400' },
  { icon: Terminal, label: 'CLI Guide', href: '/docs/cli', color: 'text-green-400' },
  { icon: Shield, label: 'Security', href: '/docs/security', color: 'text-blue-400' },
  { icon: Cloud, label: 'Hosting Options', href: '/docs/hosting', color: 'text-purple-400' },
  { icon: Lock, label: 'Privacy Controls', href: '/docs/privacy', color: 'text-amber-400' },
  { icon: Download, label: 'Offline Usage', href: '/docs/offline', color: 'text-cyan-400' },
]

const popularArticles = [
  { title: 'How to connect your GitHub account', views: '12.5K', time: '3 min read' },
  { title: 'Customizing your portfolio template', views: '8.2K', time: '5 min read' },
  { title: 'Deploying to Vercel step by step', views: '6.8K', time: '4 min read' },
  { title: 'Setting up a custom domain', views: '5.1K', time: '6 min read' },
  { title: 'Generating your ATS-friendly resume', views: '4.3K', time: '2 min read' },
]

export default function DocsPage() {
  return (
    <div className="relative min-h-screen bg-[#030712]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <FloatingParticles />

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-full px-5 py-2 border border-indigo-500/30 shadow-lg shadow-indigo-500/10 mb-6">
              <BookOpen className="h-4 w-4 text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-300">Documentation</span>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 text-[10px] px-2 py-0">
                v2.0
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Everything You Need
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                to Build Your Portfolio
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
              Comprehensive guides, tutorials, and API references to help you create
              the perfect developer portfolio.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              <Input
                placeholder='Search documentation... (e.g., "deploy to Vercel")'
                className="h-14 pl-12 pr-4 bg-white/5 border-white/10 focus:border-indigo-500/50 focus:bg-white/[0.08] rounded-2xl text-sm text-white placeholder-gray-500 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-500">
                  <span>⌘</span>K
                </kbd>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all text-center"
              >
                <div className={`h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <link.icon className={`h-5 w-5 ${link.color}`} />
                </div>
                <p className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
                  {link.label}
                </p>
              </Link>
            ))}
          </div>

          {/* Main Documentation Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {docCategories.map((doc) => (
              <Link key={doc.title} href={doc.href} className="group">
                <Card className={`relative h-full overflow-hidden border-2 transition-all duration-300 ${
                  doc.border
                } bg-gradient-to-br ${doc.gradient} hover:shadow-xl hover:scale-[1.02]`}>
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`h-12 w-12 rounded-xl ${doc.iconBg} flex items-center justify-center border ${doc.border} group-hover:scale-110 transition-transform`}>
                        <doc.icon className={`h-6 w-6 ${doc.iconColor}`} />
                      </div>
                      <Badge className={`${doc.iconBg} ${doc.iconColor} border ${doc.border} text-xs`}>
                        {doc.badge}
                      </Badge>
                    </div>

                    <h3 className="font-bold text-lg text-white mb-2 group-hover:text-indigo-300 transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                      {doc.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 flex items-center gap-1.5">
                        <FileText className="h-3 w-3" />
                        {doc.articles} articles
                      </span>
                      <span className="text-xs text-indigo-400 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Browse <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Popular Articles & Help Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Popular Articles */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Popular Articles</h2>
                  <p className="text-sm text-gray-400">Most read documentation pages</p>
                </div>
              </div>

              <Card className="border-2 border-white/5 bg-white/[0.02] backdrop-blur-sm divide-y divide-white/5">
                {popularArticles.map((article, idx) => (
                  <Link
                    key={idx}
                    href="/docs"
                    className="flex items-center justify-between p-5 hover:bg-white/[0.03] transition-all group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-sm font-bold text-gray-600 w-6 flex-shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors truncate">
                          {article.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {article.views}
                          </span>
                          <span className="text-xs text-gray-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-gray-400 flex-shrink-0 ml-4 transition-colors" />
                  </Link>
                ))}
              </Card>
            </div>

            {/* Help & Support */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <LifeBuoy className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Need Help?</h2>
                  <p className="text-sm text-gray-400">We're here for you</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    icon: MessageSquare,
                    title: 'Community Forum',
                    desc: 'Ask questions and share tips',
                    color: 'text-blue-400',
                    bg: 'bg-blue-500/10',
                  },
                  {
                    icon: Mail,
                    title: 'Email Support',
                    desc: 'Get help from our team',
                    color: 'text-purple-400',
                    bg: 'bg-purple-500/10',
                  },
                  {
                    icon: Github,
                    title: 'GitHub Issues',
                    desc: 'Report bugs or request features',
                    color: 'text-gray-400',
                    bg: 'bg-gray-500/10',
                  },
                ].map((item) => (
                  <Link
                    key={item.title}
                    href="/support"
                    className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all group"
                  >
                    <div className={`h-10 w-10 rounded-xl ${item.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-gray-400 flex-shrink-0 transition-colors" />
                  </Link>
                ))}
              </div>

              {/* CTA Card */}
              <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <p className="text-sm font-semibold text-indigo-300">Ready to build?</p>
                </div>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  Create your portfolio now and join thousands of developers.
                </p>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 rounded-xl gap-2"
                  asChild
                >
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-16 pt-8 border-t border-white/5">
            <p className="text-sm text-gray-500">
              Can't find what you're looking for?{' '}
              <Link href="/contact" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                Contact our support team
              </Link>
              {' '}— we respond within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}