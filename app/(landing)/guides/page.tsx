import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { BookOpen, ArrowRight, Clock, Star } from 'lucide-react'

const guides = [
  { title: 'Complete Guide to Building a Developer Portfolio', category: 'Beginner', readTime: '15 min', rating: 4.9, href: '/guides/build-portfolio', icon: '📘' },
  { title: 'How to Write an ATS-Friendly Resume', category: 'Resume', readTime: '10 min', rating: 4.8, href: '/guides/ats-resume', icon: '📝' },
  { title: 'GitHub Profile Optimization Guide', category: 'GitHub', readTime: '12 min', rating: 4.7, href: '/guides/github-profile', icon: '🐙' },
  { title: 'Deploying Your Portfolio to Vercel', category: 'Deployment', readTime: '8 min', rating: 4.9, href: '/guides/deploy-vercel', icon: '🚀' },
  { title: 'Custom Domain Setup Guide', category: 'Advanced', readTime: '6 min', rating: 4.6, href: '/guides/custom-domain', icon: '🌐' },
  { title: 'Portfolio Analytics: Tracking Your Visitors', category: 'Analytics', readTime: '7 min', rating: 4.8, href: '/guides/analytics', icon: '📊' },
]

export default function GuidesPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/10 mb-8">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary">Guides</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">Step-by-Step Guides</h1>
          <p className="text-lg text-muted-foreground">Detailed tutorials to help you build the perfect portfolio</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {guides.map((guide) => (
            <Link key={guide.title} href={guide.href}>
              <Card className="h-full border-border bg-card hover:border-primary/30 hover:shadow-xl transition-all group p-6">
                <div className="text-3xl mb-4">{guide.icon}</div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">{guide.category}</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{guide.readTime}</span>
                </div>
                <h2 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2">{guide.title}</h2>
                <div className="flex items-center gap-1 text-sm text-amber-500">
                  <Star className="h-4 w-4 fill-current" /><span className="font-semibold">{guide.rating}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}