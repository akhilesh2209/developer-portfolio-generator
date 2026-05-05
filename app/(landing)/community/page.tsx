import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Users, MessageSquare, Github, Twitter, ArrowRight, Sparkles } from 'lucide-react'

const channels = [
  { icon: Github, title: 'GitHub Discussions', desc: 'Ask questions, share ideas, and contribute to our open source projects.', href: 'https://github.com', color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-500/10' },
  { icon: Twitter, title: 'Twitter Community', desc: 'Follow us for updates, tips, and community spotlights.', href: 'https://twitter.com', color: 'text-blue-400', bg: 'bg-blue-100 dark:bg-blue-500/10' },
  { icon: MessageSquare, title: 'Community Forum', desc: 'Connect with other developers, get feedback, and share your portfolio.', href: '/community/forum', color: 'text-violet-500', bg: 'bg-violet-100 dark:bg-violet-500/10' },
]

const events = [
  { title: 'Portfolio Review Session', date: 'Mar 20, 2024', time: '2:00 PM EST', type: 'Online' },
  { title: 'Build Workshop: Next.js Portfolio', date: 'Mar 25, 2024', time: '11:00 AM EST', type: 'Online' },
  { title: 'Community Meetup - SF', date: 'Apr 5, 2024', time: '6:00 PM PST', type: 'In-Person' },
]

export default function CommunityPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/10 mb-8">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary">Community</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">Join Our Community</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Connect with thousands of developers building their portfolios</p>
        </div>

        {/* Channels */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {channels.map((channel) => (
            <Card key={channel.title} className="p-6 border-border bg-card hover:border-primary/30 transition-all text-center">
              <div className={`h-14 w-14 rounded-2xl ${channel.bg} flex items-center justify-center mx-auto mb-4`}>
                <channel.icon className={`h-7 w-7 ${channel.color}`} />
              </div>
              <h3 className="font-bold text-foreground mb-2">{channel.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{channel.desc}</p>
              <Button variant="outline" size="sm" className="rounded-xl border-border hover:border-primary/30" asChild>
                <Link href={channel.href}>Join <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
              </Button>
            </Card>
          ))}
        </div>

        {/* Events */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Upcoming Events</h2>
          <div className="space-y-3">
            {events.map((event) => (
              <Card key={event.title} className="p-5 border-border bg-card hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="font-bold text-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date} · {event.time} · {event.type}</p>
                  </div>
                  <Button size="sm" className="rounded-xl">RSVP</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}