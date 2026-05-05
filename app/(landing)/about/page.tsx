import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  Sparkles, ArrowRight, Users, Target, Heart,
  Github, Twitter, Linkedin, Globe, Zap
} from 'lucide-react'

export default function AboutPage() {
  const team = [
    { name: 'Alex Johnson', role: 'Founder & CEO', avatar: 'AJ' },
    { name: 'Sarah Chen', role: 'CTO', avatar: 'SC' },
    { name: 'Marcus Williams', role: 'Head of Design', avatar: 'MW' },
    { name: 'Priya Patel', role: 'Lead Engineer', avatar: 'PP' },
  ]

  const values = [
    { icon: Zap, title: 'Speed', desc: 'We believe developers should spend time building, not formatting resumes.' },
    { icon: Users, title: 'Community', desc: 'Built by developers, for developers. Open source at heart.' },
    { icon: Target, title: 'Quality', desc: 'Every template is crafted to help you stand out to recruiters.' },
    { icon: Heart, title: 'Passion', desc: 'We love helping developers showcase their best work.' },
  ]

  const stats = [
    { value: '5,000+', label: 'Developers' },
    { value: '10K+', label: 'Portfolios Created' },
    { value: '6', label: 'Templates' },
    { value: '99.9%', label: 'Uptime' },
  ]

  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 backdrop-blur-xl rounded-full px-5 py-2 border border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/10 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">About Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            <span className="text-foreground">Our</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">Mission</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're on a mission to help every developer build a stunning portfolio that showcases their skills and lands their dream job.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 text-center border-border bg-card">
              <p className="text-3xl font-black text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Values */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="p-6 border-border bg-card text-center hover:border-primary/30 transition-all">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="p-6 border-border bg-card text-center hover:border-primary/30 transition-all">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  {member.avatar}
                </div>
                <h3 className="font-bold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to build your portfolio?</h2>
          <p className="text-muted-foreground mb-8">Join thousands of developers who've already created stunning portfolios.</p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-2xl px-8 py-6 text-base gap-2" asChild>
            <Link href="/signup">Get Started Free <ArrowRight className="w-5 h-5" /></Link>
          </Button>
        </div>
      </div>
    </div>
  )
}