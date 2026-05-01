'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Download, ArrowLeft, ExternalLink, Star, Github, Mail, Linkedin, Globe, Code2, Briefcase, User, MapPin, Twitter } from 'lucide-react'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SkillBadge({ skill }: { skill: string }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
      {skill}
    </span>
  )
}

// ─── Template: Minimal ────────────────────────────────────────────────────────

function MinimalTemplate({ user, repos, skills }: any) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Inter',sans-serif]">
      <div className="max-w-3xl mx-auto px-8 py-16">
        <header className="mb-20">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-5xl font-black tracking-tight mb-2">{user?.name || 'Developer'}</h1>
              <p className="text-xl text-gray-500">Full-Stack Developer</p>
            </div>
            <div className="flex gap-3 mt-2">
              <a href={`https://github.com/${user?.githubUsername}`} target="_blank" rel="noreferrer" className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href={`mailto:${user?.email}`} className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed max-w-xl">
            {user?.bio || `Passionate developer building scalable applications. ${repos.length} open-source projects on GitHub.`}
          </p>
          <div className="flex gap-4 mt-6">
            <a href={`https://github.com/${user?.githubUsername}`} target="_blank" rel="noreferrer"
              className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
              GitHub Profile
            </a>
            <a href={`mailto:${user?.email}`}
              className="px-5 py-2.5 border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Contact Me
            </a>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">Projects</h2>
          <div className="space-y-6">
            {repos.slice(0, 6).map((r: any, i: number) => (
              <div key={i} className="group flex items-start justify-between py-5 border-b border-gray-100 hover:border-gray-300 transition-colors">
                <div className="flex-1 pr-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-base group-hover:text-blue-600 transition-colors">{r.name}</h3>
                    {r.language && <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{r.language}</span>}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{r.description || 'No description provided.'}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Star className="h-3 w-3" />{r.stars || 0} stars</span>
                  </div>
                </div>
                <a href={r.url} target="_blank" rel="noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {skills.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s: string, i: number) => (
                <span key={i} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">{s}</span>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-8 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
          <span>© {new Date().getFullYear()} {user?.name}</span>
          <span>Built with Portfolio Generator</span>
        </footer>
      </div>
    </div>
  )
}

// ─── Template: Modern SaaS ────────────────────────────────────────────────────

function ModernTemplate({ user, repos, skills }: any) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-['Inter',sans-serif]">
      <nav className="border-b border-white/5 px-8 py-4 flex justify-between items-center sticky top-0 bg-[#0a0a0f]/80 backdrop-blur z-10">
        <span className="font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent text-lg">{user?.name || 'Developer'}</span>
        <div className="flex gap-6 text-sm text-gray-400">
          {['Work', 'Skills', 'Contact'].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a>)}
        </div>
        <a href={`https://github.com/${user?.githubUsername}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-colors">
          <Github className="h-4 w-4" /> GitHub
        </a>
      </nav>

      <section className="px-8 py-28 max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </div>
          <h1 className="text-6xl font-black leading-tight mb-5">
            Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">{user?.name?.split(' ')[0] || 'Dev'}</span>
            <br />I Build the Future.
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            {user?.bio || `Full-stack developer with ${repos.length} projects. Passionate about clean code and great user experiences.`}
          </p>
          <div className="flex gap-4">
            <a href="#work" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">View My Work →</a>
            <a href={`mailto:${user?.email}`} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors">Get In Touch</a>
          </div>
        </div>
        <div className="flex gap-8 mt-14 text-sm">
          {[
            { label: 'Projects', value: repos.length },
            { label: 'Total Stars', value: repos.reduce((a: number, r: any) => a + (r.stars || 0), 0) },
            { label: 'Languages', value: [...new Set(repos.map((r: any) => r.language).filter(Boolean))].length },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-3xl font-black text-white">{s.value}+</p>
              <p className="text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="px-8 py-16 max-w-5xl mx-auto">
        <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-8 font-semibold">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.slice(0, 6).map((r: any, i: number) => (
            <a key={i} href={r.url} target="_blank" rel="noreferrer"
              className="group p-5 bg-white/[0.03] border border-white/[0.07] rounded-2xl hover:border-violet-500/40 hover:bg-white/[0.06] transition-all">
              <div className="flex items-start justify-between mb-3">
                <Code2 className="h-5 w-5 text-violet-400" />
                <ExternalLink className="h-4 w-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
              </div>
              <h3 className="font-bold text-sm mb-2 group-hover:text-violet-300 transition-colors">{r.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{r.description || 'No description provided.'}</p>
              <div className="flex items-center gap-3 mt-4 text-xs text-gray-600">
                {r.language && <span className="text-gray-400">{r.language}</span>}
                <span className="flex items-center gap-1"><Star className="h-3 w-3" />{r.stars || 0}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {skills.length > 0 && (
        <section id="skills" className="px-8 py-16 max-w-5xl mx-auto border-t border-white/5">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-8 font-semibold">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s: string, i: number) => (
              <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:border-violet-500/40 transition-colors">{s}</span>
            ))}
          </div>
        </section>
      )}

      <footer id="contact" className="px-8 py-16 max-w-5xl mx-auto border-t border-white/5 text-center">
        <h2 className="text-4xl font-black mb-4">Let's Work Together</h2>
        <p className="text-gray-400 mb-8">Open to full-time roles, freelance projects, and collaboration.</p>
        <a href={`mailto:${user?.email}`} className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
          <Mail className="h-4 w-4" /> Send Me an Email
        </a>
        <p className="text-xs text-gray-600 mt-12">© {new Date().getFullYear()} {user?.name} · Built with Portfolio Generator</p>
      </footer>
    </div>
  )
}

// ─── Template: Dark Hacker ────────────────────────────────────────────────────

function DarkTemplate({ user, repos, skills }: any) {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <div className="max-w-3xl mx-auto px-8 py-12">
        <header className="mb-12 border-b border-green-900/50 pb-8">
          <div className="text-green-600 text-sm mb-4 flex items-center gap-2">
            <span className="text-green-500">$</span> whoami <span className="animate-pulse">█</span>
          </div>
          <h1 className="text-4xl font-bold text-green-300 mb-2">{user?.name || 'developer'}</h1>
          <p className="text-green-600 mb-1">const role = <span className="text-green-400">"Full-Stack Engineer"</span>;</p>
          <p className="text-green-600 mb-1">const location = <span className="text-green-400">"{user?.location || 'Remote'}"</span>;</p>
          <p className="text-green-600">const status = <span className="text-green-400">"open_to_work"</span>;</p>
          <div className="flex gap-4 mt-6">
            <a href={`https://github.com/${user?.githubUsername}`} target="_blank" rel="noreferrer" className="text-green-400 hover:text-green-300 text-sm border border-green-800 px-4 py-2 rounded hover:border-green-600 transition-colors">
              [ github ]
            </a>
            <a href={`mailto:${user?.email}`} className="text-green-400 hover:text-green-300 text-sm border border-green-800 px-4 py-2 rounded hover:border-green-600 transition-colors">
              [ email ]
            </a>
          </div>
        </header>

        <section className="mb-12">
          <p className="text-green-600 text-sm mb-6">
            <span className="text-green-500">$</span> ls -la projects/
          </p>
          <div className="space-y-3">
            {repos.slice(0, 8).map((r: any, i: number) => (
              <a key={i} href={r.url} target="_blank" rel="noreferrer"
                className="group flex items-start gap-4 p-4 border border-green-900/40 rounded hover:border-green-600/60 hover:bg-green-950/20 transition-all block">
                <span className="text-green-700 text-sm w-6 mt-0.5">{String(i+1).padStart(2,'0')}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-green-300 font-bold group-hover:text-green-200">{r.name}</span>
                    {r.language && <span className="text-green-700 text-xs">[{r.language}]</span>}
                    <span className="text-green-700 text-xs">★{r.stars||0}</span>
                  </div>
                  <p className="text-green-700 text-xs mt-1">{r.description || '// No description'}</p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-green-800 group-hover:text-green-600 transition-colors mt-1" />
              </a>
            ))}
          </div>
        </section>

        {skills.length > 0 && (
          <section className="mb-12">
            <p className="text-green-600 text-sm mb-4"><span className="text-green-500">$</span> cat skills.txt</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((s: string, i: number) => (
                <span key={i} className="px-2 py-1 border border-green-800 text-green-500 text-xs rounded hover:border-green-600 transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        <footer className="border-t border-green-900/50 pt-6 text-green-700 text-xs">
          <span>// {new Date().getFullYear()} {user?.name} · portfolio_generator v1.0</span>
        </footer>
      </div>
    </div>
  )
}

// ─── Template: Startup Founder ────────────────────────────────────────────────

function StartupTemplate({ user, repos, skills }: any) {
  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      <nav className="px-8 py-5 flex justify-between items-center border-b border-gray-100 sticky top-0 bg-white z-10">
        <span className="font-black text-xl text-orange-500">{user?.name?.split(' ')[0] || 'Dev'}.</span>
        <div className="flex gap-6 text-sm text-gray-500">
          {['Work','About','Contact'].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-gray-900 transition-colors">{l}</a>)}
        </div>
        <a href={`mailto:${user?.email}`} className="px-5 py-2.5 bg-orange-500 text-white rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors">
          Hire Me →
        </a>
      </nav>

      <section className="px-8 py-24 max-w-5xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold border border-orange-200 mb-8">
          🚀 Available for new projects
        </span>
        <h1 className="text-6xl md:text-7xl font-black leading-none tracking-tight mb-6 text-gray-900">
          I Build<br />
          <span className="text-orange-500">Products</span><br />
          People Love.
        </h1>
        <p className="text-xl text-gray-500 max-w-xl mb-10 leading-relaxed">
          {user?.bio || `Full-stack developer who ships fast. ${repos.length} projects live.`}
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#work" className="px-8 py-4 bg-orange-500 text-white rounded-full font-bold text-base hover:bg-orange-600 transition-colors">
            See My Work
          </a>
          <a href={`https://github.com/${user?.githubUsername}`} target="_blank" rel="noreferrer" className="px-8 py-4 border-2 border-gray-200 rounded-full font-bold text-base hover:border-gray-400 transition-colors flex items-center gap-2">
            <Github className="h-5 w-5" /> GitHub
          </a>
        </div>
        <div className="flex gap-12 mt-16">
          {[
            { n: repos.length, l: 'Projects Shipped' },
            { n: repos.reduce((a: number, r: any) => a + (r.stars||0), 0), l: 'GitHub Stars' },
            { n: [...new Set(repos.map((r: any)=>r.language).filter(Boolean))].length, l: 'Languages' },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-4xl font-black text-orange-500">{s.n}+</p>
              <p className="text-gray-500 text-sm mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="px-8 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-black mb-10">Recent Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.slice(0, 6).map((r: any, i: number) => (
            <a key={i} href={r.url} target="_blank" rel="noreferrer"
              className="group bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all">
              <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                <Briefcase className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="font-bold text-base mb-2 group-hover:text-orange-600 transition-colors">{r.name}</h3>
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{r.description || 'No description provided.'}</p>
              <div className="flex items-center gap-3 mt-4 text-xs text-gray-400">
                {r.language && <span>{r.language}</span>}
                <span>⭐ {r.stars||0}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer id="contact" className="bg-gray-50 px-8 py-20 text-center">
        <h2 className="text-4xl font-black mb-4">Ready to build something great?</h2>
        <p className="text-gray-500 mb-8">I'm available for freelance and full-time opportunities.</p>
        <a href={`mailto:${user?.email}`} className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-colors">
          <Mail className="h-5 w-5" /> Get In Touch
        </a>
        <p className="text-xs text-gray-400 mt-12">© {new Date().getFullYear()} {user?.name}</p>
      </footer>
    </div>
  )
}

// ─── Template: Animated ───────────────────────────────────────────────────────

function AnimatedTemplate({ user, repos, skills }: any) {
  return (
    <div className="min-h-screen bg-[#050a14] text-white font-['Inter',sans-serif] overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 h-96 w-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <nav className="relative border-b border-white/5 px-8 py-5 flex justify-between items-center">
        <span className="font-black text-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{user?.name?.split(' ')[0] || 'Dev'}</span>
        <div className="flex gap-6 text-sm text-gray-500">
          {['Projects','Skills','Contact'].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">{l}</a>)}
        </div>
      </nav>

      <section className="relative px-8 py-24 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/5 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-mono mb-8 tracking-wider">
          FULL STACK DEVELOPER
        </div>
        <h1 className="text-6xl font-black leading-tight mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          {user?.name || 'Developer'}
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {user?.bio || `Building ${repos.length} open-source projects. Crafting seamless experiences with modern tech.`}
        </p>
        <div className="flex justify-center gap-4">
          <a href="#projects" className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-colors">
            View Projects →
          </a>
          <a href={`https://github.com/${user?.githubUsername}`} target="_blank" rel="noreferrer" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </section>

      <section id="projects" className="relative px-8 py-16 max-w-5xl mx-auto">
        <h2 className="text-xs uppercase tracking-widest text-gray-600 mb-8 font-semibold">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {repos.slice(0, 6).map((r: any, i: number) => (
            <a key={i} href={r.url} target="_blank" rel="noreferrer"
              className="group p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm group-hover:text-cyan-400 transition-colors">{r.name}</h3>
                <ExternalLink className="h-3.5 w-3.5 text-gray-700 group-hover:text-gray-400 transition-colors" />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{r.description || 'No description.'}</p>
              <div className="flex items-center gap-3 mt-4 text-xs">
                {r.language && <span className="text-cyan-600">{r.language}</span>}
                <span className="text-gray-600 flex items-center gap-1"><Star className="h-3 w-3" />{r.stars||0}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {skills.length > 0 && (
        <section id="skills" className="relative px-8 py-16 max-w-5xl mx-auto border-t border-white/5">
          <h2 className="text-xs uppercase tracking-widest text-gray-600 mb-8 font-semibold">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s: string, i: number) => (
              <span key={i} className="px-3 py-1.5 bg-cyan-500/5 border border-cyan-500/15 text-cyan-400 rounded-full text-xs font-mono hover:border-cyan-500/40 transition-colors">
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      <footer id="contact" className="relative px-8 py-16 max-w-5xl mx-auto border-t border-white/5 text-center">
        <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Let's Connect</h2>
        <a href={`mailto:${user?.email}`} className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors mt-4">
          <Mail className="h-5 w-5" /> {user?.email || 'Send Email'}
        </a>
        <p className="text-xs text-gray-700 mt-10">© {new Date().getFullYear()} {user?.name}</p>
      </footer>
    </div>
  )
}

// ─── Template: Glassmorphism ──────────────────────────────────────────────────

function GlassTemplate({ user, repos, skills }: any) {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f64f59 60%, #c471ed 100%)' }}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-96 w-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 bg-pink-300/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 bg-yellow-200/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-8 py-12">
        <nav className="flex justify-between items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 mb-16">
          <span className="font-bold text-white text-lg">{user?.name || 'Developer'}</span>
          <div className="flex gap-6 text-sm text-white/70">
            {['Work','Skills','Contact'].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a>)}
          </div>
          <a href={`mailto:${user?.email}`} className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold rounded-xl border border-white/30 transition-colors">
            Contact
          </a>
        </nav>

        <section className="text-center py-12 mb-16">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white/80 text-sm font-medium mb-8">
            ✨ Available for work
          </div>
          <h1 className="text-6xl font-black text-white mb-4 drop-shadow-lg">{user?.name || 'Developer'}</h1>
          <p className="text-white/70 text-xl mb-10 max-w-xl mx-auto">
            {user?.bio || `Developer · Designer · Creator · ${repos.length} projects`}
          </p>
          <div className="flex justify-center gap-4">
            <a href="#work" className="px-6 py-3 bg-white/20 backdrop-blur border border-white/30 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors">
              View Work
            </a>
            <a href={`https://github.com/${user?.githubUsername}`} target="_blank" rel="noreferrer"
              className="px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </section>

        <section id="work" className="mb-16">
          <h2 className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-6">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.slice(0, 6).map((r: any, i: number) => (
              <a key={i} href={r.url} target="_blank" rel="noreferrer"
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/20 hover:border-white/40 transition-all">
                <h3 className="font-bold text-white text-sm mb-2 group-hover:text-yellow-200 transition-colors">{r.name}</h3>
                <p className="text-white/60 text-xs leading-relaxed line-clamp-3">{r.description || 'No description provided.'}</p>
                <div className="flex items-center gap-3 mt-4 text-xs text-white/40">
                  {r.language && <span className="text-white/60">{r.language}</span>}
                  <span className="flex items-center gap-1"><Star className="h-3 w-3" />{r.stars||0}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {skills.length > 0 && (
          <section id="skills" className="mb-16">
            <h2 className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-6">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s: string, i: number) => (
                <span key={i} className="px-3 py-1.5 bg-white/10 backdrop-blur border border-white/20 text-white/80 text-xs rounded-full hover:bg-white/20 transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        <footer id="contact" className="text-center py-12 bg-white/5 backdrop-blur border border-white/10 rounded-2xl">
          <h2 className="text-3xl font-black text-white mb-4">Let's Create Together</h2>
          <a href={`mailto:${user?.email}`} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-white/90 transition-colors">
            <Mail className="h-5 w-5" /> {user?.email || 'Contact Me'}
          </a>
          <p className="text-white/40 text-xs mt-8">© {new Date().getFullYear()} {user?.name}</p>
        </footer>
      </div>
    </div>
  )
}

// ─── Template Map ─────────────────────────────────────────────────────────────

const TEMPLATE_MAP: Record<string, React.ComponentType<any>> = {
  minimal: MinimalTemplate,
  modern: ModernTemplate,
  dark: DarkTemplate,
  startup: StartupTemplate,
  animated: AnimatedTemplate,
  glass: GlassTemplate,
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const username = params.username as string
  const templateId = searchParams.get('template') || 'modern'

  const [repos, setRepos] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const portfolioRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))

    const storedSkills = localStorage.getItem('skills')
    if (storedSkills) setSkills(JSON.parse(storedSkills))

    // Load repos
    const savedRepos = sessionStorage.getItem('githubRepos')
    if (savedRepos) {
      setRepos(JSON.parse(savedRepos))
      setLoading(false)
    } else {
      fetch(`http://localhost:5000/api/github/${username}`)
        .then(r => {
          if (!r.ok) throw new Error('User not found')
          return r.json()
        })
        .then(data => {
          if (Array.isArray(data)) {
            setRepos(data)
            sessionStorage.setItem('githubRepos', JSON.stringify(data))
          }
          setLoading(false)
        })
        .catch(err => {
          setError(err.message)
          setLoading(false)
        })
    }
  }, [username])

  const handleDownload = () => {
    const TemplateComp = TEMPLATE_MAP[templateId] || ModernTemplate
    const element = portfolioRef.current
    if (!element) return

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${user?.name || username} — Portfolio</title>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet">
<style>body{font-family:'Inter',sans-serif}</style>
</head>
<body>
${element.innerHTML}
</body>
</html>`

    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${username}-portfolio.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const TemplateComp = TEMPLATE_MAP[templateId] || ModernTemplate

  return (
    <div className="min-h-screen bg-background">
      {/* Toolbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
          </Button>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground">{username}</span>
            <span>·</span>
            <span className="capitalize">{templateId} template</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm">
              <Github className="h-4 w-4 mr-1.5" /> GitHub
            </Button>
          </a>
          <Button size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1.5" /> Download HTML
          </Button>
        </div>
      </div>

      {/* Portfolio */}
      <div className="pt-12" ref={portfolioRef}>
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center space-y-4">
              <div className="h-10 w-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-muted-foreground">Loading {username}'s portfolio...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center space-y-4">
              <p className="text-destructive font-semibold">{error}</p>
              <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
            </div>
          </div>
        ) : (
          <TemplateComp user={user} repos={repos} skills={skills} />
        )}
      </div>
    </div>
  )
}