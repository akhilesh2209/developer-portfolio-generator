import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Play, Clock } from 'lucide-react'

const videos = [
  { title: 'Getting Started with Portfolio Generator', duration: '4:32', icon: '🎬' },
  { title: 'Connecting Your GitHub Account', duration: '2:15', icon: '🐙' },
  { title: 'Choosing the Perfect Template', duration: '3:48', icon: '🎨' },
  { title: 'Deploying to Vercel', duration: '5:20', icon: '🚀' },
  { title: 'Generating Your ATS Resume', duration: '3:10', icon: '📄' },
]

export default function VideosPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
        <Link href="/docs" className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />Back to Documentation
        </Link>

        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">Video Tutorials</h1>
          <p className="text-lg text-muted-foreground">Watch step-by-step video guides to master every feature.</p>
        </div>

        <div className="space-y-3">
          {videos.map((v) => (
            <Card key={v.title} className="p-5 border-border bg-card hover:border-primary/30 transition-all flex items-center gap-4">
              <div className="h-16 w-24 rounded-xl bg-muted/50 flex items-center justify-center text-2xl flex-shrink-0">{v.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{v.title}</h3>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{v.duration}</span>
              </div>
              <Play className="h-8 w-8 text-primary" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}