// Navigation items
export const NAVIGATION_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/generate', label: 'Generate' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/docs', label: 'Docs' },
] as const

// Dashboard navigation items — all features included
export const DASHBOARD_NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/projects', label: 'Projects', icon: '📁' },
  { href: '/dashboard/templates', label: 'Templates', icon: '🎨' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: '📈' },
  { href: '/dashboard/resume', label: 'Resume', icon: '📄' },
  { href: '/dashboard/deploy', label: 'Deploy', icon: '🚀' },
  { href: '/dashboard/roast', label: 'Roast Me 🔥', icon: '🔥' },
  { href: '/dashboard/compare', label: 'GitHub Battle', icon: '⚔️' },
  { href: '/dashboard/card', label: 'Dev Card', icon: '🃏' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
] as const

// Pricing plans
export const PRICING_PLANS = [
  {
    name: 'Free',
    price: '$0',
    features: [
      '1 Portfolio',
      '3 Templates',
      'Basic Analytics',
      'Community Support',
      'Dev Card',
      'Portfolio Roaster',
    ],
  },
  {
    name: 'Pro',
    price: '$9',
    features: [
      '5 Portfolios',
      'All 6 Templates',
      'Advanced Analytics',
      'Priority Support',
      'Custom Domain',
      'GitHub Battle',
      'All Features Unlocked',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Unlimited Portfolios',
      'All Templates',
      'Full Analytics',
      'Dedicated Support',
      'Custom Branding',
      'API Access',
    ],
  },
] as const

// Features list
export const FEATURES = [
  { icon: 'github', title: 'GitHub Integration', description: 'Automatically import your projects, stats, and contributions' },
  { icon: 'palette', title: 'Beautiful Templates', description: 'Choose from 6 professionally designed portfolio templates' },
  { icon: 'chart', title: 'Analytics', description: 'Track portfolio views, visitor analytics, and engagement' },
  { icon: 'rocket', title: 'One-Click Deploy', description: 'Deploy to Vercel, GitHub Pages, or your custom domain' },
  { icon: 'flame', title: 'Portfolio Roaster', description: 'Get brutally honest AI feedback on your GitHub profile with a score' },
  { icon: 'swords', title: 'GitHub Battle', description: 'Compare your GitHub stats vs any other developer head-to-head' },
  { icon: 'card', title: 'Dev Card', description: 'Generate a beautiful shareable developer identity card' },
  { icon: 'download', title: 'Resume Generator', description: 'Generate and download professional resumes with one click' },
] as const

// Template list
export const TEMPLATES = [
  { name: 'Minimal', desc: 'Clean and simple' },
  { name: 'Modern SaaS', desc: 'Bold and professional' },
  { name: 'Dark Hacker', desc: 'Sleek and mysterious' },
  { name: 'Startup', desc: 'Energetic and vibrant' },
  { name: 'Animated', desc: 'Dynamic and engaging' },
  { name: 'Glassmorphism', desc: 'Modern and elegant' },
] as const

// Social links
export const SOCIAL_LINKS = [
  { platform: 'GitHub', url: 'https://github.com', icon: 'github' },
  { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
  { platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
] as const