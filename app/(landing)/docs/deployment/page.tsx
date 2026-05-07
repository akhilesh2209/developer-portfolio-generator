import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Globe, Rocket, FileCode, Cloud, ArrowRight, Clock, CheckCircle2 } from 'lucide-react'

const options = [
  { icon: Rocket, title: 'Deploy to Vercel', desc: 'One-click deploy with auto-HTTPS, global CDN, and free subdomain. Our recommended method.', href: '/dashboard/deploy' },
  { icon: FileCode, title: 'Download HTML', desc: 'Get a standalone HTML file. Host on GitHub Pages, Netlify, or any static host.', href: '/dashboard/deploy' },
  { icon: Cloud, title: 'Custom Domain', desc: 'Connect your own domain for a professional branded URL with free SSL.', href: '/dashboard/deploy' },
]

export default function DeploymentPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
        <Link href="/docs" className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />Back to Documentation
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-300 dark:border-emerald-500/20">
              <Globe className="h-7 w-7 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div>
              <Badge className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/20 mb-1">Essential</Badge>
              <h1 className="text-3xl sm:text-4xl font-black text-foreground">Deployment Guide</h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">Deploy to Vercel, download HTML, host on GitHub Pages, or use custom domains.</p>
        </div>

        <div className="space-y-5 mb-12">
          {options.map((opt) => (
            <Card key={opt.title} className="p-6 border-border bg-card hover:border-primary/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <opt.icon className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground mb-1">{opt.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{opt.desc}</p>
                  <Button variant="outline" size="sm" className="rounded-xl border-border hover:border-primary/30" asChild>
                    <Link href={opt.href}>Learn More <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20">
          <h3 className="text-xl font-bold text-foreground mb-2">Ready to Deploy?</h3>
          <p className="text-muted-foreground mb-6">Deploy your portfolio in under 60 seconds.</p>
          <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl shadow-emerald-500/25 rounded-xl gap-2" asChild>
            <Link href="/dashboard/deploy"><Rocket className="h-4 w-4" />Deploy Now <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  )
}