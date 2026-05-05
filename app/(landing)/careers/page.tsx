import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Briefcase, Sparkles } from 'lucide-react'

const openings = [
  { title: 'Senior Frontend Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', href: '/careers/senior-frontend' },
  { title: 'Backend Developer', department: 'Engineering', location: 'Remote', type: 'Full-time', href: '/careers/backend-developer' },
  { title: 'UI/UX Designer', department: 'Design', location: 'Remote', type: 'Full-time', href: '/careers/ui-ux-designer' },
  { title: 'Developer Advocate', department: 'Marketing', location: 'Remote', type: 'Full-time', href: '/careers/dev-advocate' },
  { title: 'Technical Writer', department: 'Content', location: 'Remote', type: 'Contract', href: '/careers/technical-writer' },
  { title: 'Customer Success Manager', department: 'Support', location: 'Remote', type: 'Full-time', href: '/careers/csm' },
]

const perks = [
  { icon: '🏠', title: 'Remote First', desc: 'Work from anywhere in the world' },
  { icon: '💰', title: 'Competitive Pay', desc: 'Top-tier compensation packages' },
  { icon: '📚', title: 'Learning Budget', desc: '$2,000/year for courses & books' },
  { icon: '🏥', title: 'Health Benefits', desc: 'Comprehensive health coverage' },
  { icon: '🏖️', title: 'Unlimited PTO', desc: 'Take the time you need' },
  { icon: '💻', title: 'Equipment Stipend', desc: '$3,000 for your setup' },
]

export default function CareersPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/10 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary">Careers</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">Join Our Team</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Help us build the future of developer portfolios. We're looking for passionate people to join our remote-first team.</p>
        </div>

        {/* Perks */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-16">
          {perks.map((perk) => (
            <Card key={perk.title} className="p-4 text-center border-border bg-card">
              <div className="text-2xl mb-2">{perk.icon}</div>
              <p className="font-semibold text-sm text-foreground">{perk.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{perk.desc}</p>
            </Card>
          ))}
        </div>

        {/* Openings */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Open Positions</h2>
          <div className="space-y-3">
            {openings.map((job) => (
              <Card key={job.title} className="p-5 border-border bg-card hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="font-bold text-foreground">{job.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{job.department}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{job.type}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl border-border hover:border-primary/30" asChild>
                    <Link href={job.href}>Apply <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}