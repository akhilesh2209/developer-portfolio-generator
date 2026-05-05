import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LifeBuoy, Mail, MessageSquare, BookOpen, ArrowRight } from 'lucide-react'

export default function SupportPage() {
  const options = [
    { icon: BookOpen, title: 'Documentation', desc: 'Browse our detailed docs', href: '/docs', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/10' },
    { icon: Mail, title: 'Email Support', desc: 'hello@folioforge.dev', href: 'mailto:hello@folioforge.dev', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-500/10' },
    { icon: MessageSquare, title: 'Community', desc: 'Join our community forum', href: '/community', color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-500/10' },
  ]

  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />
      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32 max-w-3xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/10 mb-8">
            <LifeBuoy className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary">Support</span>
          </div>
          <h1 className="text-4xl font-black text-foreground mb-4">How Can We Help?</h1>
          <p className="text-lg text-muted-foreground">We're here to help you build the perfect portfolio</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {options.map((opt) => (
            <Card key={opt.title} className="p-6 text-center border-border bg-card hover:border-primary/30 transition-all">
              <div className={`h-12 w-12 rounded-xl ${opt.bg} flex items-center justify-center mx-auto mb-4`}>
                <opt.icon className={`h-6 w-6 ${opt.color}`} />
              </div>
              <h3 className="font-bold text-foreground mb-1">{opt.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{opt.desc}</p>
              <Button variant="outline" size="sm" className="rounded-xl border-border hover:border-primary/30" asChild>
                <Link href={opt.href}>Go <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}