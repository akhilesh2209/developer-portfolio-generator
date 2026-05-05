import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Mail, MessageSquare, Sparkles, MapPin, Phone, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-5 py-2 border border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/10 mb-8">
            <MessageSquare className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary">Contact</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Have a question or want to work with us? We'd love to hear from you.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-4">
            {[
              { icon: Mail, title: 'Email', desc: 'hello@folioforge.dev', color: 'text-blue-500' },
              { icon: MapPin, title: 'Location', desc: 'San Francisco, CA', color: 'text-emerald-500' },
              { icon: Phone, title: 'Phone', desc: '+1 (555) 123-4567', color: 'text-violet-500' },
              { icon: Clock, title: 'Hours', desc: 'Mon-Fri, 9AM-6PM PST', color: 'text-amber-500' },
            ].map((item) => (
              <Card key={item.title} className="p-4 border-border bg-card flex items-center gap-4">
                <div className={`h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center`}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.title}</p>
                  <p className="font-semibold text-sm text-foreground">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 p-8 border-border bg-card">
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Name</label>
                  <Input placeholder="John Doe" className="h-11 bg-muted/50 border-border rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Email</label>
                  <Input type="email" placeholder="john@example.com" className="h-11 bg-muted/50 border-border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Subject</label>
                <Input placeholder="How can we help?" className="h-11 bg-muted/50 border-border rounded-xl" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Message</label>
                <textarea placeholder="Tell us more about your inquiry..." className="w-full p-4 bg-muted/50 border border-border rounded-xl text-sm min-h-36 resize-none focus:outline-none focus:border-primary/50 transition-all" />
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-xl h-12">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}