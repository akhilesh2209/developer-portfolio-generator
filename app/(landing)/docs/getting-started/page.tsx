import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Rocket, Code2, Github, Sparkles, ArrowRight, CheckCircle2, Clock, Zap } from 'lucide-react'

const steps = [
  { step: '01', title: 'Create an Account', desc: 'Sign up with your email or GitHub account. Takes less than 30 seconds.', icon: Sparkles },
  { step: '02', title: 'Connect GitHub', desc: 'Link your GitHub account to auto-import all your repositories.', icon: Github },
  { step: '03', title: 'Fill Your Details', desc: 'Add your personal info, education, skills, and experience.', icon: Code2 },
  { step: '04', title: 'Generate Portfolio', desc: 'Choose a template and generate your portfolio with one click.', icon: Rocket },
]

export default function GettingStartedPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
        {/* Back */}
        <Link href="/docs" className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Documentation
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center border border-blue-300 dark:border-blue-500/20">
              <Rocket className="h-7 w-7 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-500/20">Quick Start</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />5 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-foreground">Getting Started</h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">Learn the basics and create your first portfolio in under 5 minutes. Follow these simple steps to get up and running.</p>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-12">
          {steps.map((s, i) => (
            <Card key={i} className="p-6 border-border bg-card hover:border-primary/30 transition-all">
              <div className="flex items-start gap-5">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-black text-lg">
                  {s.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <s.icon className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">{s.title}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-2xl bg-primary/5 border border-primary/20">
          <h3 className="text-xl font-bold text-foreground mb-2">Ready to get started?</h3>
          <p className="text-muted-foreground mb-6">Create your account and build your portfolio in minutes.</p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-xl gap-2" asChild>
            <Link href="/signup">Get Started Free <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  )
}