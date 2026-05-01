'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  User, Github, Linkedin, Globe, Mail, Phone, MapPin,
  GraduationCap, Code2, Briefcase, Star, Download, ArrowLeft,
  CheckCircle2, ExternalLink, ChevronRight, ChevronLeft, Sparkles,
  Eye, FileText, Zap, Palette, Rocket, Check, Wand2
} from 'lucide-react'

const STEPS = [
  { id: 0, label: 'Personal', icon: User },
  { id: 1, label: 'Education', icon: GraduationCap },
  { id: 2, label: 'Skills', icon: Code2 },
  { id: 3, label: 'Projects', icon: Briefcase },
  { id: 4, label: 'Preview', icon: Eye },
]

function FloatingParticles() {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const generated = [...Array(8)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4',
      duration: 7,
      delay: i * 0.2,
      size: 1,
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
            y: [0, -15, 0],
            opacity: [0, 0.3, 0],
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

function generatePortfolioHTML(data: any): string {
  const { name, email, phone, location, github, linkedin, website, summary,
          skills, education, experience, projects, template } = data

  const skillList: string[] = typeof skills === 'string'
    ? skills.split(',').map((s: string) => s.trim()).filter(Boolean)
    : skills || []

  const templates: Record<string, string> = {

    modern: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${name} — Portfolio</title>
<script src="https://cdn.tailwindcss.com"><\/script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>*{font-family:'Inter',sans-serif}html{scroll-behavior:smooth}.gradient-text{background:linear-gradient(135deg,#60a5fa,#a78bfa,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.card-hover{transition:all .3s}.card-hover:hover{transform:translateY(-4px);border-color:rgba(99,102,241,.4)}</style>
</head>
<body class="bg-[#0a0a0f] text-white">
<nav class="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/90 backdrop-blur px-8 py-4 flex justify-between items-center">
  <span class="font-black text-xl gradient-text">${name.split(' ')[0]}</span>
  <div class="flex gap-6 text-sm text-gray-400">
    <a href="#about" class="hover:text-white transition-colors">About</a>
    <a href="#projects" class="hover:text-white transition-colors">Projects</a>
    <a href="#contact" class="hover:text-white transition-colors">Contact</a>
  </div>
  ${github ? `<a href="https://github.com/${github}" target="_blank" class="text-sm border border-white/10 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors">GitHub</a>` : ''}
</nav>

<section id="about" class="px-8 py-24 max-w-5xl mx-auto">
  <div class="max-w-2xl">
    <div class="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium rounded-full mb-8">
      <span class="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse inline-block"></span>
      Available for opportunities
    </div>
    <h1 class="text-6xl font-black leading-tight mb-5">
      Hi, I'm <span class="gradient-text">${name.split(' ')[0]}</span><br>
      <span class="text-gray-300 text-4xl font-bold">
        ${education?.degree ? `${education.degree} Student` : 'Software Developer'}
      </span>
    </h1>
    <p class="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">${summary || `Passionate developer building real-world applications.`}</p>
    <div class="flex gap-4 flex-wrap">
      ${github ? `<a href="https://github.com/${github}" target="_blank" class="px-5 py-3 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">View GitHub →</a>` : ''}
      ${email ? `<a href="mailto:${email}" class="px-5 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors">Contact Me</a>` : ''}
    </div>
    <div class="flex gap-10 mt-14">
      ${skillList.length ? `<div><p class="text-3xl font-black">${skillList.length}+</p><p class="text-gray-500 text-sm mt-1">Skills</p></div>` : ''}
      ${projects.length ? `<div><p class="text-3xl font-black">${projects.length}</p><p class="text-gray-500 text-sm mt-1">Projects</p></div>` : ''}
      ${education?.cgpa ? `<div><p class="text-3xl font-black">${education.cgpa}</p><p class="text-gray-500 text-sm mt-1">CGPA</p></div>` : ''}
    </div>
  </div>
</section>

${education && (education.college || education.degree) ? `
<section class="px-8 py-16 max-w-5xl mx-auto border-t border-white/5">
  <p class="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-8">Education</p>
  <div class="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 max-w-xl">
    <div class="flex items-start justify-between">
      <div>
        <p class="font-bold text-lg">${education.college || 'University'}</p>
        <p class="text-gray-400 mt-1">${education.degree || 'B.Tech'} — Computer Science</p>
        ${education.cgpa ? `<p class="text-violet-400 font-bold mt-2">CGPA: ${education.cgpa} / 10</p>` : ''}
      </div>
      ${education.year ? `<span class="text-gray-500 text-sm">${education.year}</span>` : ''}
    </div>
  </div>
</section>` : ''}

${skillList.length ? `
<section class="px-8 py-16 max-w-5xl mx-auto border-t border-white/5">
  <p class="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-8">Tech Stack</p>
  <div class="flex flex-wrap gap-2">
    ${skillList.map((s: string) => `<span class="px-4 py-2 bg-white/[0.03] border border-white/[0.07] rounded-xl text-sm text-gray-300 hover:border-violet-500/30 transition-colors">${s}</span>`).join('')}
  </div>
</section>` : ''}

${projects.length ? `
<section id="projects" class="px-8 py-16 max-w-5xl mx-auto border-t border-white/5">
  <p class="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-8">Featured Projects</p>
  <div class="grid md:grid-cols-2 gap-5">
    ${projects.map((p: any) => `
    <a href="${p.url || '#'}" target="_blank" class="group card-hover p-6 bg-white/[0.03] border border-white/[0.07] rounded-2xl block">
      <div class="flex items-start justify-between mb-4">
        <div class="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:stroke-gray-400 transition-colors"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </div>
      <h3 class="font-bold text-base mb-2 group-hover:text-violet-300 transition-colors">${p.name}</h3>
      <p class="text-sm text-gray-500 leading-relaxed mb-4">${p.description || 'A project showcasing development skills and problem-solving.'}</p>
      <div class="flex items-center gap-3 text-xs text-gray-600">
        ${p.language ? `<span class="text-gray-400">${p.language}</span>` : ''}
        ${p.stars ? `<span class="flex items-center gap-1">⭐ ${p.stars}</span>` : ''}
        ${p.techStack ? `<span class="text-violet-500">${p.techStack}</span>` : ''}
      </div>
    </a>`).join('')}
  </div>
</section>` : ''}

${experience ? `
<section class="px-8 py-16 max-w-5xl mx-auto border-t border-white/5">
  <p class="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-8">Experience</p>
  <div class="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 max-w-xl">
    <p class="text-gray-300 leading-relaxed whitespace-pre-line text-sm">${experience}</p>
  </div>
</section>` : ''}

<section id="contact" class="px-8 py-20 max-w-5xl mx-auto border-t border-white/5 text-center">
  <h2 class="text-4xl font-black mb-4 gradient-text">Let's Work Together</h2>
  <p class="text-gray-400 text-lg mb-10">Open to internships, full-time roles, and exciting projects.</p>
  <div class="flex justify-center gap-4 flex-wrap">
    ${email ? `<a href="mailto:${email}" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">📧 ${email}</a>` : ''}
    ${linkedin ? `<a href="${linkedin}" target="_blank" class="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors">💼 LinkedIn</a>` : ''}
    ${github ? `<a href="https://github.com/${github}" target="_blank" class="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors">🐙 GitHub</a>` : ''}
  </div>
  ${phone ? `<p class="text-gray-600 mt-8 text-sm">📱 ${phone}</p>` : ''}
  ${location ? `<p class="text-gray-600 mt-1 text-sm">📍 ${location}</p>` : ''}
  <p class="text-gray-700 text-xs mt-12">© ${new Date().getFullYear()} ${name} · Built with Portfolio Generator</p>
</section>
</body>
</html>`,

    minimal: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${name} — Portfolio</title>
<script src="https://cdn.tailwindcss.com"><\/script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>*{font-family:'Inter',sans-serif}html{scroll-behavior:smooth}</style>
</head>
<body class="bg-white text-gray-900">
<div class="max-w-3xl mx-auto px-8 py-16">
  <header class="mb-20 pb-10 border-b border-gray-100">
    <div class="flex items-start justify-between mb-6">
      <div>
        <h1 class="text-5xl font-black tracking-tight mb-2">${name}</h1>
        <p class="text-xl text-gray-400">${education?.degree ? `${education.degree} Student` : 'Software Developer'}</p>
        ${location ? `<p class="text-sm text-gray-400 mt-1">📍 ${location}</p>` : ''}
      </div>
      <div class="flex gap-2 mt-2">
        ${github ? `<a href="https://github.com/${github}" target="_blank" class="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm">GH</a>` : ''}
        ${email ? `<a href="mailto:${email}" class="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm">@</a>` : ''}
      </div>
    </div>
    <p class="text-gray-500 max-w-xl leading-relaxed mb-6">${summary || 'Passionate developer building scalable applications.'}</p>
    <div class="flex gap-4 flex-wrap">
      ${email ? `<a href="mailto:${email}" class="px-5 py-2.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">Contact</a>` : ''}
      ${github ? `<a href="https://github.com/${github}" target="_blank" class="px-5 py-2.5 border border-gray-200 text-sm rounded-lg hover:bg-gray-50 transition-colors">GitHub</a>` : ''}
    </div>
  </header>
  ${education && (education.college || education.degree) ? `
  <section class="mb-16">
    <h2 class="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">Education</h2>
    <div class="flex items-start justify-between">
      <div>
        <p class="font-bold">${education.college || 'University'}</p>
        <p class="text-gray-500 text-sm mt-1">${education.degree || 'B.Tech'} · Computer Science</p>
        ${education.cgpa ? `<p class="text-blue-600 text-sm font-semibold mt-1">CGPA: ${education.cgpa}</p>` : ''}
      </div>
      ${education.year ? `<span class="text-gray-400 text-sm">${education.year}</span>` : ''}
    </div>
  </section>` : ''}
  ${skillList.length ? `
  <section class="mb-16">
    <h2 class="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">Skills</h2>
    <div class="flex flex-wrap gap-2">
      ${skillList.map((s: string) => `<span class="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">${s}</span>`).join('')}
    </div>
  </section>` : ''}
  ${projects.length ? `
  <section class="mb-16">
    <h2 class="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">Projects</h2>
    <div class="space-y-6">
      ${projects.map((p: any) => `
      <div class="group py-5 border-b border-gray-100 hover:border-gray-300 transition-colors">
        <div class="flex items-center justify-between mb-2">
          <h3 class="font-bold">${p.name}</h3>
          ${p.url ? `<a href="${p.url}" target="_blank" class="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600">↗</a>` : ''}
        </div>
        <p class="text-gray-500 text-sm leading-relaxed">${p.description || 'A development project.'}</p>
        <div class="flex gap-3 mt-2 text-xs text-gray-400">
          ${p.language ? `<span>${p.language}</span>` : ''}
          ${p.techStack ? `<span>· ${p.techStack}</span>` : ''}
          ${p.stars ? `<span>⭐ ${p.stars}</span>` : ''}
        </div>
      </div>`).join('')}
    </div>
  </section>` : ''}
  <footer class="pt-8 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
    <span>© ${new Date().getFullYear()} ${name}</span>
    <div class="flex gap-4">
      ${email ? `<a href="mailto:${email}" class="hover:text-gray-900 transition-colors">${email}</a>` : ''}
      ${linkedin ? `<a href="${linkedin}" target="_blank" class="hover:text-gray-900 transition-colors">LinkedIn</a>` : ''}
    </div>
  </footer>
</div>
</body>
</html>`,
  }

  return templates[template] || templates.modern
}

export default function DetailsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const username = searchParams.get('username') || ''
  const templateId = searchParams.get('template') || 'modern'

  const [step, setStep] = useState(0)
  const [repos, setRepos] = useState<any[]>([])
  const [selectedProjects, setSelectedProjects] = useState<any[]>([])
  const [generatedHTML, setGeneratedHTML] = useState('')
  const [generating, setGenerating] = useState(false)
  const previewRef = useRef<HTMLIFrameElement>(null)

  const [personal, setPersonal] = useState({
    name: '', email: '', phone: '', location: '',
    github: username, linkedin: '', website: '', summary: '',
  })

  const [education, setEducation] = useState({
    college: '', degree: 'B.Tech', cgpa: '', year: '', branch: '',
  })

  const [skills, setSkills] = useState('')
  const [experience, setExperience] = useState('')
  const [projectDetails, setProjectDetails] = useState<Record<string, { description: string; techStack: string }>>({})

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    const gh = localStorage.getItem('githubUsername') || username
    setPersonal(prev => ({
      ...prev,
      name: storedUser.name || '',
      email: storedUser.email || '',
      github: gh,
    }))

    const saved = sessionStorage.getItem('githubRepos')
    if (saved) {
      setRepos(JSON.parse(saved))
    } else if (gh) {
      fetch(`http://localhost:5000/api/github/${gh}`)
        .then(r => r.json())
        .then(d => { if (Array.isArray(d)) { setRepos(d); sessionStorage.setItem('githubRepos', JSON.stringify(d)) } })
        .catch(() => { })
    }
  }, [username])

  const toggleProject = (repo: any) => {
    setSelectedProjects(prev => {
      const exists = prev.find(p => p.name === repo.name)
      if (exists) return prev.filter(p => p.name !== repo.name)
      if (prev.length >= 2) return prev
      return [...prev, repo]
    })
  }

  const handleGenerate = () => {
    setGenerating(true)
    const projects = selectedProjects.map(p => ({
      ...p,
      description: projectDetails[p.name]?.description || p.description || '',
      techStack: projectDetails[p.name]?.techStack || p.language || '',
    }))

    const html = generatePortfolioHTML({
      ...personal,
      education,
      skills,
      experience,
      projects,
      template: templateId,
    })

    setGeneratedHTML(html)
    setGenerating(false)
    setStep(4)
  }

  const handleDownload = () => {
    fetch('http://localhost:5000/api/analytics/download', { method: 'POST' }).catch(() => { })
    const blob = new Blob([generatedHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${personal.name?.replace(/\s+/g, '-').toLowerCase() || 'portfolio'}-portfolio.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const next = () => setStep(s => Math.min(s + 1, 4))
  const prev = () => setStep(s => Math.max(s - 1, 0))

  const inputCls = "h-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 rounded-xl transition-all text-sm"
  const labelCls = "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block"

  return (
    <div className="relative min-h-screen bg-[#030712]">
      <FloatingParticles />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Header */}
      <div className="relative z-10 sticky top-0 border-b border-white/5 bg-[#030712]/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="h-10 w-10 rounded-xl hover:bg-white/5 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-white">Portfolio Builder</p>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs capitalize">
                  {templateId}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">Step {step + 1} of {STEPS.length}</p>
            </div>
          </div>
          <Badge className="bg-white/5 text-gray-400 border-white/10 text-xs">
            {STEPS[step].label}
          </Badge>
        </div>
      </div>

      {/* Step Progress Bar */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-0">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i < step
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : i === step
                    ? 'bg-primary/20 text-primary border-2 border-primary/50 shadow-lg shadow-primary/10'
                    : 'bg-white/5 text-gray-600 border border-white/10'
                }`}>
                  {i < step ? <CheckCircle2 className="h-5 w-5" /> : s.icon && <s.icon className="h-4 w-4" />}
                </div>
                <span className={`text-[10px] mt-2 font-semibold ${
                  i === step ? 'text-primary' : i < step ? 'text-emerald-400' : 'text-gray-600'
                }`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 mb-5 transition-all duration-500 ${
                  i < step ? 'bg-emerald-500/50' : 'bg-white/5'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {/* STEP 0: Personal */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <Card className="relative overflow-hidden border-2 border-white/5 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_70%)]" />
                <div className="relative p-7 md:p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <User className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Personal Information</h2>
                      <p className="text-xs text-gray-400">Tell us about yourself</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Full Name *', key: 'name', ph: 'John Doe', icon: User },
                      { label: 'Email Address *', key: 'email', ph: 'john@example.com', icon: Mail },
                      { label: 'Phone Number', key: 'phone', ph: '+91 98765 43210', icon: Phone },
                      { label: 'Location', key: 'location', ph: 'Hyderabad, India', icon: MapPin },
                      { label: 'GitHub Username', key: 'github', ph: 'johndoe', icon: Github },
                      { label: 'LinkedIn URL', key: 'linkedin', ph: 'linkedin.com/in/john', icon: Linkedin },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="flex items-center gap-2 mb-2">
                          <f.icon className="h-3 w-3 text-gray-500" />
                          <span className={labelCls}>{f.label}</span>
                        </label>
                        <Input
                          className={inputCls}
                          value={(personal as any)[f.key]}
                          onChange={e => setPersonal(p => ({ ...p, [f.key]: e.target.value }))}
                          placeholder={f.ph}
                        />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 mb-2">
                        <Globe className="h-3 w-3 text-gray-500" />
                        <span className={labelCls}>Portfolio Website</span>
                      </label>
                      <Input
                        className={inputCls}
                        value={personal.website}
                        onChange={e => setPersonal(p => ({ ...p, website: e.target.value }))}
                        placeholder="johndoe.dev"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 mb-2">
                        <FileText className="h-3 w-3 text-gray-500" />
                        <span className={labelCls}>Professional Summary</span>
                      </label>
                      <textarea
                        className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-primary/50 focus:bg-white/10 min-h-28 transition-all"
                        value={personal.summary}
                        onChange={e => setPersonal(p => ({ ...p, summary: e.target.value }))}
                        placeholder="B.Tech CSE student passionate about full-stack development and open-source..."
                      />
                      <p className="text-xs text-gray-600 mt-2">{personal.summary.length}/300</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* STEP 1: Education */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <Card className="relative overflow-hidden border-2 border-white/5 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl shadow-2xl">
                <div className="relative p-7 md:p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <GraduationCap className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Education Details</h2>
                      <p className="text-xs text-gray-400">Your academic background</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'College / University *', key: 'college', ph: 'JNTU Hyderabad', full: true },
                      { label: 'Degree *', key: 'degree', ph: 'B.Tech' },
                      { label: 'Branch / Major', key: 'branch', ph: 'Computer Science Engineering' },
                      { label: 'CGPA / Percentage *', key: 'cgpa', ph: '8.5 / 10' },
                      { label: 'Graduation Year', key: 'year', ph: '2026' },
                    ].map(f => (
                      <div key={f.key} className={f.full ? 'sm:col-span-2' : ''}>
                        <label className={labelCls}>{f.label}</label>
                        <Input
                          className={inputCls}
                          value={(education as any)[f.key]}
                          onChange={e => setEducation(p => ({ ...p, [f.key]: e.target.value }))}
                          placeholder={f.ph}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className={labelCls}>Work Experience / Internships (optional)</label>
                    <textarea
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-primary/50 focus:bg-white/10 min-h-28 transition-all"
                      value={experience}
                      onChange={e => setExperience(e.target.value)}
                      placeholder={"Software Intern @ XYZ Corp (June 2024 - Aug 2024)\n- Built REST APIs using Node.js\n- Collaborated with frontend team on React features"}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* STEP 2: Skills */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <Card className="relative overflow-hidden border-2 border-white/5 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl shadow-2xl">
                <div className="relative p-7 md:p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                      <Code2 className="h-6 w-6 text-violet-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Technical Skills</h2>
                      <p className="text-xs text-gray-400">Technologies you work with</p>
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Skills (comma-separated) *</label>
                    <textarea
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-primary/50 focus:bg-white/10 min-h-32 transition-all"
                      value={skills}
                      onChange={e => setSkills(e.target.value)}
                      placeholder="React, TypeScript, Node.js, Express, MongoDB, Python, MySQL, Git, AWS, Docker, TailwindCSS, Next.js..."
                    />
                  </div>

                  {skills && (
                    <div>
                      <label className={labelCls}>Preview</label>
                      <div className="flex flex-wrap gap-2 p-5 bg-white/5 border border-white/10 rounded-2xl">
                        {skills.split(',').map(s => s.trim()).filter(Boolean).map((s, i) => (
                          <Badge key={i} className="px-3 py-1.5 bg-violet-500/10 text-violet-300 border border-violet-500/20 text-xs">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-500/5 to-purple-500/5 border border-violet-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Wand2 className="h-4 w-4 text-violet-400" />
                      <p className="text-sm font-semibold text-violet-400">Pro Tip</p>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Include languages, frameworks, databases, dev tools, and cloud platforms. The more relevant skills, the better your portfolio looks to recruiters.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* STEP 3: Projects */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <Card className="relative overflow-hidden border-2 border-white/5 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl shadow-2xl">
                <div className="relative p-7 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <Briefcase className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Select Projects</h2>
                      <p className="text-xs text-gray-400">Choose 2 featured projects</p>
                    </div>
                    <Badge className="ml-auto bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                      {selectedProjects.length}/2
                    </Badge>
                  </div>

                  {repos.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-2xl">
                      <Github className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                      <p className="font-semibold text-gray-400 mb-2">No repositories found</p>
                      <p className="text-sm text-gray-600 mb-6">Enter your GitHub username in Step 1</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
                      {repos.sort((a, b) => (b.stars || 0) - (a.stars || 0)).map((repo, i) => {
                        const isSelected = !!selectedProjects.find(p => p.name === repo.name)
                        const isDisabled = !isSelected && selectedProjects.length >= 2
                        return (
                          <div
                            key={i}
                            onClick={() => !isDisabled && toggleProject(repo)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-cyan-500/60 bg-cyan-500/5'
                                : isDisabled
                                ? 'border-white/5 opacity-30 cursor-not-allowed'
                                : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                                isSelected ? 'border-cyan-500 bg-cyan-500' : 'border-gray-700'
                              }`}>
                                {isSelected && <Check className="h-3.5 w-3.5 text-white" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                  <span className={`font-bold text-sm ${isSelected ? 'text-cyan-300' : 'text-gray-200'}`}>
                                    {repo.name}
                                  </span>
                                  {repo.language && (
                                    <Badge className="text-[10px] px-2 py-0 bg-white/5 border-white/10 text-gray-400">
                                      {repo.language}
                                    </Badge>
                                  )}
                                  {repo.stars > 0 && (
                                    <span className="text-xs text-yellow-400 flex items-center gap-1">
                                      <Star className="h-3 w-3 fill-current" />{repo.stars}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                  {repo.description || 'No description available'}
                                </p>
                              </div>
                              {repo.url && (
                                <a href={repo.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="flex-shrink-0">
                                  <ExternalLink className="h-4 w-4 text-gray-600 hover:text-gray-400" />
                                </a>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {selectedProjects.length > 0 && (
                    <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
                      <p className="text-sm font-semibold text-gray-300">Customize Descriptions</p>
                      {selectedProjects.map(p => (
                        <div key={p.name} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                          <p className="font-medium text-sm text-cyan-400">{p.name}</p>
                          <div>
                            <label className={labelCls}>Description</label>
                            <textarea
                              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-primary/50 min-h-20 transition-all"
                              value={projectDetails[p.name]?.description ?? (p.description || '')}
                              onChange={e => setProjectDetails(prev => ({ ...prev, [p.name]: { ...prev[p.name], description: e.target.value } }))}
                              placeholder="Describe the project and its impact..."
                            />
                          </div>
                          <div>
                            <label className={labelCls}>Tech Stack</label>
                            <Input
                              className={inputCls}
                              value={projectDetails[p.name]?.techStack ?? (p.language || '')}
                              onChange={e => setProjectDetails(prev => ({ ...prev, [p.name]: { ...prev[p.name], techStack: e.target.value } }))}
                              placeholder="React, Node.js, MongoDB..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}

          {/* STEP 4: Preview */}
          {step === 4 && generatedHTML && (
            <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <div className="space-y-5">
                <Card className="relative overflow-hidden border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-gray-900/80 to-gray-800/60 backdrop-blur-xl shadow-2xl">
                  <div className="relative p-6 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <Rocket className="h-6 w-6 text-emerald-400" />
                      </div>
                      <div>
                        <h2 className="font-bold text-lg text-white">Portfolio Ready!</h2>
                        <p className="text-sm text-gray-400">Download and open in browser. Print to save as PDF.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(3)} className="border-white/10 hover:border-white/20 rounded-xl">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Edit
                      </Button>
                      <Button onClick={handleDownload} size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl shadow-emerald-500/25 rounded-xl">
                        <Download className="h-4 w-4 mr-2" /> Download HTML
                      </Button>
                    </div>
                  </div>
                </Card>

                <div className="border-2 border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-2 px-5 py-3 bg-white/5 border-b border-white/10">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400/80" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                      <div className="h-3 w-3 rounded-full bg-green-400/80" />
                    </div>
                    <p className="text-xs text-gray-500 ml-2 font-mono">portfolio.html</p>
                    <Badge className="ml-auto bg-white/5 text-gray-400 border-white/10 text-xs">
                      <Eye className="h-3 w-3 mr-1" /> Live Preview
                    </Badge>
                  </div>
                  <iframe
                    ref={previewRef}
                    srcDoc={generatedHTML}
                    className="w-full bg-white"
                    style={{ height: '70vh', border: 'none' }}
                    title="Portfolio Preview"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={prev}
              disabled={step === 0}
              className="border-white/10 hover:border-white/20 bg-white/5 rounded-xl"
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Back
            </Button>

            <div className="flex items-center gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`h-1.5 w-1.5 rounded-full transition-all ${
                  i === step ? 'bg-primary w-4' : i < step ? 'bg-emerald-400' : 'bg-gray-700'
                }`} />
              ))}
            </div>

            {step < 3 ? (
              <Button onClick={next} disabled={step === 0 && !personal.name} className="rounded-xl">
                Next <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleGenerate}
                disabled={generating || selectedProjects.length !== 2}
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl shadow-indigo-500/25 rounded-xl"
              >
                {generating ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" /> Generate Portfolio
                  </span>
                )}
              </Button>
            )}
          </div>
        )}

        {step === 3 && (
          <p className="text-center text-sm mt-4">
            {selectedProjects.length === 0 ? (
              <span className="text-yellow-400">Please select 2 projects to continue</span>
            ) : selectedProjects.length === 1 ? (
              <span className="text-yellow-400">Please select 1 more project</span>
            ) : (
              <span className="text-emerald-400 flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Ready to generate!
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  )
}