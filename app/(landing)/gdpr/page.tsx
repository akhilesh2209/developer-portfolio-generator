import { Shield } from 'lucide-react'

export default function GDPRPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />
      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-300 dark:border-emerald-500/20">
            <Shield className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-foreground">GDPR Compliance</h1>
            <p className="text-sm text-muted-foreground">Your data rights under GDPR</p>
          </div>
        </div>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Your GDPR Rights</h2>
            <p className="text-muted-foreground leading-relaxed">Under GDPR, you have the right to access, rectify, erase, restrict processing, and port your data. Contact us at privacy@folioforge.dev to exercise these rights.</p>
          </section>
        </div>
      </div>
    </div>
  )
}