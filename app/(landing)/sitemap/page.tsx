import Link from 'next/link'

const sitemap = {
  'Main Pages': ['/', '/demo', '/pricing', '/docs', '/blog'],
  'Dashboard': ['/dashboard', '/dashboard/projects', '/dashboard/analytics', '/dashboard/deploy', '/dashboard/resume', '/dashboard/templates', '/dashboard/compare', '/dashboard/roast', '/dashboard/settings'],
  'Account': ['/login', '/signup'],
  'Company': ['/about', '/careers', '/contact', '/partners', '/changelog'],
  'Resources': ['/docs', '/guides', '/blog', '/community', '/api'],
  'Legal': ['/privacy', '/terms', '/cookies', '/gdpr', '/security'],
  'Support': ['/support', '/contact', '/status'],
}

export default function SitemapPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />
      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32 max-w-3xl">
        <h1 className="text-4xl font-black text-foreground mb-8 text-center">Sitemap</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(sitemap).map(([category, links]) => (
            <div key={category}>
              <h2 className="font-bold text-foreground mb-3">{category}</h2>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link href={link} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}