import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, FileText, Eye, Clock, ArrowRight } from 'lucide-react'

export default function ATSResumeArticle() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 max-w-3xl">
        <Link href="/docs" className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />Back to Documentation
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-500/20">Resume</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />2 min read</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Eye className="h-3 w-3" />4.3K views</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">Generating Your ATS-Friendly Resume</h1>
          <p className="text-muted-foreground leading-relaxed">Create a professional resume that passes through Applicant Tracking Systems with ease.</p>
        </div>

        <div className="space-y-6">
          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">What Makes a Resume ATS-Friendly?</h2>
            <p className="text-muted-foreground leading-relaxed">ATS systems scan for keywords, clean formatting, and standard section headings. Our resume generator creates simple, text-based layouts that ATS systems can easily parse. Avoid complex tables, images, and multi-column layouts.</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Fill in Your Details</h2>
            <p className="text-muted-foreground leading-relaxed">Enter your personal information, education, skills (comma-separated), professional summary, and work experience. The more complete your profile, the better your resume will perform with ATS systems.</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Select & Customize Projects</h2>
            <p className="text-muted-foreground leading-relaxed">Choose 2 featured projects from your GitHub repositories. Customize each project description with bullet points that highlight your specific contributions, technologies used, and measurable impact.</p>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-3">Download & Print as PDF</h2>
            <p className="text-muted-foreground leading-relaxed">Download the HTML file, open it in your browser, and use File → Print → Save as PDF. This creates a clean, ATS-optimized PDF that recruiters and hiring systems can easily process.</p>
          </Card>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">Create Your Resume</h3>
          <p className="text-muted-foreground mb-4">Generate an ATS-friendly resume in minutes.</p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-xl gap-2" asChild>
            <Link href="/dashboard/resume"><FileText className="h-4 w-4" />Generate Resume <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  )
}