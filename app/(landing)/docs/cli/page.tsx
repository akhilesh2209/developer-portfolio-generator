import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Terminal } from 'lucide-react'

export default function CLIPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
        <Link href="/docs" className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />Back to Documentation
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-green-100 dark:bg-green-500/10 flex items-center justify-center border border-green-300 dark:border-green-500/20">
              <Terminal className="h-7 w-7 text-green-500 dark:text-green-400" />
            </div>
            <div>
              <Badge className="bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-300 dark:border-green-500/20 mb-1">CLI</Badge>
              <h1 className="text-3xl sm:text-4xl font-black text-foreground">CLI Guide</h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">Use our command-line interface to manage your portfolio directly from the terminal.</p>
        </div>

        <Card className="p-6 border-border bg-card mb-4">
          <h3 className="font-bold text-foreground mb-2">Installation</h3>
          <code className="text-sm bg-muted/50 px-3 py-1.5 rounded-lg block text-foreground">npm install -g folioforge-cli</code>
        </Card>

        <Card className="p-6 border-border bg-card mb-4">
          <h3 className="font-bold text-foreground mb-2">Generate Portfolio</h3>
          <code className="text-sm bg-muted/50 px-3 py-1.5 rounded-lg block text-foreground">folioforge generate --template modern</code>
        </Card>

        <Card className="p-6 border-border bg-card">
          <h3 className="font-bold text-foreground mb-2">Deploy</h3>
          <code className="text-sm bg-muted/50 px-3 py-1.5 rounded-lg block text-foreground">folioforge deploy --platform vercel</code>
        </Card>
      </div>
    </div>
  )
}