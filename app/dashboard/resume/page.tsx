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
  Monitor, Tablet, Smartphone
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
    const generated = [...Array(12)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color:
        i % 3 === 0
          ? '#6366f1'
          : i % 3 === 1
          ? '#8b5cf6'
          : '#06b6d4',
      duration: 5,
      delay: i * 0.2,
      size: 2,
    }))

    setParticles(generated)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${p.color}, transparent)`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
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
          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-300 ${
              currentStep >= step.id
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-white/5 text-muted-foreground border border-white/10'
            }`}
          >
            <step.icon className="h-3 w-3" />
            <span className="hidden sm:inline">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-3 sm:w-4 h-0.5 mx-0.5 sm:mx-1 transition-colors duration-300 ${
              currentStep > step.id ? 'bg-primary' : 'bg-white/10'
            }`} />
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
    if (saved) setRepos(JSON.parse(saved).slice(0, 6))
    else if (github) {
      fetch(`http://localhost:5000/api/github/${github}`)
        .then(r => r.json())
        .then(d => { if (Array.isArray(d)) setRepos(d.slice(0, 6)) })
        .catch(() => {})
    }
  }, [router])

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

      fetch('http://localhost:5000/api/analytics/download', { method: 'POST' }).catch(() => {})

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

  const ResumeModern = () => (
    <div ref={resumeRef} style={{ 
      fontFamily: "'Inter', sans-serif", 
      maxWidth: '800px', 
      margin: '0 auto', 
      background: '#ffffff', 
      color: '#111827', 
      padding: '48px 56px',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
      borderRadius: '4px'
    }}>
      {/* Header */}
      <div style={{ borderBottom: `3px solid ${template.accent}`, paddingBottom: '24px', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 900, margin: '0 0 4px', color: '#111', letterSpacing: '-0.5px' }}>
          {form.name || 'Your Name'}
        </h1>
        <p style={{ fontSize: '16px', color: template.accent, fontWeight: 600, margin: '0 0 14px' }}>
          {form.degree ? `${form.degree} Graduate` : 'Software Developer'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', fontSize: '13px', color: '#555' }}>
          {form.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: template.accent }}>✉</span> {form.email}
            </span>
          )}
          {form.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: template.accent }}>📞</span> {form.phone}
            </span>
          )}
          {form.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: template.accent }}>📍</span> {form.location}
            </span>
          )}
          {form.github && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: template.accent }}>🔗</span> github.com/{form.github}
            </span>
          )}
          {form.linkedin && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: template.accent }}>💼</span> {form.linkedin}
            </span>
          )}
          {form.website && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: template.accent }}>🌐</span> {form.website}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {form.summary && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '15px', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '2.5px', 
            color: template.accent, 
            margin: '0 0 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ width: '24px', height: '2px', background: template.accent, display: 'inline-block' }} />
            Summary
          </h2>
          <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.8', margin: 0 }}>{form.summary}</p>
        </div>
      )}

      {/* Education */}
      {(form.college || form.degree) && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '15px', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '2.5px', 
            color: template.accent, 
            margin: '0 0 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ width: '24px', height: '2px', background: template.accent, display: 'inline-block' }} />
            Education
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: '15px', margin: '0 0 4px' }}>{form.college || 'University Name'}</p>
              <p style={{ color: '#555', fontSize: '13px', margin: '0 0 4px' }}>
                {form.degree || 'B.Tech'} in Computer Science & Engineering
              </p>
              {form.cgpa && (
                <p style={{ fontSize: '13px', color: template.accent, fontWeight: 600, margin: 0 }}>
                  CGPA: {form.cgpa}
                </p>
              )}
            </div>
            {form.year && (
              <span style={{ fontSize: '13px', color: '#888', fontWeight: 500 }}>{form.year}</span>
            )}
          </div>
        </div>
      )}

      {/* Skills */}
      {skillsList.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '15px', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '2.5px', 
            color: template.accent, 
            margin: '0 0 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ width: '24px', height: '2px', background: template.accent, display: 'inline-block' }} />
            Technical Skills
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skillsList.map((s, i) => (
              <span key={i} style={{ 
                padding: '5px 14px', 
                background: `${template.accent}10`, 
                color: template.accent, 
                border: `1px solid ${template.accent}30`,
                borderRadius: '999px', 
                fontSize: '12px', 
                fontWeight: 600 
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {repos.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '15px', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '2.5px', 
            color: template.accent, 
            margin: '0 0 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ width: '24px', height: '2px', background: template.accent, display: 'inline-block' }} />
            Projects
          </h2>
          <div style={{ display: 'grid', gap: '14px' }}>
            {repos.map((r, i) => (
              <div key={i} style={{ 
                borderLeft: `3px solid ${template.accent}`, 
                paddingLeft: '16px',
                paddingTop: '2px',
                paddingBottom: '2px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontWeight: 700, fontSize: '14px', margin: '0 0 4px' }}>{r.name}</p>
                  {r.language && (
                    <span style={{ 
                      fontSize: '11px', 
                      color: template.accent, 
                      background: `${template.accent}10`,
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontWeight: 600
                    }}>
                      {r.language}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6', margin: '0 0 4px' }}>
                  {r.description || 'An open-source project available on GitHub.'}
                </p>
                {r.url && (
                  <a href={r.url} style={{ fontSize: '12px', color: template.accent, textDecoration: 'none', fontWeight: 500 }}>
                    {r.url}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {form.experience && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '15px', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '2.5px', 
            color: template.accent, 
            margin: '0 0 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ width: '24px', height: '2px', background: template.accent, display: 'inline-block' }} />
            Experience
          </h2>
          <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-line' }}>
            {form.experience}
          </p>
        </div>
      )}

      <div style={{ 
        borderTop: `1px solid #e5e7eb`, 
        paddingTop: '16px', 
        marginTop: '12px', 
        fontSize: '11px', 
        color: '#aaa', 
        textAlign: 'center',
        fontWeight: 500
      }}>
        Generated with Portfolio Generator · {new Date().getFullYear()}
      </div>
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
              toast.type === 'success'
                ? 'bg-emerald-500/90 text-white border-emerald-400/30'
                : 'bg-red-500/90 text-white border-red-400/30'
            }`}
          >
            {toast.type === 'success' ? (
              <Check className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-4 pb-16">
        {/* Header */}
        <div className="relative pt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />

          <div className="relative py-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-purple-500/20 backdrop-blur-xl rounded-full px-4 py-1.5 border border-primary/30 shadow-lg shadow-primary/10 mb-4">
              <FileText className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">Resume Builder</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                    Build Your
                  </span>
                  <br className="sm:hidden" />
                  <span className="bg-gradient-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {' '}Resume
                  </span>
                </h1>
                <p className="text-muted-foreground mt-3 text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Create a professional ATS-friendly resume in minutes
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Template Selector */}
                <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1 gap-1">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTemplate(t.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        selectedTemplate === t.id
                          ? 'bg-primary text-white shadow-lg'
                          : 'text-muted-foreground hover:text-white'
                      }`}
                    >
                      <t.icon className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{t.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setPreview(!preview)}
                  className="border-white/10 hover:border-primary/30 bg-white/5 backdrop-blur-sm rounded-2xl gap-2"
                >
                  <Eye className="h-4 w-4" />
                  {preview ? 'Hide Preview' : 'Preview'}
                </Button>

                <Button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-2xl gap-2"
                >
                  {downloading ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Download Resume
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <ProgressSteps currentStep={currentStep} />

        {/* Main Content */}
        <div className={`grid gap-6 ${preview ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Form Section */}
          <div className="space-y-6">
            {/* Personal Info Card */}
            <Card className="relative overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl shadow-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.1),transparent_70%)]" />
              
              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <User className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Personal Information</h3>
                    <p className="text-sm text-muted-foreground">Basic details for your resume header</p>
                  </div>
                  <Badge className="ml-auto bg-blue-500/10 text-blue-400 border-blue-500/20">
                    Step 1
                  </Badge>
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
                        <field.icon className="h-3 w-3" />
                        {field.label}
                      </label>
                      <Input
                        type={field.type}
                        value={(form as any)[field.key]}
                        onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="h-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all rounded-xl text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Education Card */}
            <Card className="relative overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl shadow-xl">
              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <GraduationCap className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Education</h3>
                    <p className="text-sm text-muted-foreground">Your academic background</p>
                  </div>
                  <Badge className="ml-auto bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    Step 2
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'College / University', key: 'college', placeholder: 'Stanford University' },
                    { label: 'Degree', key: 'degree', placeholder: 'B.Tech in Computer Science' },
                    { label: 'CGPA / Percentage', key: 'cgpa', placeholder: '9.2 / 10' },
                    { label: 'Graduation Year', key: 'year', placeholder: '2025' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1.5">
                        {field.label}
                      </label>
                      <Input
                        value={(form as any)[field.key]}
                        onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="h-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all rounded-xl text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Skills Card */}
            <Card className="relative overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl shadow-xl">
              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                    <Code2 className="h-6 w-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Technical Skills</h3>
                    <p className="text-sm text-muted-foreground">Technologies and tools you work with</p>
                  </div>
                  <Badge className="ml-auto bg-violet-500/10 text-violet-400 border-violet-500/20">
                    Step 3
                  </Badge>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1.5">
                    Skills (comma-separated)
                  </label>
                  <Input
                    value={form.skills}
                    onChange={e => setForm(p => ({ ...p, skills: e.target.value }))}
                    placeholder="React, TypeScript, Node.js, Python, Docker, AWS, MongoDB, GraphQL, Next.js, Tailwind CSS..."
                    className="h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all rounded-xl text-sm"
                  />
                  {skillsList.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {skillsList.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-full text-sm font-semibold text-violet-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Professional Summary Card */}
            <Card className="relative overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl shadow-xl">
              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <FileText className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Professional Summary</h3>
                    <p className="text-sm text-muted-foreground">A brief overview of your expertise</p>
                  </div>
                  <Badge className="ml-auto bg-amber-500/10 text-amber-400 border-amber-500/20">
                    Step 4
                  </Badge>
                </div>

                <textarea
                  value={form.summary}
                  onChange={e => setForm(p => ({ ...p, summary: e.target.value }))}
                  placeholder="Motivated software engineer with 2+ years of experience building scalable web applications. Proficient in React, Node.js, and cloud technologies. Passionate about clean code and user-centric design..."
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-sm min-h-32 resize-none focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-muted-foreground/50"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    Pro tip: Keep it concise - 2-3 sentences max
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {form.summary.length}/500
                  </span>
                </div>
              </div>
            </Card>

            {/* Experience Card */}
            <Card className="relative overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl shadow-xl">
              <div className="relative p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                    <Briefcase className="h-6 w-6 text-rose-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Work Experience</h3>
                    <p className="text-sm text-muted-foreground">Your professional experience (optional)</p>
                  </div>
                  <Badge className="ml-auto bg-rose-500/10 text-rose-400 border-rose-500/20">
                    Optional
                  </Badge>
                </div>

                <textarea
                  value={form.experience}
                  onChange={e => setForm(p => ({ ...p, experience: e.target.value }))}
                  placeholder="Software Engineer Intern at Tech Corp (Jun 2024 - Present)&#10;• Developed RESTful APIs using Node.js and Express&#10;• Built responsive UI components with React and TypeScript&#10;• Collaborated with cross-functional teams using Agile methodology"
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-sm min-h-36 resize-none focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-mono placeholder:text-muted-foreground/50"
                />
              </div>
            </Card>

            {/* GitHub Projects Card */}
            {repos.length > 0 && (
              <Card className="relative overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl shadow-xl">
                <div className="relative p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <Github className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">GitHub Projects</h3>
                      <p className="text-sm text-muted-foreground">Auto-imported from your GitHub</p>
                    </div>
                    <Badge className="ml-auto bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                      Auto-filled
                    </Badge>
                  </div>

                  <div className="grid gap-3">
                    {repos.map((repo, i) => (
                      <div
                        key={i}
                        className="flex items-start justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <BookOpen className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                            <p className="font-semibold text-sm truncate">{repo.name}</p>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1 ml-6">
                            {repo.description || 'No description available'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                          {repo.language && (
                            <Badge variant="outline" className="text-xs border-cyan-500/30 text-cyan-400">
                              {repo.language}
                            </Badge>
                          )}
                          {repo.stars > 0 && (
                            <span className="flex items-center gap-1 text-xs text-yellow-400">
                              <Star className="h-3 w-3 fill-current" />
                              {repo.stars}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all rounded-2xl h-14 text-base"
              >
                {downloading ? (
                  <span className="flex items-center gap-3">
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating Resume...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <Download className="h-5 w-5" />
                    Download Resume
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push('/dashboard/projects')}
                className="border-white/10 hover:border-primary/30 bg-white/5 backdrop-blur-sm rounded-2xl h-14"
              >
                <Github className="h-5 w-5 mr-2" />
                Manage Projects
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              💡 <strong>Pro tip:</strong> Open the downloaded HTML file in your browser, then File → Print → Save as PDF for a perfect ATS-friendly PDF resume.
            </p>
          </div>

          {/* Preview Section */}
          <AnimatePresence>
            {preview && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="sticky top-20 h-fit"
              >
                <Card className="relative overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl shadow-2xl">
                  {/* Preview Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Eye className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Live Preview</p>
                        <p className="text-xs text-muted-foreground">{template.name} Template</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-0.5">
                        {[
                          { mode: 'desktop' as const, icon: Monitor },
                          { mode: 'tablet' as const, icon: Tablet },
                          { mode: 'mobile' as const, icon: Smartphone },
                        ].map(({ mode, icon: Icon }) => (
                          <button
                            key={mode}
                            onClick={() => setPreviewMode(mode)}
                            className={`h-8 w-8 flex items-center justify-center rounded-lg transition-colors ${
                              previewMode === mode
                                ? 'bg-primary text-white shadow-lg'
                                : 'text-muted-foreground hover:text-white'
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className={`overflow-y-auto ${
                    previewMode === 'desktop' ? 'max-h-[80vh]' :
                    previewMode === 'tablet' ? 'max-h-[70vh] max-w-[768px] mx-auto' :
                    'max-h-[80vh] max-w-[375px] mx-auto'
                  }`}>
                    <div className={`transform origin-top-left ${
                      previewMode === 'desktop' ? 'scale-[0.65] w-[154%]' :
                      previewMode === 'tablet' ? 'scale-[0.7] w-[143%]' :
                      'scale-[0.45] w-[222%]'
                    }`}>
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
          <Card className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-xl">
            <div className="relative p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Why Use Our Resume Builder?</h2>
                <p className="text-muted-foreground">Create an ATS-friendly resume that stands out</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: <Zap className="h-5 w-5" />,
                    title: 'ATS-Friendly',
                    desc: 'Optimized for applicant tracking systems',
                    color: 'from-amber-500/10 to-yellow-500/5',
                    border: 'border-amber-500/20'
                  },
                  {
                    icon: <Layout className="h-5 w-5" />,
                    title: '3 Templates',
                    desc: 'Modern, minimal, and creative designs',
                    color: 'from-violet-500/10 to-purple-500/5',
                    border: 'border-violet-500/20'
                  },
                  {
                    icon: <Github className="h-5 w-5" />,
                    title: 'Auto-Import',
                    desc: 'Projects pulled from your GitHub',
                    color: 'from-cyan-500/10 to-blue-500/5',
                    border: 'border-cyan-500/20'
                  },
                  {
                    icon: <Download className="h-5 w-5" />,
                    title: 'PDF Ready',
                    desc: 'Download HTML, print as PDF easily',
                    color: 'from-emerald-500/10 to-green-500/5',
                    border: 'border-emerald-500/20'
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-2xl bg-gradient-to-br ${feature.color} ${feature.border} border backdrop-blur-sm`}
                  >
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center mb-3">
                      <div className="text-primary">{feature.icon}</div>
                    </div>
                    <h4 className="font-semibold text-sm mb-2">{feature.title}</h4>
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