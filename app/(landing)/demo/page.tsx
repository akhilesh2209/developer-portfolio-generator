import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Demo - Portfolio Generator',
  description: 'See example portfolios created with our platform',
}

export default function DemoPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">See It In Action</h1>
          <p className="text-lg text-muted-foreground">
            Explore example portfolios created with our platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: 'Modern SaaS Developer',
              template: 'Modern SaaS',
              url: 'https://example-modern.vercel.app',
              preview: 'Clean, professional design with smooth animations'
            },
            {
              name: 'Dark Hacker Portfolio',
              template: 'Dark Hacker',
              url: 'https://example-hacker.vercel.app',
              preview: 'Bold dark theme with neon accents and code showcase'
            },
            {
              name: 'Startup Founder',
              template: 'Startup',
              url: 'https://example-startup.vercel.app',
              preview: 'Bold colors and modern layout perfect for entrepreneurs'
            },
            {
              name: 'Minimal Developer',
              template: 'Minimal',
              url: 'https://example-minimal.vercel.app',
              preview: 'Clean and simple design focused on work quality'
            },
            {
              name: 'Animated Portfolio',
              template: 'Animated',
              url: 'https://example-animated.vercel.app',
              preview: 'Smooth animations and interactive elements'
            },
            {
              name: 'Glassmorphism Design',
              template: 'Glassmorphism',
              url: 'https://example-glass.vercel.app',
              preview: 'Modern glass effect with frosted backgrounds'
            }
          ].map((demo, idx) => (
            <Card key={idx} className="p-6 hover:border-primary transition-colors">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded mb-4 flex items-center justify-center">
                <p className="text-sm font-medium text-center">{demo.template} Template</p>
              </div>
              <h3 className="font-bold mb-2">{demo.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{demo.preview}</p>
              <Button className="w-full" asChild>
                <Link href={demo.url} target="_blank">
                  View Demo
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">
            Ready to create your own portfolio?
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">Get Started Free</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
