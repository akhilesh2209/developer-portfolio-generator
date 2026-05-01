'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  X, Eye, Check, Star,
  Github, Mail, Linkedin, Twitter, Code2, Briefcase,
  User, Users, Sparkles, Zap, Crown, TrendingUp, Palette,
  Layout, Monitor, Smartphone, Tablet, ArrowRight,
  Play, Pause, Maximize2, Heart, Share2, Bookmark,
  Filter, Search, SlidersHorizontal, Grid3X3, List
} from 'lucide-react'

const TEMPLATES = [
  {
    id: 'minimal',
    name: 'Minimal Developer',
    description: 'Clean, typography-focused layout that lets your work speak volumes.',
    longDescription: 'Perfect for developers who believe in less is more. Features crisp typography, generous whitespace, and a focus on your projects and skills.',
    tags: ['Clean', 'Simple', 'Fast', 'Typography'],
    gradient: 'from-slate-100 to-white dark:from-slate-900 dark:to-slate-800',
    accent: '#3b82f6',
    accentClass: 'bg-blue-500',
    popular: false,
    featured: true,
    rating: 4.8,
    users: 1234,
    previewColors: ['#3b82f6', '#64748b', '#f8fafc'],
  },
  {
    id: 'modern',
    name: 'Modern SaaS',
    description: 'Bold gradients and glassmorphism effects. Built to impress.',
    longDescription: 'A striking design with modern gradients, glassmorphism cards, and smooth animations. Ideal for developers who want to stand out.',
    tags: ['Bold', 'Gradient', 'Modern', 'Glassmorphism'],
    gradient: 'from-blue-600 to-purple-600',
    accent: '#8b5cf6',
    accentClass: 'bg-purple-500',
    popular: true,
    featured: true,
    rating: 4.9,
    users: 2541,
    previewColors: ['#8b5cf6', '#3b82f6', '#1e293b'],
  },
  {
    id: 'dark',
    name: 'Dark Hacker',
    description: 'Terminal aesthetic with Matrix vibes for system developers.',
    longDescription: 'A terminal-inspired design that speaks to backend developers and systems engineers. Features monospace fonts and green-on-black aesthetics.',
    tags: ['Dark', 'Terminal', 'Hacker', 'Monospace'],
    gradient: 'from-gray-950 to-black',
    accent: '#22c55e',
    accentClass: 'bg-green-500',
    popular: false,
    featured: false,
    rating: 4.7,
    users: 892,
    previewColors: ['#22c55e', '#15803d', '#000000'],
  },
  {
    id: 'startup',
    name: 'Startup Founder',
    description: 'Energetic layout with big impact sections and compelling CTAs.',
    longDescription: 'Designed for founders and entrepreneurs. Features bold typography, clear call-to-actions, and a layout that drives engagement.',
    tags: ['Energetic', 'CTA', 'Vibrant', 'Bold'],
    gradient: 'from-orange-400 to-pink-600',
    accent: '#f97316',
    accentClass: 'bg-orange-500',
    popular: false,
    featured: true,
    rating: 4.6,
    users: 1567,
    previewColors: ['#f97316', '#ec4899', '#fff7ed'],
  },
  {
    id: 'animated',
    name: 'Animated Portfolio',
    description: 'Smooth animations and transitions that bring your work to life.',
    longDescription: 'Features stunning animations, scroll effects, and interactive elements. Perfect for frontend developers wanting to showcase their skills.',
    tags: ['Animated', 'Dynamic', 'Engaging', 'Interactive'],
    gradient: 'from-cyan-500 to-blue-500',
    accent: '#06b6d4',
    accentClass: 'bg-cyan-500',
    popular: false,
    featured: false,
    rating: 4.5,
    users: 723,
    previewColors: ['#06b6d4', '#3b82f6', '#164e63'],
  },
  {
    id: 'glass',
    name: 'Glassmorphism',
    description: 'Frosted glass cards over vibrant blurred backgrounds.',
    longDescription: 'The epitome of modern design with frosted glass effects, vibrant backgrounds, and elegant transparency throughout the layout.',
    tags: ['Glass', 'Elegant', 'Luxury', 'Modern'],
    gradient: 'from-violet-600 via-purple-500 to-pink-500',
    accent: '#a855f7',
    accentClass: 'bg-purple-500',
    popular: true,
    featured: true,
    rating: 4.9,
    users: 1876,
    previewColors: ['#a855f7', '#ec4899', '#2e1065'],
  },
]

// ── Preview renderers ──────────────────────────────────────────────────────────

function MinimalPreview({ user, repos }: any) {
  const name = user?.name || 'Alex Johnson'
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white text-slate-900 p-8">
      <nav className="flex justify-between items-center mb-16 border-b border-slate-200 pb-6">
        <span className="font-bold text-xl tracking-tight">{name.split(' ')[0]}</span>
        <div className="hidden sm:flex gap-8 text-sm text-slate-500 font-medium">
          <span className="text-slate-900">About</span>
          <span>Work</span>
          <span>Writing</span>
          <span>Contact</span>
        </div>
      </nav>
      <div className="max-w-3xl">
        <p className="text-sm text-blue-500 font-semibold mb-3 tracking-wider uppercase">Software Engineer</p>
        <h1 className="text-6xl font-black mb-6 tracking-tight leading-none">{name}</h1>
        <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl">
          Building clean, performant web applications with modern technologies. Open source enthusiast.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors">
            View Projects
          </button>
          <button className="px-6 py-3 border-2 border-slate-200 text-sm font-semibold rounded-xl hover:border-slate-300 transition-colors">
            Get In Touch
          </button>
        </div>
      </div>
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(repos || []).slice(0,4).map((r: any, i: number) => (
          <div key={i} className="border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <Code2 className="h-5 w-5 text-blue-500" />
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Star className="h-3 w-3" /> {r.stars || 0}
              </span>
            </div>
            <p className="font-bold text-sm mb-2">{r.name || `project-${i+1}`}</p>
            <p className="text-xs text-slate-400 line-clamp-2">{r.description || 'A clean, well-documented project'}</p>
            {r.language && (
              <Badge variant="outline" className="mt-3 text-xs">{r.language}</Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ModernPreview({ user, repos }: any) {
  const name = user?.name || 'Alex Johnson'
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
      
      <nav className="relative flex justify-between items-center mb-16 bg-white/5 backdrop-blur-lg rounded-2xl px-6 py-4 border border-white/10">
        <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {name.split(' ')[0]}
        </span>
        <div className="hidden sm:flex gap-8 text-sm text-gray-400 font-medium">
          <span className="text-white">Projects</span>
          <span>Skills</span>
          <span>About</span>
        </div>
      </nav>
      
      <div className="relative max-w-4xl mx-auto text-center py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-sm font-semibold mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Available for Work
        </div>
        <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent leading-none">
          {name}
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Building exceptional digital experiences with cutting-edge technology
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-sm hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300">
            View Projects
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur rounded-2xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
            Download CV
          </button>
        </div>
      </div>
      
      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
        {(repos || []).slice(0,3).map((r: any, i: number) => (
          <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
              <Code2 className="h-5 w-5 text-purple-400" />
            </div>
            <p className="font-bold text-sm mb-2">{r.name || `Project ${i+1}`}</p>
            <p className="text-xs text-gray-400 line-clamp-2 mb-4">{r.description || 'An innovative project'}</p>
            <div className="flex items-center gap-2 text-xs text-purple-400">
              <Star className="h-3 w-3" />
              <span>{r.stars || 0} stars</span>
              {r.language && <Badge variant="outline" className="text-[10px] border-purple-500/30">{r.language}</Badge>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DarkPreview({ user, repos }: any) {
  const name = user?.name || 'Alex Johnson'
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8">
      <div className="mb-6 flex items-center gap-2 text-xs">
        <span className="text-green-600">[</span>
        <span className="text-green-500">user@portfolio</span>
        <span className="text-green-600">]</span>
        <span className="text-green-500">~/portfolio</span>
        <span className="text-green-600">$</span>
        <span className="ml-2 animate-pulse">▊</span>
      </div>
      <div className="mb-12 border-l-2 border-green-900 pl-4">
        <p className="text-green-600 text-sm mb-2">// Developer Portfolio v2.0</p>
        <p className="text-green-600 text-sm mb-1">// Last updated: {new Date().toISOString().split('T')[0]}</p>
        <p className="text-green-600 text-sm">// Status: Production-ready</p>
      </div>
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4 text-green-300 tracking-tight">{name}</h1>
        <div className="space-y-2 text-sm">
          <p><span className="text-green-600">const</span> <span className="text-green-400">role</span> = <span className="text-green-300">"Full-Stack Engineer"</span>;</p>
          <p><span className="text-green-600">const</span> <span className="text-green-400">status</span> = <span className="text-green-300">"open_to_opportunities"</span>;</p>
          <p><span className="text-green-600">const</span> <span className="text-green-400">stack</span> = [<span className="text-green-300">"React"</span>, <span className="text-green-300">"Node.js"</span>, <span className="text-green-300">"TypeScript"</span>];</p>
        </div>
      </div>
      <div className="mb-8">
        <p className="text-green-600 text-sm mb-4">// Recent Projects</p>
        <div className="space-y-3">
          {(repos || []).slice(0,4).map((r: any, i: number) => (
            <div key={i} className="border border-green-900/50 rounded-lg p-4 hover:border-green-600 transition-colors duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-green-300 text-sm font-bold">{r.name || `project-${i+1}`}</span>
                  <p className="text-green-700 text-xs mt-1">{r.description || '// TODO: Add description'}</p>
                </div>
                <span className="text-green-600 text-xs">★ {r.stars || 0}</span>
              </div>
              {r.language && <span className="text-green-800 text-[10px] mt-2 inline-block">{r.language}</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-6 text-sm text-green-600">
        <span className="hover:text-green-400 cursor-pointer transition-colors">[ GitHub ]</span>
        <span className="hover:text-green-400 cursor-pointer transition-colors">[ LinkedIn ]</span>
        <span className="hover:text-green-400 cursor-pointer transition-colors">[ Email ]</span>
      </div>
    </div>
  )
}

function StartupPreview({ user, repos }: any) {
  const name = user?.name || 'Alex Johnson'
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50 text-gray-900 p-8">
      <nav className="flex justify-between items-center mb-20">
        <span className="font-black text-2xl text-orange-500 tracking-tight">{name.split(' ')[0]}.</span>
        <button className="px-6 py-3 bg-orange-500 text-white rounded-full text-sm font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25">
          Hire Me 🚀
        </button>
      </nav>
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-bold mb-8">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          Open to Work
        </div>
        <h1 className="text-7xl font-black leading-none mb-6 text-gray-900 tracking-tight">
          I Build Things That <span className="text-orange-500">Matter</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl">
          Turning complex ideas into impactful digital products. {repos.length || 12} projects shipped, countless problems solved.
        </p>
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25">
            See My Work →
          </button>
          <button className="px-8 py-4 border-2 border-gray-300 rounded-full font-bold hover:border-orange-300 transition-all">
            Get In Touch
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">
        {(repos || []).slice(0,3).map((r: any, i: number) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl hover:border-orange-300 transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <p className="font-bold text-lg mb-2">{r.name || `Project ${i+1}`}</p>
            <p className="text-sm text-gray-500 line-clamp-2">{r.description || 'An impactful project'}</p>
            <div className="flex items-center gap-3 mt-4 text-sm text-gray-400">
              <span className="flex items-center gap-1"><Star className="h-4 w-4" /> {r.stars || 0}</span>
              {r.language && <span>· {r.language}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AnimatedPreview({ user, repos }: any) {
  const name = user?.name || 'Alex Johnson'
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 text-white p-8 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div key={i} 
            className="absolute rounded-full mix-blend-overlay"
            style={{
              width: `${80+i*50}px`,
              height: `${80+i*50}px`,
              background: `radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)`,
              top: `${15+i*10}%`,
              left: `${10+i*12}%`,
            }}
          />
        ))}
      </div>
      <nav className="relative flex justify-between items-center mb-20">
        <span className="font-bold text-xl text-cyan-300 tracking-tight">{name.split(' ')[0]}</span>
        <div className="hidden sm:flex gap-8 text-sm text-cyan-400/70 font-medium">
          <span className="text-white">Work</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </nav>
      <div className="relative max-w-4xl mx-auto text-center py-16">
        <div className="text-cyan-400 text-sm mb-6 font-mono tracking-[.25em] uppercase">Full Stack Developer</div>
        <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-300 bg-clip-text text-transparent leading-none">
          {name}
        </h1>
        <p className="text-blue-200 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Crafting seamless digital experiences with modern technologies and creative solutions
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 rounded-2xl font-bold text-sm transition-all duration-300 shadow-xl shadow-cyan-500/25">
            Explore Work
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur rounded-2xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
            Contact Me
          </button>
        </div>
      </div>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mt-12">
        {(repos || []).slice(0,4).map((r: any, i: number) => (
          <div key={i} className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/60 hover:bg-white/10 transition-all duration-300">
            <p className="font-bold text-sm text-cyan-200 mb-2">{r.name || `Project ${i+1}`}</p>
            <p className="text-xs text-blue-300/70 line-clamp-2">{r.description || 'An exciting project'}</p>
            <div className="flex items-center gap-3 mt-4 text-xs text-cyan-400">
              <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {r.stars || 0}</span>
              {r.language && <span>· {r.language}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GlassPreview({ user, repos }: any) {
  const name = user?.name || 'Alex Johnson'
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-500 to-pink-500 text-white p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 h-96 w-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 bg-pink-400/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 h-64 w-64 bg-purple-400/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <nav className="relative flex justify-between items-center mb-20 bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20 shadow-2xl">
        <span className="font-bold text-xl">{name.split(' ')[0]}</span>
        <div className="hidden sm:flex gap-8 text-sm text-white/70 font-medium">
          <span className="text-white">Work</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </nav>
      <div className="relative max-w-4xl mx-auto text-center py-16">
        <h1 className="text-7xl font-black mb-6 text-white drop-shadow-2xl leading-none">{name}</h1>
        <p className="text-white/70 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Developer · Designer · Creator — building the future, one pixel at a time
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-4 bg-white/20 backdrop-blur-xl rounded-2xl font-bold border border-white/30 hover:bg-white/30 transition-all shadow-2xl">
            View Portfolio
          </button>
          <button className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold hover:bg-white/90 transition-all shadow-2xl">
            Download CV
          </button>
        </div>
      </div>
      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
        {(repos || []).slice(0,3).map((r: any, i: number) => (
          <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <p className="font-bold text-sm mb-2">{r.name || `Project ${i+1}`}</p>
            <p className="text-xs text-white/60 line-clamp-2 mb-4">{r.description || 'A beautiful project'}</p>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Star className="h-3 w-3" />
              <span>{r.stars || 0}</span>
              {r.language && <Badge variant="outline" className="text-[10px] border-white/30">{r.language}</Badge>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const PREVIEW_COMPONENTS: Record<string, React.ComponentType<any>> = {
  minimal: MinimalPreview,
  modern: ModernPreview,
  dark: DarkPreview,
  startup: StartupPreview,
  animated: AnimatedPreview,
  glass: GlassPreview,
}

function FloatingParticles() {
  const [particles, setParticles] = useState<
    { left: string; top: string }[]
  >([])

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map(() => ({
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/20"
          style={{
            left: p.left,
            top: p.top,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

export default function TemplatesPage() {
  const router = useRouter()
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [repos, setRepos] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [filter, setFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }

    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))

    const saved = localStorage.getItem('selectedTemplate')
    if (saved) setSelectedTemplate(saved)

    const savedRepos = sessionStorage.getItem('githubRepos')
    if (savedRepos) setRepos(JSON.parse(savedRepos))
    else {
      const username = localStorage.getItem('githubUsername')
      if (username) {
        fetch(`http://localhost:5000/api/github/${username}`)
          .then(r => r.json())
          .then(data => { if (Array.isArray(data)) { setRepos(data); sessionStorage.setItem('githubRepos', JSON.stringify(data)) } })
          .catch(() => {})
      }
    }
  }, [router])

  const handleSelect = (id: string) => {
    setSelectedTemplate(id)
    localStorage.setItem('selectedTemplate', id)
  }

  const handleUseTemplate = (id: string) => {
    handleSelect(id)
    setPreviewTemplate(null)
    router.push(`/portfolio/${localStorage.getItem('githubUsername') || 'preview'}?template=${id}`)
  }

  const PreviewComp = previewTemplate ? PREVIEW_COMPONENTS[previewTemplate] : null

  const filteredTemplates = filter === 'all' 
    ? TEMPLATES 
    : filter === 'popular' 
      ? TEMPLATES.filter(t => t.popular)
      : filter === 'featured'
        ? TEMPLATES.filter(t => t.featured)
        : TEMPLATES

  return (
    <>
      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && PreviewComp && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewTemplate(null)}
          >
            <motion.div
              className="relative w-full max-w-6xl bg-background rounded-3xl overflow-hidden shadow-2xl border border-border"
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-border bg-background/80 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Eye className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {TEMPLATES.find(t => t.id === previewTemplate)?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">Live preview with your GitHub data</p>
                  </div>
                  <Badge variant="secondary" className="ml-2">Real Data</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    onClick={() => handleUseTemplate(previewTemplate)}
                    className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Use This Template
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="h-10 w-10 rounded-xl hover:bg-muted flex items-center justify-center transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Preview Frame */}
              <div className="h-[75vh] overflow-y-auto">
                <div className="transform scale-[0.65] origin-top-left w-[154%]">
                  <PreviewComp user={user} repos={repos} />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-8 py-4 border-t border-border bg-muted/30 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Monitor className="h-4 w-4" /> Desktop
                  </span>
                  <span className="flex items-center gap-1">
                    <Tablet className="h-4 w-4" /> Tablet
                  </span>
                  <span className="flex items-center gap-1">
                    <Smartphone className="h-4 w-4" /> Mobile
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Fully responsive on all devices</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-screen">
        <FloatingParticles />

        <div className="relative space-y-8 max-w-7xl mx-auto px-4 pb-16">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative pt-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />

            <div className="relative text-center space-y-6 py-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-purple-500/20 backdrop-blur-xl rounded-full px-6 py-2 border border-primary/30 shadow-lg shadow-primary/10"
              >
                <Layout className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">6 Premium Templates</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Choose Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Portfolio Template 🎨
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground max-w-3xl mx-auto"
              >
                Preview each template with your real GitHub data before applying. 
                All templates are fully responsive and customizable.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-4 pt-4"
              >
                {[
                  { icon: Eye, label: 'Live Preview' },
                  { icon: Zap, label: 'Instant Apply' },
                  { icon: Monitor, label: 'Responsive' },
                  { icon: Palette, label: 'Customizable' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <item.icon className="h-4 w-4 text-primary" />
                    {item.label}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Warning for no GitHub */}
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
                  <div className="flex-1">
                    <p className="font-semibold text-lg">Connect GitHub for Live Previews</p>
                    <p className="text-sm text-muted-foreground">
                      Link your GitHub account on the
                      <button onClick={() => router.push('/dashboard')} className="text-primary underline font-medium">
                        Dashboard
                      </button>
                      to see your real projects in the template previews.
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                </div>
              </Card>
            </motion.div>
          )}

          {/* Filters and Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2 p-1 bg-muted/50 rounded-2xl border border-border/50">
              {[
                { id: 'all', label: 'All Templates', icon: Grid3X3 },
                { id: 'featured', label: 'Featured', icon: Crown },
                { id: 'popular', label: 'Popular', icon: TrendingUp },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    filter === f.id
                      ? 'bg-background shadow-sm text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <f.icon className="h-4 w-4" />
                  {f.label}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="border-white/10 hover:border-white/20"
            >
              {viewMode === 'grid' ? (
                <><List className="h-4 w-4 mr-2" /> List View</>
              ) : (
                <><Grid3X3 className="h-4 w-4 mr-2" /> Grid View</>
              )}
            </Button>
          </motion.div>

          {/* Templates Grid/List */}
          <motion.div
            layout
            className={`${
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className={`group relative overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                    selectedTemplate === template.id
                      ? 'border-primary ring-4 ring-primary/20 shadow-2xl shadow-primary/10'
                      : 'border-border hover:border-primary/50 hover:shadow-2xl'
                  } ${viewMode === 'list' ? 'flex gap-6' : ''}`}>
                    {/* Template Thumbnail */}
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'w-64 flex-shrink-0' : 'aspect-video'
                      } bg-gradient-to-br ${template.gradient}`}
                    >
                      {/* Decorative elements */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

                      {/* Badges */}
                      <div className="absolute top-4 right-4 z-10 flex gap-2">
                        {template.popular && (
                          <Badge className="bg-yellow-500/90 text-yellow-950 text-xs font-bold backdrop-blur-sm">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        {template.featured && (
                          <Badge className="bg-primary/90 text-primary-foreground text-xs font-bold backdrop-blur-sm">
                            <Crown className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>

                      {selectedTemplate === template.id && (
                        <div className="absolute top-4 left-4 z-10">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-lg"
                          >
                            <Check className="h-4 w-4 text-primary-foreground" />
                          </motion.div>
                        </div>
                      )}

                      {/* Rating */}
                      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/30 backdrop-blur-sm">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-bold text-white">{template.rating}</span>
                        </div>
                        <div className="px-2 py-1 rounded-lg bg-black/30 backdrop-blur-sm">
                          <span className="text-xs text-white/80">{template.users.toLocaleString()} users</span>
                        </div>
                      </div>

                      {/* Mini mockup */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-36 h-24 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 p-3 shadow-2xl"
                        >
                          <div className="flex items-center gap-1.5 mb-2">
                            {template.previewColors.map((color, i) => (
                              <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                            ))}
                          </div>
                          <div className="space-y-1.5">
                            <div className="h-2 w-20 rounded bg-white/30" />
                            <div className="h-1.5 w-14 rounded bg-white/20" />
                            <div className="grid grid-cols-2 gap-1 mt-2">
                              <div className="h-5 rounded bg-white/15" />
                              <div className="h-5 rounded bg-white/15" />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className={`${viewMode === 'list' ? 'flex-1' : ''} p-6`}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors">
                            {template.name}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            <span>{template.rating}</span>
                            <span className="mx-1">·</span>
                            <Users className="h-3 w-3" />
                            <span>{template.users.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {template.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {template.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs px-2.5 py-1 bg-primary/5 border-primary/10">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 group/btn border-primary/20 hover:border-primary/40"
                          onClick={() => setPreviewTemplate(template.id)}
                        >
                          <Eye className="h-4 w-4 mr-2 group-hover/btn:text-primary transition-colors" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          className={`flex-1 transition-all duration-300 ${
                            selectedTemplate === template.id
                              ? 'bg-gradient-to-r from-primary to-purple-500 text-white'
                              : 'bg-primary/10 hover:bg-primary/20'
                          }`}
                          variant={selectedTemplate === template.id ? "default" : "ghost"}
                          onClick={() => handleSelect(template.id)}
                        >
                          {selectedTemplate === template.id ? (
                            <><Check className="h-4 w-4 mr-2" />Selected</>
                          ) : (
                            'Select'
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Apply Button */}
          <AnimatePresence>
            {selectedTemplate && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
              >
                <Card className="p-4 flex items-center gap-6 border-2 border-primary/50 shadow-2xl bg-background/95 backdrop-blur-xl rounded-2xl">
                  <div>
                    <p className="font-bold">
                      {TEMPLATES.find(t => t.id === selectedTemplate)?.name}
                      <Badge className="ml-2 bg-primary/10 text-primary border-primary/20">Selected</Badge>
                    </p>
                    <p className="text-xs text-muted-foreground">Ready to generate your portfolio</p>
                  </div>
                  <Button
                    size="lg"
                    onClick={() => {
                      const username = localStorage.getItem('githubUsername')
                      if (!username) {
                        alert('Please connect your GitHub account on the Dashboard first.')
                        router.push('/dashboard')
                        return
                      }
                      router.push(`/portfolio/${username}?template=${selectedTemplate}`)
                    }}
                    className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 px-8"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Portfolio
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}