import { useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle2, Sparkles, Zap, Crown, Star, ArrowRight,
  Shield, HelpCircle, ChevronDown, Heart, Users, Globe,
  Rocket, Code2, Palette, TrendingUp, Lock
} from 'lucide-react'
import Link from 'next/link'

function FloatingParticles() {
  const particles = useMemo(() => {
    const seed = 42
    const random = (index: number) => {
      const x = Math.sin(seed + index) * 10000
      return x - Math.floor(x)
    }
    
    return [...Array(8)].map((_, i) => ({
      id: i,
      left: `${random(i) * 100}%`,
      top: `${random(i + 8) * 100}%`,
      size: random(i + 16) * 200 + 150,
      color: i % 3 === 0 ? 'rgba(99,102,241,0.08)' : i % 3 === 1 ? 'rgba(139,92,246,0.06)' : 'rgba(6,182,212,0.04)',
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full blur-3xl"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: `radial-gradient(circle, ${p.color}, transparent)` }}
        />
      ))}
    </div>
  )
}

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      icon: Zap,
      iconColor: 'text-emerald-500 dark:text-emerald-400',
      iconBg: 'bg-emerald-100 dark:bg-emerald-500/10',
      border: 'border-emerald-200 dark:border-emerald-500/20',
      gradient: 'from-emerald-50 to-green-50 dark:from-emerald-500/5 dark:to-green-500/5',
      badge: null,
      features: [
        '1 Portfolio site',
        '3 Free templates',
        'GitHub integration',
        'Up to 5 projects',
        'Basic customization',
        'HTML download',
        'Community support',
      ],
      cta: 'Get Started Free',
      ctaVariant: 'outline' as const,
    },
    {
      name: 'Pro',
      price: '$9',
      period: '/month',
      description: 'For serious developers',
      icon: Crown,
      iconColor: 'text-indigo-500 dark:text-indigo-400',
      iconBg: 'bg-indigo-100 dark:bg-indigo-500/20',
      border: 'border-indigo-300 dark:border-indigo-500/30',
      gradient: 'from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10',
      badge: 'Most Popular',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      features: [
        'Everything in Free',
        'All 6 premium templates',
        'Unlimited projects',
        'Full analytics dashboard',
        'AI project descriptions',
        'Custom domain support',
        'Resume generator',
        'Priority support',
        'Deploy to Vercel',
        'Remove branding',
      ],
      cta: 'Start Pro Plan',
      ctaVariant: 'default' as const,
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For teams & organizations',
      icon: Globe,
      iconColor: 'text-violet-500 dark:text-violet-400',
      iconBg: 'bg-violet-100 dark:bg-violet-500/10',
      border: 'border-violet-200 dark:border-violet-500/20',
      gradient: 'from-violet-50 to-purple-50 dark:from-violet-500/5 dark:to-purple-500/5',
      badge: null,
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom CSS & JS',
        'API access',
        'White-label options',
        'Dedicated support',
        'SLA agreement',
        'Advanced analytics',
        'SSO integration',
        'Unlimited members',
      ],
      cta: 'Contact Sales',
      ctaVariant: 'outline' as const,
    },
  ]

  const faqs = [
    { q: 'Can I change my plan later?', a: 'Absolutely! You can upgrade or downgrade at any time. Changes take effect at your next billing cycle.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for Enterprise plans.' },
    { q: 'Is there a money-back guarantee?', a: 'Yes! We offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund your payment in full.' },
    { q: 'Do you offer student discounts?', a: 'Yes! Students with a valid .edu email get 50% off the Pro plan. Contact support to verify your status.' },
    { q: 'Can I host on my own domain?', a: 'Pro and Enterprise plans support custom domains. We provide detailed DNS setup guides for all major registrars.' },
    { q: 'What happens to my data if I cancel?', a: 'Your portfolio remains downloadable. We retain your data for 30 days after cancellation in case you want to return.' },
  ]

  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <FloatingParticles />

      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 dark:bg-indigo-500/20 backdrop-blur-xl rounded-full px-5 py-2 border border-indigo-500/20 dark:border-indigo-500/30 shadow-lg shadow-indigo-500/10 mb-6">
            <Sparkles className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">Pricing Plans</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            <span className="text-foreground">Simple, Transparent</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">Pricing</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose the perfect plan for your needs. No hidden fees, cancel anytime.
          </p>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" />No credit card required</span>
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-emerald-500" />30-day guarantee</span>
            <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-emerald-500" />Cancel anytime</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-24">
          {plans.map((plan) => (
            <div key={plan.name} className="relative group">
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <Badge className={`${plan.badgeColor} px-4 py-1.5 text-xs font-bold shadow-lg`}>
                    <Star className="h-3 w-3 fill-current mr-1" />{plan.badge}
                  </Badge>
                </div>
              )}

              <Card className={`relative h-full overflow-hidden border-2 transition-all duration-300 ${
                plan.highlighted
                  ? `${plan.border} bg-gradient-to-br ${plan.gradient} shadow-2xl shadow-indigo-500/10 scale-[1.02] lg:scale-105`
                  : 'border-border bg-muted/30 dark:bg-white/[0.02] hover:border-primary/30'
              }`}>
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                )}

                <div className="relative p-6 lg:p-8 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`h-12 w-12 rounded-xl ${plan.iconBg} flex items-center justify-center border ${plan.border}`}>
                      <plan.icon className={`h-6 w-6 ${plan.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-foreground">{plan.price}</span>
                      {plan.period && <span className="text-lg text-muted-foreground">{plan.period}</span>}
                    </div>
                    {plan.price === 'Custom' && <p className="text-sm text-muted-foreground mt-1">Tailored to your needs</p>}
                  </div>

                  <Button
                    className={`w-full mb-8 rounded-xl h-12 text-sm font-semibold ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-500/25'
                        : 'border-border hover:border-primary/30 bg-muted/50'
                    }`}
                    variant={plan.ctaVariant}
                    asChild
                  >
                    <Link href="/signup">{plan.cta}<ArrowRight className="h-4 w-4 ml-2" /></Link>
                  </Button>

                  <div className="space-y-3 flex-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">What's included</p>
                    {plan.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-3 group/item">
                        <CheckCircle2 className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                          plan.highlighted ? 'text-indigo-500 dark:text-indigo-400' : 'text-emerald-500 dark:text-emerald-400'
                        }`} />
                        <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.highlighted && (
                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-40 h-20 bg-indigo-500/20 blur-3xl rounded-full" />
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="max-w-3xl mx-auto mb-24">
          <Card className="relative overflow-hidden border-2 border-border bg-card">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(139,92,246,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_100%_0%,rgba(139,92,246,0.1),transparent_50%)]" />
            
            <div className="relative p-8 md:p-10 text-center">
              <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-500/10 border border-violet-300 dark:border-violet-500/20 rounded-full px-4 py-1.5 mb-6">
                <Users className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />
                <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">For Teams</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Need a Custom Plan?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
                We offer tailored solutions for teams and organizations with custom requirements, dedicated support, and flexible pricing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-xl shadow-violet-500/25 rounded-xl px-8 gap-2">
                  <Rocket className="h-4 w-4" />Contact Sales<ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="border-border hover:border-primary/30 bg-muted/50 rounded-xl px-8">Schedule a Demo</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/20 rounded-full px-4 py-1.5 mb-6">
              <HelpCircle className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />
              <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about our pricing</p>
          </div>

          <div className="grid gap-4">
            {faqs.map((item, idx) => (
              <details key={idx} className="group">
                <summary className="flex items-center justify-between p-5 rounded-2xl border border-border bg-muted/30 dark:bg-white/[0.02] hover:border-primary/30 cursor-pointer transition-all list-none">
                  <h3 className="font-semibold text-foreground pr-4">{item.q}</h3>
                  <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-24">
          <p className="text-muted-foreground text-sm mb-4">Still have questions? We're here to help.</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Link href="/contact" className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors font-medium">Contact Support →</Link>
            <span className="text-muted-foreground/50">|</span>
            <Link href="/docs" className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors font-medium">View Documentation →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}