import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Github, Zap, Layout, FileText, Rocket, BarChart3, CheckCircle2 } from 'lucide-react'

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="mx-auto" variant="secondary">
              <Zap className="h-3 w-3 mr-1" />
              Powered by AI
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
              Your Perfect Portfolio, Generated in Minutes
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground text-balance leading-relaxed">
              Connect your GitHub, and let AI generate a beautiful, professional portfolio that showcases your best work. No design skills required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/demo">View Demo</Link>
              </Button>
            </div>

            <div className="pt-8 text-sm text-muted-foreground">
              <p>No credit card required • 30-day free trial</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features to build, customize, and deploy your portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Github,
                title: 'GitHub Integration',
                description: 'Automatically import your repositories, commit history, and GitHub stats with a single click.'
              },
              {
                icon: Zap,
                title: 'AI-Powered Descriptions',
                description: 'Generate compelling project descriptions automatically from your code and README files.'
              },
              {
                icon: Layout,
                title: '6 Unique Templates',
                description: 'Choose from Minimal, Modern SaaS, Dark Hacker, Startup, Animated, or Glassmorphism designs.'
              },
              {
                icon: FileText,
                title: 'Resume Generator',
                description: 'Create and download professional resumes directly from your portfolio data.'
              },
              {
                icon: Rocket,
                title: 'One-Click Deploy',
                description: 'Deploy to Vercel instantly or export as static HTML, Next.js, or a complete project.'
              },
              {
                icon: BarChart3,
                title: 'Analytics Dashboard',
                description: 'Track portfolio views, recruiter clicks, and other key metrics in real-time.'
              }
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 border border-border hover:border-primary/50 transition-colors">
                <feature.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Three Simple Steps
            </h2>
            <p className="text-lg text-muted-foreground">
              From GitHub to stunning portfolio in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '1',
                title: 'Connect GitHub',
                description: 'Sign up with your GitHub account and authorize access to your repositories.'
              },
              {
                step: '2',
                title: 'Customize & Edit',
                description: 'Choose a template, edit your about section, and arrange your best projects.'
              },
              {
                step: '3',
                title: 'Deploy & Share',
                description: 'Deploy to Vercel with one click or export your portfolio and host anywhere.'
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Style
            </h2>
            <p className="text-lg text-muted-foreground">
              Six professionally designed templates to match your personality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Minimal Developer',
              'Modern SaaS',
              'Dark Hacker',
              'Startup Founder',
              'Animated Portfolio',
              'Glassmorphism'
            ].map((template, idx) => (
              <Card key={idx} className="overflow-hidden border border-border hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-colors flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Layout className="h-8 w-8 text-primary mx-auto" />
                    <p className="text-sm font-medium">{template}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Start free, upgrade only when you need more
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Free',
                price: '$0',
                description: 'Perfect for getting started',
                features: [
                  'Basic portfolio template',
                  'GitHub integration',
                  'Up to 3 projects',
                  'Basic customization'
                ]
              },
              {
                name: 'Pro',
                price: '$9',
                period: '/month',
                description: 'For serious developers',
                features: [
                  'All Free features',
                  'All 6 premium templates',
                  'Unlimited projects',
                  'Advanced customization',
                  'Analytics dashboard',
                  'Priority support'
                ],
                highlighted: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'For teams and organizations',
                features: [
                  'All Pro features',
                  'Custom domain',
                  'Team collaboration',
                  'Custom CSS',
                  'API access',
                  'Dedicated support'
                ]
              }
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`p-8 flex flex-col border transition-all ${
                  plan.highlighted
                    ? 'border-primary ring-2 ring-primary/20 scale-105'
                    : 'border-border'
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>

                <Button
                  className="w-full mb-8"
                  variant={plan.highlighted ? 'default' : 'outline'}
                  asChild
                >
                  <Link href="/signup">Get Started</Link>
                </Button>

                <div className="space-y-3 flex-1">
                  {plan.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Showcase Your Work?
            </h2>
            <p className="text-lg text-muted-foreground">
              Create your beautiful portfolio in just a few minutes. No credit card required.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Start Building Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
