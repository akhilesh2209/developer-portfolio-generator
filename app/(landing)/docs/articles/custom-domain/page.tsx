import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Globe, Eye, Clock, ArrowRight } from 'lucide-react'

export default function CustomDomainArticle() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 max-w-3xl">
        <Link href="/docs" className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />Back to Documentation
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-300 dark:border-violet-500/20">Domains</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />6 min read</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Eye className="h-3 w-3" />5.1K views</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">Setting Up a Custom Domain</h1>
          <p className="text-muted-foreground leading-relaxed">Connect your own domain name to your portfolio for a professional branded URL.</p>
        </div>

        <div className="space-y-6">
          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Step 1: Purchase a Domain</h2>
            <p className="text-muted-foreground leading-relaxed">Buy a domain from registrars like Namecheap, GoDaddy, or Google Domains. Choose a professional name like yourname.dev or yourname.com.</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Step 2: Deploy First</h2>
            <p className="text-muted-foreground leading-relaxed">Deploy your portfolio to Vercel first. You'll get a free vercel.app subdomain that you can later replace with your custom domain.</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Step 3: Configure DNS</h2>
            <p className="text-muted-foreground leading-relaxed">Add DNS records at your domain registrar. For Vercel, add an A record pointing to 76.76.21.21 and a CNAME record for www pointing to cname.vercel-dns.com.</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Step 4: Add Domain in Vercel</h2>
            <p className="text-muted-foreground leading-relaxed">In your Vercel project settings, add your custom domain. Vercel will automatically provision an SSL certificate for HTTPS.</p>
          </Card>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">Need Help with DNS?</h3>
          <p className="text-muted-foreground mb-4">Check our deployment guide for detailed DNS setup instructions.</p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-xl gap-2" asChild>
            <Link href="/dashboard/deploy"><Globe className="h-4 w-4" />Deploy Page <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  )
}