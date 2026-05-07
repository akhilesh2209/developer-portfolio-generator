import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Palette, Eye, Clock, ArrowRight } from 'lucide-react'

export default function CustomizeTemplateArticle() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 max-w-3xl">
        <Link href="/docs" className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />Back to Documentation
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-300 dark:border-pink-500/20">Templates</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />5 min read</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Eye className="h-3 w-3" />8.2K views</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">Customizing Your Portfolio Template</h1>
          <p className="text-muted-foreground leading-relaxed">Learn how to personalize every aspect of your chosen template to match your style.</p>
        </div>

        <div className="space-y-6">
          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Choosing a Template</h2>
            <p className="text-muted-foreground leading-relaxed">We offer 6 professionally designed templates: Minimal, Modern SaaS, Dark Hacker, Startup Founder, Animated, and Glassmorphism. Each template has a unique style and layout. Preview them with your actual GitHub data before making a choice.</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Personal Information</h2>
            <p className="text-muted-foreground leading-relaxed">Fill in your name, email, location, GitHub username, LinkedIn profile, and personal website. This information appears in the header and contact sections of your portfolio.</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Project Selection</h2>
            <p className="text-muted-foreground leading-relaxed">Choose which repositories to feature on your portfolio. You can select up to 2 featured projects and customize their descriptions to highlight your contributions and impact.</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Color & Theme Customization</h2>
            <p className="text-muted-foreground leading-relaxed">Each template comes with a unique color scheme. The Modern template uses indigo accents, Dark Hacker uses green monospace, and Startup uses bold orange. Choose the one that best represents your personal brand.</p>
          </Card>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">Browse Templates</h3>
          <p className="text-muted-foreground mb-4">Explore all templates and find your perfect match.</p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-xl gap-2" asChild>
            <Link href="/dashboard/templates"><Eye className="h-4 w-4" />View Templates <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  )
}