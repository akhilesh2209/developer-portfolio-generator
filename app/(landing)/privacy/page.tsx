import { Shield } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center border border-blue-300 dark:border-blue-500/20">
            <Shield className="h-6 w-6 text-blue-500 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-foreground">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: March 15, 2024</p>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-bold text-foreground">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              We collect information you provide directly to us, including your name, email address, GitHub username, and portfolio content. We also automatically collect certain information when you use our service, including usage data and analytics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">3. Data Storage and Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your data is stored securely using industry-standard encryption. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">4. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, correct, or delete your personal information. You can export your data at any time. To exercise these rights, please contact us at privacy@folioforge.dev.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">5. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at privacy@folioforge.dev.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}