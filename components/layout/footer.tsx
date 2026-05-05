import Link from 'next/link'
import {
  Github, Linkedin, Twitter, Sparkles, ArrowUpRight,
  Heart, Zap, Code2, Globe, Mail
} from 'lucide-react'

export function Footer() {
  const footerLinks = {
    product: {
      title: 'Product',
      links: [
        { label: 'Portfolio Builder', href: '/dashboard' },
        { label: 'Templates', href: '/dashboard/templates' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Analytics', href: '/dashboard/analytics' },
        { label: 'Changelog', href: '/changelog' },
      ],
    },
    resources: {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Guides', href: '/guides' },
        { label: 'Blog', href: '/blog' },
        { label: 'API Reference', href: '/api' },
        { label: 'Community', href: '/community' },
      ],
    },
    company: {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
        { label: 'Support', href: '/support' },
        { label: 'Partners', href: '/partners' },
      ],
    },
    legal: {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'GDPR', href: '/gdpr' },
        { label: 'Security', href: '/security' },
      ],
    },
  }

  return (
    <footer className="relative border-t border-border bg-background">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-black text-xl text-foreground tracking-tight">
                  Folio<span className="text-indigo-500 dark:text-indigo-400">Forge</span>
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Build stunning developer portfolios automatically from your GitHub profile. 
              No design skills required.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: Mail, href: 'mailto:hello@folioforge.dev', label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="h-9 w-9 rounded-lg border border-border bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-muted/50 transition-all"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-5">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      {link.label === 'Changelog' && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border pt-10 pb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-2xl bg-muted/30 border border-border">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0 border border-indigo-300 dark:border-indigo-500/20">
                <Zap className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">Stay up to date</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Get weekly updates on new features, templates, and portfolio tips.
                </p>
              </div>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 px-4 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-indigo-500/50 focus:bg-muted transition-all flex-1 sm:w-64"
              />
              <button className="h-11 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} FolioForge</span>
            <span className="text-muted-foreground/50">·</span>
            <span className="flex items-center gap-1">
              Built with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> for developers
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/status"
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              All systems operational
            </Link>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/sitemap" className="hover:text-foreground transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 right-10 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-10 w-40 h-40 bg-cyan-500/3 rounded-full blur-3xl pointer-events-none" />
      </div>
    </footer>
  )
}