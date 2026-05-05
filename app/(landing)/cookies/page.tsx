import { Cookie } from 'lucide-react'

export default function CookiesPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />
      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center border border-amber-300 dark:border-amber-500/20">
            <Cookie className="h-6 w-6 text-amber-500 dark:text-amber-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-foreground">Cookie Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: March 15, 2024</p>
          </div>
        </div>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">What Are Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience by remembering your preferences and understanding how you use our service.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">How We Use Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">We use essential cookies for authentication and security. We also use analytics cookies to understand how our service is used and improve it over time.</p>
          </section>
        </div>
      </div>
    </div>
  )
}