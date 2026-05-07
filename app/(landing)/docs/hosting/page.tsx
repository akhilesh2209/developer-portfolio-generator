import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Cloud } from 'lucide-react'

export default function HostingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />
      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
        <Link href="/docs" className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />Back to Documentation
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-14 w-14 rounded-2xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center border border-purple-300 dark:border-purple-500/20">
            <Cloud className="h-7 w-7 text-purple-500 dark:text-purple-400" />
          </div>
          <div>
            <Badge className="bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-500/20 mb-1">Hosting</Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-foreground">Hosting Options</h1>
          </div>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">Explore all the platforms where you can host your portfolio.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {['Vercel', 'GitHub Pages', 'Netlify', 'Custom Server'].map((h) => (
            <Card key={h} className="p-4 border-border bg-card text-center">
              <p className="font-semibold text-foreground">{h}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}