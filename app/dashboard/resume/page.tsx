'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Download, Eye, Check, AlertCircle, FileText, Briefcase,
  GraduationCap, Code2, User, Sparkles, Layout,
  ArrowRight, Star, Github, Globe, Mail, Phone,
  MapPin, Linkedin, BookOpen, Zap,
  Monitor, Tablet, Smartphone, Plus, X as XIcon
} from 'lucide-react'

const TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, contemporary design with indigo accents',
    icon: Layout,
    accent: '#6366f1',
    bg: 'from-indigo-500/20 to-purple-500/10'
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple, elegant layout focused on content',
    icon: Layout,
    accent: '#6b7280',
    bg: 'from-gray-500/20 to-slate-500/10'
  },
  {
    id: 'creative',
    name: 'Creative Bold',
    description: 'Eye-catching design with vibrant colors',
    icon: Layout,
    accent: '#f59e0b',
    bg: 'from-amber-500/20 to-orange-500/10'
  },
]

function FloatingParticles() {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const generated = [
      { id: 0, left: '12%', top: '18%', color: '#6366f1', duration: 5, delay: 0, size: 2 },
      { id: 1, left: '28%', top: '35%', color: '#8b5cf6', duration: 5, delay: 0.2, size: 2 },
      { id: 2, left: '44%', top: '62%', color: '#06b6d4', duration: 5, delay: 0.4, size: 2 },
      { id: 3, left: '58%', top: '22%', color: '#6366f1', duration: 5, delay: 0.6, size: 2 },
      { id: 4, left: '72%', top: '48%', color: '#8b5cf6', duration: 5, delay: 0.8, size: 2 },
      { id: 5, left: '84%', top: '70%', color: '#06b6d4', duration: 5, delay: 1.0, size: 2 },
      { id: 6, left: '35%', top: '80%', color: '#6366f1', duration: 5, delay: 1.2, size: 2 },
      { id: 7, left: '90%', top: '15%', color: '#8b5cf6', duration: 5, delay: 1.4, size: 2 },
      { id: 8, left: '15%', top: '45%', color: '#06b6d4', duration: 5, delay: 1.6, size: 2 },
      { id: 9, left: '65%', top: '25%', color: '#6366f1', duration: 5, delay: 1.8, size: 2 },
      { id: 10, left: '25%', top: '55%', color: '#8b5cf6', duration: 5, delay: 2.0, size: 2 },
      { id: 11, left: '75%', top: '35%', color: '#06b6d4', duration: 5, delay: 2.2, size: 2 },
    ]
    setParticles(generated)
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: `radial-gradient(circle, ${p.color}, transparent)` }}
          animate={{ y: [0, -20, 0], opacity: [0, 0.4, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

function ProgressSteps({ currentStep }: { currentStep: number }) {
  const steps = [
    { id: 1, label: 'Personal Info', icon: User },
    { id: 2, label: 'Education', icon: GraduationCap },
    { id: 3, label: 'Skills', icon: Code2 },
    { id: 4, label: 'Experience', icon: Briefcase },
    { id: 5, label: 'Download', icon: Download },
  ]

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-8 flex-wrap">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-300 ${
            currentStep >= step.id ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' : 'bg-muted text-muted-foreground border border-border'
          }`}>
            <step.icon className="h-3 w-3" />
            <span className="hidden sm:inline">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-3 sm:w-4 h-0.5 mx-0.5 sm:mx-1 transition-colors duration-300 ${currentStep > step.id ? 'bg-primary' : 'bg-border'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function ResumePage() {
  const router = useRouter()
  const resumeRef = useRef<HTMLDivElement>(null)
  const [repos, setRepos] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [preview, setPreview] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [downloading, setDownloading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  // Project selection state
  const [selectedProjects, setSelectedProjects] = useState<any[]>([])
  const [projectDescriptions, setProjectDescriptions] = useState<Record<string, string>>({})
  const [showProjectSelector, setShowProjectSelector] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    website: '',
    summary: '',
    skills: '',
    experience: '',
    education: '',
    cgpa: '',
    college: '',
    degree: '',
    year: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }

    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    setUser(storedUser)

    const github = localStorage.getItem('githubUsername') || ''
    setForm(prev => ({
      ...prev,
      name: storedUser.name || '',
      email: storedUser.email || '',
      github,
    }))

    const saved = sessionStorage.getItem('githubRepos')
    if (saved) {
      const allRepos = JSON.parse(saved)
      setRepos(allRepos)
      // Auto-select top 2 repos by stars
      const top2 = [...allRepos].sort((a, b) => (b.stars || 0) - (a.stars || 0)).slice(0, 2)
      setSelectedProjects(top2)
      // Initialize descriptions
      const descs: Record<string, string> = {}
      top2.forEach((r: any) => {
        descs[r.name] = r.description || ''
      })
      setProjectDescriptions(descs)
    } else if (github) {
      fetch(`http://localhost:5000/api/github/${github}`)
        .then(r => r.json())
        .then(d => {
          if (Array.isArray(d)) {
            setRepos(d)
            const top2 = [...d].sort((a, b) => (b.stars || 0) - (a.stars || 0)).slice(0, 2)
            setSelectedProjects(top2)
            const descs: Record<string, string> = {}
            top2.forEach((r: any) => { descs[r.name] = r.description || '' })
            setProjectDescriptions(descs)
          }
        })
        .catch(() => {})
    }
  }, [router])

  const toggleProject = (repo: any) => {
    setSelectedProjects(prev => {
      const exists = prev.find(p => p.name === repo.name)
      if (exists) {
        // Remove project
        const newDesc = { ...projectDescriptions }
        delete newDesc[repo.name]
        setProjectDescriptions(newDesc)
        return prev.filter(p => p.name !== repo.name)
      }
      if (prev.length >= 2) return prev
      // Add project
      setProjectDescriptions(prevDesc => ({ ...prevDesc, [repo.name]: repo.description || '' }))
      return [...prev, repo]
    })
  }

  const updateProjectDescription = (projectName: string, description: string) => {
    setProjectDescriptions(prev => ({ ...prev, [projectName]: description }))
  }

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const skillsList = form.skills.split(',').map(s => s.trim()).filter(Boolean)

  const handleDownload = async () => {
    if (!resumeRef.current) return
    setDownloading(true)
    try {
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
<title>${form.name || 'Resume'}</title>
<script src="https://cdn.tailwindcss.com"><\/script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}
body{font-family:'Inter',sans-serif;margin:0;background:#fff;color:#111}
@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style>
</head>
<body>
${resumeRef.current.innerHTML}
</body>
</html>`

      fetch(`http://localhost:5000/api/analytics/download`, { method: 'POST' }).catch(() => {})

      const blob = new Blob([html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${form.name?.replace(/\s+/g, '-').toLowerCase() || 'resume'}-resume.html`
      a.click()
      URL.revokeObjectURL(url)
      showToast('🎉 Resume downloaded! Open in browser → Print → Save as PDF')
    } catch (err) {
      showToast('Failed to download resume', 'error')
    } finally {
      setDownloading(false)
    }
  }

  const template = TEMPLATES.find(t => t.id === selectedTemplate) || TEMPLATES[0]

  // FAANG-style ATS-optimized resume
  const ResumeModern = () => (
    <div ref={resumeRef} style={{ 
      fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif", 
      maxWidth: '816px', 
      margin: '0 auto', 
      background: '#ffffff', 
      color: '#1a1a1a', 
      padding: '40px 48px',
      lineHeight: '1.5',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1.5px solid #e0e0e0' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, margin: '0 0 4px', color: '#111', letterSpacing: '-0.3px' }}>
          {form.name?.toUpperCase() || 'YOUR NAME'}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', fontSize: '12px', color: '#444', marginTop: '6px' }}>
          {form.email && <span>{form.email}</span>}
          {form.phone && <span>{form.phone}</span>}
          {form.location && <span>{form.location}</span>}
          {form.github && <span>github.com/{form.github}</span>}
          {form.linkedin && <span>{form.linkedin.replace(/https?:\/\//, '')}</span>}
          {form.website && <span>{form.website.replace(/https?:\/\//, '')}</span>}
        </div>
      </div>

      {/* Summary */}
      {form.summary && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#333', margin: '0 0 8px', borderBottom: '1px solid #e0e0e0', paddingBottom: '4px' }}>
            Professional Summary
          </h2>
          <p style={{ fontSize: '12px', color: '#333', lineHeight: '1.7', margin: 0 }}>{form.summary}</p>
        </div>
      )}

      {/* Education */}
      {(form.college || form.degree) && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#333', margin: '0 0 8px', borderBottom: '1px solid #e0e0e0', paddingBottom: '4px' }}>
            Education
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: '13px', margin: '0 0 2px' }}>{form.college || 'University Name'}</p>
              <p style={{ color: '#444', fontSize: '12px', margin: '0 0 2px', fontStyle: 'italic' }}>
                {form.degree || 'B.Tech'} in Computer Science & Engineering
              </p>
              {form.cgpa && (
                <p style={{ fontSize: '12px', color: '#555', fontWeight: 600, margin: 0 }}>GPA: {form.cgpa}</p>
              )}
            </div>
            {form.year && <span style={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>{form.year}</span>}
          </div>
        </div>
      )}

      {/* Skills */}
      {skillsList.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#333', margin: '0 0 8px', borderBottom: '1px solid #e0e0e0', paddingBottom: '4px' }}>
            Technical Skills
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skillsList.map((s, i) => (
              <span key={i} style={{ fontSize: '11px', color: '#333', fontWeight: 500 }}>
                {s}{i < skillsList.length - 1 ? ' •' : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {form.experience && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#333', margin: '0 0 8px', borderBottom: '1px solid #e0e0e0', paddingBottom: '4px' }}>
            Experience
          </h2>
          <div style={{ fontSize: '12px', color: '#333', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
            {form.experience.split('\n').map((line, i) => (
              <p key={i} style={{ margin: '0 0 3px' }}>{line}</p>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {selectedProjects.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#333', margin: '0 0 8px', borderBottom: '1px solid #e0e0e0', paddingBottom: '4px' }}>
            Projects
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {selectedProjects.map((r, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <p style={{ fontWeight: 700, fontSize: '13px', margin: '0 0 2px' }}>
                    {r.name}
                    {r.language && <span style={{ fontWeight: 400, color: '#666', fontSize: '11px', marginLeft: '8px' }}>{r.language}</span>}
                  </p>
                  {r.url && (
                    <a href={r.url} style={{ fontSize: '10px', color: '#555', textDecoration: 'none' }} target="_blank" rel="noreferrer">
                      {r.url.replace(/https?:\/\/github\.com\//, '')}
                    </a>
                  )}
                </div>
                <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: '12px', color: '#444', lineHeight: '1.6' }}>
                  {(projectDescriptions[r.name] || r.description || 'Project details').split('. ').filter(Boolean).map((point: string, j: number) => (
                    <li key={j} style={{ marginBottom: '2px' }}>{point.trim()}{point.endsWith('.') ? '' : '.'}</li>
                  ))}
                  {r.stars > 0 && (
                    <li style={{ color: '#666', fontSize: '11px' }}>⭐ {r.stars} stars on GitHub</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="relative min-h-screen">
      <FloatingParticles />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold backdrop-blur-xl border ${
              toast.type === 'success' ? 'bg-emerald-500/90 text-white border-emerald-400/30' : 'bg-red-500/90 text-white border-red-400/30'
            }`}
          >
            {toast.type === 'success' ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-4 pb-16">
        {/* Header - unchanged */}
        <div className="relative pt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
          <div className="relative py-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 backdrop-blur-xl rounded-full px-4 py-1.5 border border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/10 mb-4">
              <FileText className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">Resume Builder</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                  <span className="text-foreground">Build Your</span>
                  <br className="sm:hidden" />
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">{' '}Resume</span>
                </h1>
                <p className="text-muted-foreground mt-3 text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Create a professional ATS-friendly resume in minutes
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-muted/50 border border-border rounded-2xl p-1 gap-1">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => setSelectedTemplate(t.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${selectedTemplate === t.id ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}>
                      <t.icon className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{t.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
                <Button variant="outline" onClick={() => setPreview(!preview)} className="border-border hover:border-primary/30 bg-muted/50 rounded-2xl gap-2">
                  <Eye className="h-4 w-4" />{preview ? 'Hide Preview' : 'Preview'}
                </Button>
                <Button onClick={handleDownload} disabled={downloading}
                  className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-2xl gap-2">
                  {downloading ? <><span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Generating...</> : <><Download className="h-4 w-4" />Download Resume</>}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <ProgressSteps currentStep={currentStep} />

        <div className={`grid gap-6 ${preview ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Form Section */}
          <div className="space-y-6">
            {/* Personal Info Card */}
            <Card className="relative overflow-hidden border-2 border-border bg-card shadow-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.04),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.1),transparent_70%)]" />
              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center border border-blue-300 dark:border-blue-500/20">
                    <User className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Personal Information</h3>
                    <p className="text-sm text-muted-foreground">Basic details for your resume header</p>
                  </div>
                  <Badge className="ml-auto bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-500/20">Step 1</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name *', key: 'name', placeholder: 'John Doe', icon: User, type: 'text' },
                    { label: 'Email Address *', key: 'email', placeholder: 'john@example.com', icon: Mail, type: 'email' },
                    { label: 'Phone Number', key: 'phone', placeholder: '+1 (555) 123-4567', icon: Phone, type: 'tel' },
                    { label: 'Location', key: 'location', placeholder: 'San Francisco, CA', icon: MapPin, type: 'text' },
                    { label: 'GitHub Username', key: 'github', placeholder: 'johndoe', icon: Github, type: 'text' },
                    { label: 'LinkedIn Profile', key: 'linkedin', placeholder: 'linkedin.com/in/johndoe', icon: Linkedin, type: 'text' },
                    { label: 'Portfolio Website', key: 'website', placeholder: 'johndoe.dev', icon: Globe, type: 'url' },
                  ].map((field) => (
                    <div key={field.key} className={field.key === 'website' ? 'sm:col-span-2' : ''}>
                      <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1.5">
                        <field.icon className="h-3 w-3" />{field.label}
                      </label>
                      <Input type={field.type} value={(form as any)[field.key]} onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))} placeholder={field.placeholder} className="h-11 bg-muted/50 border-border focus:border-primary/50 rounded-xl text-sm" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Education Card */}
            <Card className="relative overflow-hidden border-2 border-border bg-card shadow-sm">
              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-300 dark:border-emerald-500/20">
                    <GraduationCap className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Education</h3>
                    <p className="text-sm text-muted-foreground">Your academic background</p>
                  </div>
                  <Badge className="ml-auto bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/20">Step 2</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'College / University', key: 'college', placeholder: 'Stanford University' },
                    { label: 'Degree', key: 'degree', placeholder: 'B.Tech in Computer Science' },
                    { label: 'CGPA / Percentage', key: 'cgpa', placeholder: '9.2 / 10' },
                    { label: 'Graduation Year', key: 'year', placeholder: '2025' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1.5">{field.label}</label>
                      <Input value={(form as any)[field.key]} onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))} placeholder={field.placeholder} className="h-11 bg-muted/50 border-border focus:border-primary/50 rounded-xl text-sm" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Skills Card */}
            <Card className="relative overflow-hidden border-2 border-border bg-card shadow-sm">
              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center border border-violet-300 dark:border-violet-500/20">
                    <Code2 className="h-6 w-6 text-violet-500 dark:text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Technical Skills</h3>
                    <p className="text-sm text-muted-foreground">Technologies and tools you work with</p>
                  </div>
                  <Badge className="ml-auto bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-300 dark:border-violet-500/20">Step 3</Badge>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1.5">Skills (comma-separated)</label>
                  <Input value={form.skills} onChange={e => setForm(p => ({ ...p, skills: e.target.value }))} placeholder="React, TypeScript, Node.js, Python, Docker, AWS..." className="h-12 bg-muted/50 border-border focus:border-primary/50 rounded-xl text-sm" />
                  {skillsList.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {skillsList.map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 bg-violet-100 dark:bg-violet-500/20 border border-violet-300 dark:border-violet-500/30 rounded-full text-sm font-semibold text-violet-600 dark:text-violet-300">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Professional Summary Card */}
            <Card className="relative overflow-hidden border-2 border-border bg-card shadow-sm">
              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center border border-amber-300 dark:border-amber-500/20">
                    <FileText className="h-6 w-6 text-amber-500 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Professional Summary</h3>
                    <p className="text-sm text-muted-foreground">A brief overview of your expertise</p>
                  </div>
                  <Badge className="ml-auto bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-500/20">Step 4</Badge>
                </div>
                <textarea value={form.summary} onChange={e => setForm(p => ({ ...p, summary: e.target.value }))} placeholder="Motivated software engineer with 2+ years of experience building scalable web applications..." className="w-full p-4 bg-muted/50 border border-border rounded-2xl text-sm min-h-32 resize-none focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/50" />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">Pro tip: Keep it concise - 2-3 sentences max</span>
                  <span className="text-xs text-muted-foreground">{form.summary.length}/500</span>
                </div>
              </div>
            </Card>

            {/* Experience Card */}
            <Card className="relative overflow-hidden border-2 border-border bg-card shadow-sm">
              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center border border-rose-300 dark:border-rose-500/20">
                    <Briefcase className="h-6 w-6 text-rose-500 dark:text-rose-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Work Experience</h3>
                    <p className="text-sm text-muted-foreground">Your professional experience (optional)</p>
                  </div>
                  <Badge className="ml-auto bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-500/20">Optional</Badge>
                </div>
                <textarea value={form.experience} onChange={e => setForm(p => ({ ...p, experience: e.target.value }))} placeholder="Software Engineer Intern at Tech Corp (Jun 2024 - Present)&#10;• Developed RESTful APIs using Node.js and Express&#10;• Built responsive UI components with React and TypeScript" className="w-full p-4 bg-muted/50 border border-border rounded-2xl text-sm min-h-36 resize-none focus:outline-none focus:border-primary/50 transition-all font-mono placeholder:text-muted-foreground/50" />
              </div>
            </Card>

            {/* GitHub Projects with Selection */}
            <Card className="relative overflow-hidden border-2 border-border bg-card shadow-sm">
              <div className="relative p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 flex items-center justify-center border border-cyan-300 dark:border-cyan-500/20">
                      <Github className="h-6 w-6 text-cyan-500 dark:text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">GitHub Projects</h3>
                      <p className="text-sm text-muted-foreground">Select 2 projects & customize descriptions</p>
                    </div>
                  </div>
                  <Badge className="bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-300 dark:border-cyan-500/20">
                    {selectedProjects.length}/2 Selected
                  </Badge>
                </div>

                {/* Project Selection Grid */}
                <div className="grid gap-3 mb-6 max-h-64 overflow-y-auto pr-1">
                  {repos.sort((a, b) => (b.stars || 0) - (a.stars || 0)).map((repo, i) => {
                    const isSelected = !!selectedProjects.find(p => p.name === repo.name)
                    const isDisabled = !isSelected && selectedProjects.length >= 2
                    return (
                      <div key={i} onClick={() => !isDisabled && toggleProject(repo)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                          isSelected ? 'border-cyan-500/60 bg-cyan-50 dark:bg-cyan-500/5' :
                          isDisabled ? 'border-border opacity-30 cursor-not-allowed' :
                          'border-border bg-muted/30 hover:border-primary/30 hover:bg-muted/50'
                        }`}>
                        <div className="flex items-start gap-3">
                          <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${isSelected ? 'border-cyan-500 bg-cyan-500' : 'border-border'}`}>
                            {isSelected && <Check className="h-3.5 w-3.5 text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className={`font-bold text-sm ${isSelected ? 'text-cyan-600 dark:text-cyan-300' : 'text-foreground'}`}>{repo.name}</span>
                              {repo.language && <Badge className="text-[10px] px-2 py-0 bg-muted/50 border-border text-muted-foreground">{repo.language}</Badge>}
                              {repo.stars > 0 && <span className="text-xs text-yellow-500 flex items-center gap-1"><Star className="h-3 w-3 fill-current" />{repo.stars}</span>}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">{repo.description || 'No description'}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Custom Descriptions for Selected Projects */}
                {selectedProjects.length > 0 && (
                  <div className="space-y-4 border-t border-border pt-4">
                    <p className="text-sm font-semibold text-foreground">Customize Project Descriptions</p>
                    {selectedProjects.map((project) => (
                      <div key={project.name} className="p-4 rounded-2xl bg-muted/30 border border-border space-y-2">
                        <p className="font-medium text-sm text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />{project.name}
                          <button onClick={() => toggleProject(project)} className="ml-auto text-red-500 hover:text-red-600 text-xs flex items-center gap-1">
                            <XIcon className="h-3 w-3" />Remove
                          </button>
                        </p>
                        <textarea
                          value={projectDescriptions[project.name] || ''}
                          onChange={(e) => updateProjectDescription(project.name, e.target.value)}
                          placeholder="Describe what this project does, technologies used, and your contributions. Each sentence will be a bullet point."
                          className="w-full p-3 bg-muted/50 border border-border rounded-xl text-sm min-h-24 resize-none focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
                        />
                        <p className="text-xs text-muted-foreground">
                          💡 Each sentence separated by a period becomes a bullet point on your resume
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={handleDownload} disabled={downloading}
                className="flex-1 bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all rounded-2xl h-14 text-base">
                {downloading ? <span className="flex items-center gap-3"><span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Generating Resume...</span> :
                 <span className="flex items-center gap-3"><Download className="h-5 w-5" />Download Resume<ArrowRight className="h-5 w-5" /></span>}
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push('/dashboard/projects')} className="border-border hover:border-primary/30 bg-muted/50 rounded-2xl h-14">
                <Github className="h-5 w-5 mr-2" />Manage Projects
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              💡 <strong>Pro tip:</strong> Open the downloaded HTML file in your browser, then File → Print → Save as PDF for a perfect ATS-friendly PDF resume.
            </p>
          </div>

          {/* Preview Section */}
          <AnimatePresence>
            {preview && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="sticky top-20 h-fit">
                <Card className="relative overflow-hidden border-2 border-border bg-card shadow-2xl">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center"><Eye className="h-4 w-4 text-primary" /></div>
                      <div><p className="font-semibold text-sm text-foreground">Live Preview</p><p className="text-xs text-muted-foreground">{template.name} Template</p></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-muted/50 rounded-xl border border-border p-0.5">
                        {[
                          { mode: 'desktop' as const, icon: Monitor },
                          { mode: 'tablet' as const, icon: Tablet },
                          { mode: 'mobile' as const, icon: Smartphone },
                        ].map(({ mode, icon: Icon }) => (
                          <button key={mode} onClick={() => setPreviewMode(mode)}
                            className={`h-8 w-8 flex items-center justify-center rounded-lg transition-colors ${previewMode === mode ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}>
                            <Icon className="h-3.5 w-3.5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={`overflow-y-auto ${previewMode === 'desktop' ? 'max-h-[80vh]' : previewMode === 'tablet' ? 'max-h-[70vh] max-w-[768px] mx-auto' : 'max-h-[80vh] max-w-[375px] mx-auto'}`}>
                    <div className={`transform origin-top-left ${previewMode === 'desktop' ? 'scale-[0.65] w-[154%]' : previewMode === 'tablet' ? 'scale-[0.7] w-[143%]' : 'scale-[0.45] w-[222%]'}`}>
                      <ResumeModern />
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Template Features */}
        <div className="mt-12">
          <Card className="relative overflow-hidden border border-border bg-card">
            <div className="relative p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Why Use Our Resume Builder?</h2>
                <p className="text-muted-foreground">Create an ATS-friendly resume that stands out</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: <Zap className="h-5 w-5" />, title: 'ATS-Friendly', desc: 'Optimized for applicant tracking systems', color: 'from-amber-500/10 to-yellow-500/5', border: 'border-amber-500/20' },
                  { icon: <Layout className="h-5 w-5" />, title: '3 Templates', desc: 'Modern, minimal, and creative designs', color: 'from-violet-500/10 to-purple-500/5', border: 'border-violet-500/20' },
                  { icon: <Github className="h-5 w-5" />, title: 'Auto-Import', desc: 'Projects pulled from your GitHub', color: 'from-cyan-500/10 to-blue-500/5', border: 'border-cyan-500/20' },
                  { icon: <Download className="h-5 w-5" />, title: 'PDF Ready', desc: 'Download HTML, print as PDF easily', color: 'from-emerald-500/10 to-green-500/5', border: 'border-emerald-500/20' },
                ].map((feature, i) => (
                  <div key={i} className={`p-5 rounded-2xl bg-gradient-to-br ${feature.color} ${feature.border} border bg-muted/30`}>
                    <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center mb-3"><div className="text-primary">{feature.icon}</div></div>
                    <h4 className="font-semibold text-sm text-foreground mb-2">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}