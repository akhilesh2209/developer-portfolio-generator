import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Clock, User, Calendar } from 'lucide-react'

const posts = [
  {
    title: 'How to Build a Developer Portfolio That Gets You Hired',
    excerpt: 'Learn the key elements that make a portfolio stand out to recruiters and hiring managers.',
    author: 'Sarah Chen',
    date: 'Mar 15, 2024',
    readTime: '8 min read',
    category: 'Career',
    image: '📝',
    href: '/blog/build-portfolio',
  },
  {
    title: 'The Ultimate Guide to ATS-Friendly Resumes',
    excerpt: 'Make sure your resume passes through applicant tracking systems with these proven tips.',
    author: 'Marcus Williams',
    date: 'Mar 10, 2024',
    readTime: '6 min read',
    category: 'Resume',
    image: '📄',
    href: '/blog/ats-resume-guide',
  },
  {
    title: '6 Portfolio Templates That Will Impress Recruiters',
    excerpt: 'Explore our most popular templates and learn which one is right for your style.',
    author: 'Alex Johnson',
    date: 'Mar 8, 2024',
    readTime: '5 min read',
    category: 'Design',
    image: '🎨',
    href: '/blog/portfolio-templates',
  },
  {
    title: 'Deploying Your Portfolio: Vercel vs GitHub Pages',
    excerpt: 'A detailed comparison of the best platforms to host your developer portfolio.',
    author: 'Priya Patel',
    date: 'Mar 5, 2024',
    readTime: '7 min read',
    category: 'Deployment',
    image: '🚀',
    href: '/blog/deploy-comparison',
  },
  {
    title: 'How to Write Project Descriptions That Sell Your Skills',
    excerpt: 'Craft compelling project descriptions that demonstrate your impact and expertise.',
    author: 'Sarah Chen',
    date: 'Mar 1, 2024',
    readTime: '4 min read',
    category: 'Career',
    image: '✍️',
    href: '/blog/project-descriptions',
  },
  {
    title: 'Open Source Contributions: Boosting Your Portfolio',
    excerpt: 'Why contributing to open source is one of the best ways to enhance your portfolio.',
    author: 'Marcus Williams',
    date: 'Feb 25, 2024',
    readTime: '6 min read',
    category: 'Open Source',
    image: '🌟',
    href: '/blog/open-source',
  },
]

export default function BlogPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/10 mb-8">
            <span className="text-xs font-semibold text-primary">Blog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">Latest Articles</h1>
          <p className="text-lg text-muted-foreground">Tips, guides, and insights for building better portfolios</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post) => (
            <Link key={post.title} href={post.href}>
              <Card className="h-full border-border bg-card hover:border-primary/30 hover:shadow-xl transition-all group overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center text-5xl">
                  {post.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                  </div>
                  <h2 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">{post.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}