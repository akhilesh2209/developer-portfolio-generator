import { FileText } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center border border-violet-300 dark:border-violet-500/20">
            <FileText className="h-6 w-6 text-violet-500 dark:text-violet-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-foreground">Terms of Service</h1>
            <p className="text-sm text-muted-foreground">Last updated: March 15, 2024</p>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-bold text-foreground">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using Portfolio Generator, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">2. Account Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">3. Service Usage</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are provided "as is." We reserve the right to modify, suspend, or discontinue any aspect of the service at any time. You agree not to misuse our services or help anyone else do so.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">4. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              You retain ownership of your portfolio content. We claim no intellectual property rights over the material you create using our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">5. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Portfolio Generator shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the service.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}