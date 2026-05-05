import { Lock } from 'lucide-react'

export default function SecurityPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />
      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-red-100 dark:bg-red-500/10 flex items-center justify-center border border-red-300 dark:border-red-500/20">
            <Lock className="h-6 w-6 text-red-500 dark:text-red-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-foreground">Security</h1>
            <p className="text-sm text-muted-foreground">How we protect your data</p>
          </div>
        </div>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Our Security Practices</h2>
            <p className="text-muted-foreground leading-relaxed">We use 256-bit encryption, regular security audits, and follow industry best practices. Report vulnerabilities to security@folioforge.dev.</p>
          </section>
        </div>
      </div>
    </div>
  )
}