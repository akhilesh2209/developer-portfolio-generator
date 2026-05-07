import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, BarChart3, Eye, TrendingUp, Download, ArrowRight, Clock, CheckCircle2 } from 'lucide-react'

const metrics = [
  { icon: Eye, title: 'Portfolio Views', desc: 'Track how many visitors view your portfolio over time.' },
  { icon: TrendingUp, title: 'Click Analytics', desc: 'See which links get the most clicks from your portfolio.' },
  { icon: Download, title: 'Download Tracking', desc: 'Monitor how many times your resume is downloaded.' },
]

export default function AnalyticsPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
        <Link href="/docs" className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />Back to Documentation
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center border border-orange-300 dark:border-orange-500/20">
              <BarChart3 className="h-7 w-7 text-orange-500 dark:text-orange-400" />
            </div>
            <div>
              <Badge className="bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-300 dark:border-orange-500/20 mb-1">Pro</Badge>
              <h1 className="text-3xl sm:text-4xl font-black text-foreground">Analytics & Insights</h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">Track portfolio views, clicks, downloads, and visitor engagement in real-time.</p>
        </div>

        <div className="space-y-4 mb-12">
          {metrics.map((m) => (
            <Card key={m.title} className="p-5 border-border bg-card hover:border-primary/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <m.icon className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{m.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center p-8 rounded-2xl bg-orange-50 dark:bg-orange-500/5 border border-orange-200 dark:border-orange-500/20">
          <h3 className="text-xl font-bold text-foreground mb-2">View Your Analytics</h3>
          <p className="text-muted-foreground mb-6">Check your portfolio performance in the dashboard.</p>
          <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl shadow-orange-500/25 rounded-xl gap-2" asChild>
            <Link href="/dashboard/analytics"><BarChart3 className="h-4 w-4" />View Analytics <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  )
}