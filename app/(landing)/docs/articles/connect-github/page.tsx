import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Github, Eye, Clock, Calendar, ArrowRight } from 'lucide-react'

export default function ConnectGitHubArticle() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 max-w-3xl">
        <Link href="/docs" className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Documentation
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-500/20">GitHub</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />3 min read</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Eye className="h-3 w-3" />12.5K views</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">How to Connect Your GitHub Account</h1>
          <p className="text-muted-foreground leading-relaxed">Learn how to link your GitHub account to automatically import all your repositories.</p>
        </div>

        {/* Article Content */}
        <div className="space-y-6">
          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Step 1: Navigate to Dashboard</h2>
            <p className="text-muted-foreground leading-relaxed">After logging in, go to your Dashboard. If you haven't connected GitHub yet, you'll see a prompt to connect your account. Click on the "Connect GitHub" button.</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Step 2: Enter Your GitHub Username</h2>
            <p className="text-muted-foreground leading-relaxed">A modal will appear asking for your GitHub username. Enter your exact GitHub username (e.g., "torvalds" not "Linus Torvalds"). The system will fetch all your public repositories automatically.</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Step 3: Repository Import</h2>
            <p className="text-muted-foreground leading-relaxed">Once connected, all your public repositories will be imported automatically. You'll see them in your Projects page with stars, language, and description data. You can toggle visibility for each repository.</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Step 4: Manage Your Projects</h2>
            <p className="text-muted-foreground leading-relaxed">Go to the Projects page to manage your repositories. You can show/hide projects, generate AI descriptions, and select which projects appear on your portfolio.</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Troubleshooting</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Make sure your GitHub profile is public</li>
              <li>• Check that you have public repositories</li>
              <li>• Verify the username spelling (case-sensitive)</li>
              <li>• Ensure you have a stable internet connection</li>
            </ul>
          </Card>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">Ready to Connect?</h3>
          <p className="text-muted-foreground mb-4">Link your GitHub account now and start building your portfolio.</p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-xl gap-2" asChild>
            <Link href="/dashboard"><Github className="h-4 w-4" />Go to Dashboard <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  )
}