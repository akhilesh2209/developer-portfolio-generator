import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Palette, ArrowRight, Clock, CheckCircle2, Eye } from 'lucide-react'

const templates = [
  { name: 'Minimal Developer', desc: 'Clean, typography-focused layout. Perfect for developers who believe less is more.', icon: '✨', accent: 'border-blue-200 dark:border-blue-500/20' },
  { name: 'Modern SaaS', desc: 'Bold gradients and glassmorphism effects. Ideal for developers who want to stand out.', icon: '🚀', accent: 'border-purple-200 dark:border-purple-500/20' },
  { name: 'Dark Hacker', desc: 'Terminal aesthetic with monospace fonts. Perfect for backend and systems developers.', icon: '💻', accent: 'border-green-200 dark:border-green-500/20' },
  { name: 'Startup Founder', desc: 'Energetic layout with big CTAs. Great for entrepreneurs and founders.', icon: '🔥', accent: 'border-orange-200 dark:border-orange-500/20' },
  { name: 'Animated Portfolio', desc: 'Smooth animations throughout. Showcase your frontend skills with style.', icon: '🎬', accent: 'border-cyan-200 dark:border-cyan-500/20' },
  { name: 'Glassmorphism', desc: 'Frosted glass over vibrant backgrounds. Modern and elegant design.', icon: '🪟', accent: 'border-violet-200 dark:border-violet-500/20' },
]

export default function TemplatesPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
        <Link href="/docs" className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />Back to Documentation
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-pink-100 dark:bg-pink-500/10 flex items-center justify-center border border-pink-300 dark:border-pink-500/20">
              <Palette className="h-7 w-7 text-pink-500 dark:text-pink-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-300 dark:border-pink-500/20">Featured</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />8 articles</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-foreground">Templates & Themes</h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">Explore all 6 templates and learn how to customize every aspect to match your style.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {templates.map((t) => (
            <Card key={t.name} className={`p-5 border-2 ${t.accent} bg-card hover:shadow-xl transition-all`}>
              <div className="text-3xl mb-3">{t.icon}</div>
              <h3 className="font-bold text-foreground mb-2">{t.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
            </Card>
          ))}
        </div>

        <div className="text-center p-8 rounded-2xl bg-pink-50 dark:bg-pink-500/5 border border-pink-200 dark:border-pink-500/20">
          <h3 className="text-xl font-bold text-foreground mb-2">Preview All Templates</h3>
          <p className="text-muted-foreground mb-6">Browse our template gallery and find your perfect match.</p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-xl gap-2" asChild>
            <Link href="/dashboard/templates"><Eye className="h-4 w-4" />View Templates <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  )
}