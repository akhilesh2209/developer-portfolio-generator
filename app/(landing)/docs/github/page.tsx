import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Github, Star, GitFork, Code2, ArrowRight, Clock, CheckCircle2 } from 'lucide-react'

const features = [
  { title: 'Auto-Import Repositories', desc: 'All your public repositories are automatically imported when you connect your GitHub account.' },
  { title: 'Star & Fork Counts', desc: 'Your repository stars and forks are displayed on your portfolio automatically.' },
  { title: 'Language Detection', desc: 'We detect the programming languages used across your repositories.' },
  { title: 'Project Descriptions', desc: 'Use your existing GitHub descriptions or generate AI-powered ones.' },
  { title: 'Visibility Control', desc: 'Choose which repositories appear on your portfolio with a simple toggle.' },
]

export default function GitHubIntegrationPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
        <Link href="/docs" className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />Back to Documentation
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center border border-purple-300 dark:border-purple-500/20">
              <Github className="h-7 w-7 text-purple-500 dark:text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-500/20">Popular</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />6 articles</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-foreground">GitHub Integration</h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">Connect your GitHub account, sync repositories, and auto-import projects seamlessly.</p>
        </div>

        <div className="space-y-4 mb-12">
          {features.map((f, i) => (
            <Card key={i} className="p-5 border-border bg-card hover:border-primary/30 transition-all">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center p-8 rounded-2xl bg-purple-50 dark:bg-purple-500/5 border border-purple-200 dark:border-purple-500/20">
          <h3 className="text-xl font-bold text-foreground mb-2">Connect Your GitHub</h3>
          <p className="text-muted-foreground mb-6">Link your account to get started with auto-import.</p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-xl gap-2" asChild>
            <Link href="/dashboard"><Github className="h-4 w-4" />Go to Dashboard <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  )
}