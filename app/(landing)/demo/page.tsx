import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  Sparkles,
  ArrowRight,
  Eye,
  ExternalLink,
  Star,
  Play,
  Monitor,
  Smartphone,
  Tablet,
  Zap,
  Crown,
  Palette,
  Terminal,
  Rocket,
  Wand2,
} from 'lucide-react'

const demos = [
  {
    name: 'Modern SaaS Developer',
    template: 'Modern SaaS',
    url: 'https://example-modern.vercel.app',
    preview: 'Clean, professional design with smooth animations and glassmorphism effects.',
    gradient: 'from-blue-600 via-indigo-600 to-purple-700',
    icon: Rocket,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    badge: 'Most Popular',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    rating: 4.9,
    features: ['Glassmorphism', 'Gradient', 'Responsive'],
  },
  {
    name: 'Dark Hacker Portfolio',
    template: 'Dark Hacker',
    url: 'https://example-hacker.vercel.app',
    preview: 'Bold dark theme with neon accents and terminal-inspired code showcase.',
    gradient: 'from-gray-950 via-green-950 to-black',
    icon: Terminal,
    iconColor: 'text-green-400',
    iconBg: 'bg-green-500/10',
    border: 'border-green-500/20',
    badge: 'Unique',
    badgeColor: 'bg-green-500/20 text-green-300 border-green-500/30',
    rating: 4.7,
    features: ['Terminal', 'Monospace', 'Dark'],
  },
  {
    name: 'Startup Founder',
    template: 'Startup',
    url: 'https://example-startup.vercel.app',
    preview: 'Energetic colors and bold CTAs — perfect for entrepreneurs and founders.',
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    icon: Zap,
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    badge: 'Featured',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    rating: 4.8,
    features: ['Bold', 'CTA Focused', 'Vibrant'],
  },
  {
    name: 'Minimal Developer',
    template: 'Minimal',
    url: 'https://example-minimal.vercel.app',
    preview: 'Typography-focused design that lets your work and skills speak volumes.',
    gradient: 'from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900',
    icon: Palette,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-500/10',
    border: 'border-slate-500/20',
    badge: 'Clean',
    badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    rating: 4.6,
    features: ['Clean', 'Simple', 'Typographic'],
  },
  {
    name: 'Animated Portfolio',
    template: 'Animated',
    url: 'https://example-animated.vercel.app',
    preview: 'Stunning animations and interactive elements that bring your work to life.',
    gradient: 'from-cyan-500 via-teal-500 to-emerald-600',
    icon: Wand2,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    badge: 'Dynamic',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    rating: 4.8,
    features: ['Animated', 'Interactive', 'Smooth'],
  },
  {
    name: 'Glassmorphism Design',
    template: 'Glassmorphism',
    url: 'https://example-glass.vercel.app',
    preview: 'Frosted glass cards over vibrant blurred backgrounds — pure modern luxury.',
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
    icon: Sparkles,
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    badge: 'Premium',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    rating: 4.9,
    features: ['Glass', 'Elegant', 'Luxury'],
  },
]

export default function DemoPage() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 backdrop-blur-xl rounded-full px-5 py-2 border border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/10 mb-8">
            <Eye className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Live Demos</span>
            <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] px-2 py-0">
              6 Templates
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            <span className="text-foreground">See It In</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Action
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Explore stunning example portfolios built with our platform. Each template
            is fully responsive and customizable to match your unique style.
          </p>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-8 pt-4">
            {[
              { icon: Monitor, label: 'Desktop Ready' },
              { icon: Tablet, label: 'Tablet Optimized' },
              { icon: Smartphone, label: 'Mobile Friendly' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary" />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Demo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {demos.map((demo) => (
            <Card
              key={demo.name}
              className="group relative overflow-hidden border-2 border-border bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* Thumbnail */}
              <div className={`relative aspect-video bg-gradient-to-br ${demo.gradient} overflow-hidden`}>
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
                
                {/* Glow orb */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                
                {/* Template preview mockup */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-20 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-3 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-400/60" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                      <div className="w-2 h-2 rounded-full bg-green-400/60" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 w-16 rounded bg-white/30" />
                      <div className="h-1.5 w-12 rounded bg-white/20" />
                      <div className="h-1.5 w-10 rounded bg-white/20" />
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <Badge className={`${demo.badgeColor} text-xs`}>
                    <Star className="h-3 w-3 fill-current mr-1" />
                    {demo.badge}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/30 backdrop-blur-sm">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold text-white">{demo.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-10 w-10 rounded-xl ${demo.iconBg} flex items-center justify-center border ${demo.border} group-hover:scale-110 transition-transform`}>
                    <demo.icon className={`h-5 w-5 ${demo.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {demo.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{demo.template} Template</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {demo.preview}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {demo.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-[10px] px-2 py-0 bg-primary/5 text-primary border-primary/10">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <Button className="flex-1 rounded-xl gap-2" asChild>
                    <Link href={demo.url} target="_blank">
                      <Eye className="h-4 w-4" />
                      View Demo
                      <ExternalLink className="h-3 w-3 ml-1 opacity-60" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-xl border-border hover:border-primary/30 flex-shrink-0" asChild>
                    <Link href={demo.url} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-3xl mx-auto mt-20">
          <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-purple-500/5 to-cyan-500/5 dark:from-primary/10 dark:via-purple-500/10 dark:to-cyan-500/10 backdrop-blur-xl shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_70%)]" />
            
            <div className="relative p-8 md:p-12 text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-4 py-1.5 border border-primary/20 dark:border-primary/30 mb-6">
                <Rocket className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold text-primary">Ready to Build?</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
                Create Your Own Stunning Portfolio
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
                Join thousands of developers who have already built their professional
                portfolios with our platform. Free to start, no credit card required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-2xl px-8 py-6 text-base gap-2 group" asChild>
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-border hover:border-primary/30 bg-muted/50 rounded-2xl px-8 py-6 text-base gap-2" asChild>
                  <Link href="/templates">
                    <Palette className="w-5 h-5" />
                    Browse Templates
                  </Link>
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  No credit card
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Free forever
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Cancel anytime
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}