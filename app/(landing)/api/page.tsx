import { Code2 } from 'lucide-react'

export default function ApiPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />
      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 flex items-center justify-center border border-cyan-300 dark:border-cyan-500/20">
            <Code2 className="h-6 w-6 text-cyan-500 dark:text-cyan-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-foreground">API Reference</h1>
            <p className="text-sm text-muted-foreground">Integrate our API into your projects</p>
          </div>
        </div>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Getting Started</h2>
            <p className="text-muted-foreground leading-relaxed">Our REST API allows you to programmatically manage portfolios. Full documentation coming soon.</p>
          </section>
        </div>
      </div>
    </div>
  )
}