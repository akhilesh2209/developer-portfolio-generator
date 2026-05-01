'use client'

import { useMemo } from 'react'
import { Navbar, Footer } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight, Github, Zap, Palette, BarChart3, Rocket,
  Sparkles, Star, CheckCircle2, Globe,FileText, Code2, Users,
  TrendingUp, Shield, Cloud, Download, Eye, ChevronRight,
  Trophy, Target, Heart
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

function FloatingParticles() {
  const particles = useMemo(() => {
    const seed = 42 // Fixed seed for deterministic generation
    const random = (index: number) => {
      const x = Math.sin(seed + index) * 10000
      return x - Math.floor(x)
    }
    
    return [...Array(12)].map((_, i) => ({
      id: i,
      left: `${random(i) * 100}%`,
      top: `${random(i + 12) * 100}%`,
      size: random(i + 24) * 300 + 200,
      color: i % 3 === 0 ? 'rgba(99,102,241,0.15)' : i % 3 === 1 ? 'rgba(139,92,246,0.1)' : 'rgba(6,182,212,0.08)',
      duration: 12 + random(i + 36) * 8,
      delay: random(i + 48) * 5,
    }))
  }, [])

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
            y: [0, -40, 0],
            x: [0, 20, -20, 0],
            opacity: [0.4, 0.7, 0.4],
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

function StatCounter({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        {value}
      </p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
  )
}

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-[#030712]">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <FloatingParticles />

          <div className="container mx-auto px-4 py-24 sm:py-36 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-full px-5 py-2 border border-indigo-500/30 shadow-lg shadow-indigo-500/10 mb-8">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span className="text-sm font-semibold text-indigo-300">AI-Powered Portfolio Generator</span>
                <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 text-[10px] px-2 py-0">
                  NEW
                </Badge>
              </div>

              {/* Main heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-none">
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Build Your Developer
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Portfolio in Seconds
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Connect your GitHub, choose a stunning template, and generate a professional portfolio automatically. 
                No design skills required — just your code.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-500/25 rounded-2xl px-8 py-6 text-base gap-2 group">
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-6 text-base gap-2">
                  <Link href="/demo">
                    <Eye className="w-5 h-5" />
                    View Demo
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto pt-8 border-t border-white/5">
                <StatCounter value="5,000+" label="Developers" />
                <StatCounter value="6" label="Templates" />
                <StatCounter value="10K+" label="Portfolios" />
                <StatCounter value="4.9" label="Rating" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-b border-white/5 py-24 sm:py-32 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.08),transparent_60%)]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6">
                <Zap className="h-3.5 w-3.5 text-indigo-400" />
                <span className="text-xs font-semibold text-indigo-400">Features</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                Everything You Need
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Powerful features to showcase your best work and impress recruiters
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Github,
                  title: 'GitHub Integration',
                  description: 'Auto-import all your repositories, stars, and languages with one click.',
                  gradient: 'from-blue-500/20 to-cyan-500/10',
                  border: 'border-blue-500/20',
                  iconColor: 'text-blue-400',
                },
                {
                  icon: Palette,
                  title: '6 Stunning Templates',
                  description: 'Choose from professionally designed templates that match your style.',
                  gradient: 'from-purple-500/20 to-violet-500/10',
                  border: 'border-purple-500/20',
                  iconColor: 'text-purple-400',
                },
                {
                  icon: BarChart3,
                  title: 'Real-time Analytics',
                  description: 'Track portfolio views, clicks, and downloads with detailed analytics.',
                  gradient: 'from-emerald-500/20 to-green-500/10',
                  border: 'border-emerald-500/20',
                  iconColor: 'text-emerald-400',
                },
                {
                  icon: Rocket,
                  title: 'One-Click Deploy',
                  description: 'Deploy to Vercel, download as HTML, or host anywhere instantly.',
                  gradient: 'from-orange-500/20 to-amber-500/10',
                  border: 'border-orange-500/20',
                  iconColor: 'text-orange-400',
                },
                {
                  icon: FileText,
                  title: 'Resume Generator',
                  description: 'Generate ATS-friendly resumes with your GitHub projects auto-included.',
                  gradient: 'from-cyan-500/20 to-teal-500/10',
                  border: 'border-cyan-500/20',
                  iconColor: 'text-cyan-400',
                },
                {
                  icon: Shield,
                  title: 'Privacy Controls',
                  description: 'Toggle project visibility, manage public info, and control your data.',
                  gradient: 'from-rose-500/20 to-pink-500/10',
                  border: 'border-rose-500/20',
                  iconColor: 'text-rose-400',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group relative"
                >
                  <div className={`h-full p-6 rounded-2xl bg-gradient-to-br ${feature.gradient} ${feature.border} border bg-gray-900/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300`}>
                    <div className={`h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Preview Section */}
        <section className="border-b border-white/5 py-24 sm:py-32 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-6">
                <Palette className="h-3.5 w-3.5 text-purple-400" />
                <span className="text-xs font-semibold text-purple-400">Templates</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                Six Stunning Templates
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Choose a template that matches your personality and style
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { name: 'Minimal Developer', desc: 'Clean, typography-focused layout', icon: '✨', accent: '#3b82f6' },
                { name: 'Modern SaaS', desc: 'Bold gradients and glassmorphism', icon: '🚀', accent: '#8b5cf6' },
                { name: 'Dark Hacker', desc: 'Terminal aesthetic for devs', icon: '💻', accent: '#22c55e' },
                { name: 'Startup Founder', desc: 'Energetic with big CTAs', icon: '🔥', accent: '#f97316' },
                { name: 'Animated Portfolio', desc: 'Smooth animations throughout', icon: '🎬', accent: '#06b6d4' },
                { name: 'Glassmorphism', desc: 'Frosted glass over gradients', icon: '🪟', accent: '#a855f7' },
              ].map((template) => (
                <div
                  key={template.name}
                  className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all cursor-pointer"
                >
                  <div className="text-3xl mb-4">{template.icon}</div>
                  <h3 className="font-bold text-lg text-white mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{template.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                    Preview <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-b border-white/5 py-24 sm:py-32 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent_60%)]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
                <Target className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">How It Works</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                Three Simple Steps
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Get your portfolio live in under 5 minutes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: '01',
                  title: 'Connect GitHub',
                  desc: 'Link your GitHub account to automatically import all your repositories and stats.',
                  icon: Github,
                },
                {
                  step: '02',
                  title: 'Fill Details',
                  desc: 'Add your personal info, education, skills, and customize your project descriptions.',
                  icon: FileText,
                },
                {
                  step: '03',
                  title: 'Deploy & Share',
                  desc: 'Download as HTML, deploy to Vercel, or share your live portfolio URL instantly.',
                  icon: Rocket,
                },
              ].map((step) => (
                <div key={step.step} className="text-center group">
                  <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-b border-white/5 py-24 sm:py-32 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-1.5 mb-6">
                <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-semibold text-yellow-400">Testimonials</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                Loved by Developers
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                See what developers are saying about their portfolios
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: 'Sarah Chen',
                  role: 'Full Stack Developer',
                  quote: 'Built my portfolio in 5 minutes. Got 3 recruiter emails the next day! The templates are gorgeous.',
                  rating: 5,
                },
                {
                  name: 'Marcus Johnson',
                  role: 'React Specialist',
                  quote: 'The GitHub integration is seamless. All my repos auto-imported. Highly recommended!',
                  rating: 5,
                },
                {
                  name: 'Alex Rivera',
                  role: 'DevOps Engineer',
                  quote: 'Finally have a portfolio that matches my skills. The deploy options are incredible.',
                  rating: 5,
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 sm:py-32 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1),transparent_60%)]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-full px-5 py-2 border border-indigo-500/30 mb-8">
                <Rocket className="h-4 w-4 text-indigo-400" />
                <span className="text-sm font-semibold text-indigo-300">Ready to Launch?</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black mb-6">
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Start Building Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Portfolio Today
                </span>
              </h2>
              
              <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
                Join thousands of developers who have already created stunning portfolios. 
                Free to start, no credit card required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-500/25 rounded-2xl px-10 py-6 text-base gap-2 group">
                  <Link href="/signup">
                    Create Free Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-sm rounded-2xl px-10 py-6 text-base gap-2">
                  <Link href="/demo">
                    <Github className="w-5 h-5" />
                    View on GitHub
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 mt-10 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  No credit card
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Free forever
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Cancel anytime
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}