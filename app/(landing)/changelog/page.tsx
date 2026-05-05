import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Zap, Bug, Star } from 'lucide-react'

const changelog = [
  {
    version: 'v2.0.0',
    date: 'March 15, 2024',
    type: 'major',
    changes: [
      { type: 'feature', text: 'Added AI-powered project description generator' },
      { type: 'feature', text: 'New Glassmorphism template added' },
      { type: 'feature', text: 'Portfolio roast feature with detailed scoring' },
      { type: 'improvement', text: 'Redesigned dashboard with dark/light mode support' },
      { type: 'improvement', text: 'Improved GitHub integration speed by 40%' },
      { type: 'fix', text: 'Fixed resume download formatting issues' },
    ],
  },
  {
    version: 'v1.9.0',
    date: 'March 1, 2024',
    type: 'minor',
    changes: [
      { type: 'feature', text: 'GitHub Battle - compare your profile with others' },
      { type: 'feature', text: 'Dev Card Generator for social sharing' },
      { type: 'improvement', text: 'Enhanced analytics with traffic source tracking' },
      { type: 'fix', text: 'Fixed template preview on mobile devices' },
    ],
  },
  {
    version: 'v1.8.0',
    date: 'February 15, 2024',
    type: 'minor',
    changes: [
      { type: 'feature', text: 'Custom domain support for Pro users' },
      { type: 'feature', text: 'Bulk project management tools' },
      { type: 'improvement', text: 'Faster page load times with optimized assets' },
    ],
  },
]

const typeIcons: Record<string, any> = {
  feature: Sparkles,
  improvement: Star,
  fix: Bug,
}

const typeColors: Record<string, string> = {
  feature: 'text-blue-500 bg-blue-100 dark:bg-blue-500/10',
  improvement: 'text-amber-500 bg-amber-100 dark:bg-amber-500/10',
  fix: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-500/10',
}

export default function ChangelogPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/10 mb-8">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary">Changelog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">What's New</h1>
          <p className="text-lg text-muted-foreground">Stay up to date with the latest features and improvements</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {changelog.map((release) => (
            <Card key={release.version} className="border-border bg-card overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/30">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary text-primary-foreground font-bold">{release.version}</Badge>
                    <Badge variant="outline" className="capitalize">{release.type} Release</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{release.date}</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {release.changes.map((change, i) => {
                  const Icon = typeIcons[change.type]
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`h-6 w-6 rounded-lg ${typeColors[change.type]} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-sm text-foreground">{change.text}</p>
                    </div>
                  )
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}