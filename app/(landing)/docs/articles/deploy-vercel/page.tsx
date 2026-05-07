import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Rocket, Eye, Clock, ArrowRight } from 'lucide-react'

export default function DeployVercelArticle() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 max-w-3xl">
        <Link href="/docs" className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />Back to Documentation
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/20">Deployment</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />4 min read</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Eye className="h-3 w-3" />6.8K views</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">Deploying to Vercel Step by Step</h1>
          <p className="text-muted-foreground leading-relaxed">Get your portfolio live on Vercel with auto-HTTPS and global CDN in under 60 seconds.</p>
        </div>

        <div className="space-y-6">
          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Step 1: Generate Your Portfolio</h2>
            <p className="text-muted-foreground leading-relaxed">First, build your portfolio using our generator. Fill in your details, select projects, choose a template, and download the HTML or deploy directly.</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Step 2: Go to Deploy Page</h2>
            <p className="text-muted-foreground leading-relaxed">Navigate to the Deploy page in your dashboard. Click the "Deploy to Vercel" button. This will open Vercel's import page with your project pre-configured.</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Step 3: Configure on Vercel</h2>
            <p className="text-muted-foreground leading-relaxed">Vercel will automatically detect your project settings. You can customize the project name and deployment settings. Click "Deploy" and your portfolio will be live in seconds.</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Step 4: Get Your URL</h2>
            <p className="text-muted-foreground leading-relaxed">Once deployed, Vercel provides a free subdomain (your-project.vercel.app). You can also add a custom domain for a professional touch.</p>
          </Card>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">Ready to Deploy?</h3>
          <p className="text-muted-foreground mb-4">Get your portfolio live in under a minute.</p>
          <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl shadow-emerald-500/25 rounded-xl gap-2" asChild>
            <Link href="/dashboard/deploy"><Rocket className="h-4 w-4" />Deploy Now <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  )
}