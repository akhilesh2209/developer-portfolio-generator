import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'

export default function DocsSecurityPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />
      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
        <Link href="/docs" className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />Back to Documentation
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-14 w-14 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center border border-blue-300 dark:border-blue-500/20">
            <Shield className="h-7 w-7 text-blue-500 dark:text-blue-400" />
          </div>
          <div>
            <Badge className="bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-500/20 mb-1">Security</Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-foreground">Security</h1>
          </div>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">Learn about our security practices and how we protect your data.</p>
        <Card className="p-6 border-border bg-card">
          <ul className="space-y-3 text-muted-foreground">
            <li>• 256-bit SSL encryption for all data transfers</li>
            <li>• Regular security audits and penetration testing</li>
            <li>• Two-factor authentication support</li>
            <li>• GDPR and CCPA compliant data handling</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}