import { CheckCircle2 } from 'lucide-react'

const services = [
  { name: 'Website', status: 'operational' },
  { name: 'API', status: 'operational' },
  { name: 'GitHub Integration', status: 'operational' },
  { name: 'Portfolio Generator', status: 'operational' },
  { name: 'Analytics', status: 'operational' },
  { name: 'Authentication', status: 'operational' },
]

export default function StatusPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />
      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32 max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-500/10 rounded-full px-5 py-2 border border-emerald-300 dark:border-emerald-500/20 mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">All Systems Operational</span>
          </div>
          <h1 className="text-4xl font-black text-foreground">System Status</h1>
        </div>
        <div className="space-y-2">
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border">
              <span className="font-medium text-foreground">{service.name}</span>
              <span className="flex items-center gap-1.5 text-sm text-emerald-500"><CheckCircle2 className="h-4 w-4" />Operational</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}