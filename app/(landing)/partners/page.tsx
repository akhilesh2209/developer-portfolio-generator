import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Handshake, ArrowRight, Sparkles, Star } from 'lucide-react'

const partners = [
  { name: 'Vercel', logo: '▲', description: 'Deployment platform partner', tier: 'Platinum' },
  { name: 'GitHub', logo: '🐙', description: 'Source control integration partner', tier: 'Platinum' },
  { name: 'Stripe', logo: '💳', description: 'Payment processing partner', tier: 'Gold' },
  { name: 'Sentry', logo: '🔍', description: 'Error monitoring partner', tier: 'Gold' },
  { name: 'Algolia', logo: '🔎', description: 'Search infrastructure partner', tier: 'Silver' },
  { name: 'DigitalOcean', logo: '🌊', description: 'Cloud hosting partner', tier: 'Silver' },
]

export default function PartnersPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/10 mb-8">
            <Handshake className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary">Partners</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">Our Partners</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We partner with the best tools and platforms to give you a seamless experience.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {partners.map((partner) => (
            <Card key={partner.name} className="p-6 border-border bg-card hover:border-primary/30 transition-all text-center">
              <div className="text-4xl mb-4">{partner.logo}</div>
              <h3 className="font-bold text-foreground">{partner.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{partner.description}</p>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">{partner.tier}</span>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Become a Partner</h2>
          <p className="text-muted-foreground mb-6">Interested in partnering with us? We'd love to hear from you.</p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-2xl px-8 py-6 text-base gap-2" asChild>
            <Link href="/contact">Contact Us <ArrowRight className="w-5 h-5" /></Link>
          </Button>
        </div>
      </div>
    </div>
  )
}