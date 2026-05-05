'use client'
import { useRouter } from "next/navigation";
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Github, Mail, Sparkles, ArrowRight, CheckCircle2,
  Eye, EyeOff, User, Lock, Shield, Zap, Check
} from 'lucide-react'

// ── Ambient background blobs ──────────────────────────────────────────────────
function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Top indigo glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)' }} />
      {/* Bottom purple glow */}
      <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
      {/* Left cyan accent */}
      <div className="absolute top-1/3 -left-20 h-[300px] w-[300px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)' }} />
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
    </div>
  )
}

// ── Floating feature pill ─────────────────────────────────────────────────────
function FeaturePill({ icon, text, delay }: { icon: React.ReactNode; text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/[0.04] backdrop-blur"
    >
      {icon}
      <span className="text-[11px] font-medium text-gray-400">{text}</span>
    </motion.div>
  )
}

// ── Strength meter ────────────────────────────────────────────────────────────
function StrengthMeter({ password }: { password: string }) {
  const strength = password.length >= 10 ? 3 : password.length >= 6 ? 2 : password.length > 0 ? 1 : 0
  const labels = ['', 'Weak', 'Good', 'Strong']
  const colors = ['', 'bg-red-500', 'bg-yellow-400', 'bg-emerald-400']
  const textColors = ['', 'text-red-400', 'text-yellow-400', 'text-emerald-400']
  if (!password) return null
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2.5 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${i <= strength ? colors[strength] : ''}`}
              initial={{ width: 0 }}
              animate={{ width: i <= strength ? '100%' : '0%' }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            />
          </div>
        ))}
      </div>
      <p className={`text-[11px] font-medium ${textColors[strength]}`}>{labels[strength]} password</p>
    </motion.div>
  )
}

// ── Styled input wrapper ──────────────────────────────────────────────────────
function FormField({
  id, name, label, type = 'text', placeholder, value, onChange,
  icon: Icon, rightEl, hint
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-1.5"
    >
      <label htmlFor={id} className="block text-[11px] font-semibold uppercase tracking-widest text-gray-500">
        {label}
      </label>
      <div className="relative group">
        {/* Glow ring on focus */}
        <div className="absolute -inset-px rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.3))', filter: 'blur(4px)' }} />
        <div className="relative">
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 group-focus-within:text-indigo-400 transition-colors z-10 pointer-events-none" />
          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            className="w-full h-12 pl-11 pr-11 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:bg-white/[0.07] focus:border-indigo-500/40 transition-all duration-200"
          />
          {rightEl && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10">{rightEl}</div>
          )}
        </div>
      </div>
      {hint}
    </motion.div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) { setError('Please enter your full name'); return }
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return }

    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register` , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.message || data.error || 'Registration failed'); return }
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setSuccess(true)
        setTimeout(() => router.push('/dashboard'), 900)
      } else {
        router.push('/login')
      }
    } catch { setError('Cannot connect to server. Make sure backend is running.') }
    finally { setLoading(false) }
  }

  const pwMatch = formData.confirmPassword && formData.password === formData.confirmPassword
  const pwMismatch = formData.confirmPassword && formData.password !== formData.confirmPassword

  return (
    <div className="relative min-h-screen flex bg-[#030712] overflow-hidden">
      <AmbientBackground />

      {/* ── Left Panel (desktop) ── */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] flex-shrink-0 relative p-12 border-r border-white/[0.04]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-black text-xl text-white">Folio<span className="text-indigo-400">Forge</span></span>
          </Link>
        </div>

        <div className="space-y-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <p className="text-[11px] font-bold uppercase tracking-[3px] text-indigo-400 mb-4">Trusted by developers</p>
              <h2 className="text-4xl font-black text-white leading-tight">
                Build your dream<br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  portfolio today
                </span>
              </h2>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">
              Connect your GitHub, fill your details, and get a stunning professional portfolio in minutes — no design skills needed.
            </motion.p>
          </div>

          {/* Feature list */}
          <motion.ul className="space-y-3.5" initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }}>
            {[
              { icon: '⚡', text: 'Auto-import all GitHub repositories' },
              { icon: '🎨', text: '6 stunning professional templates' },
              { icon: '🤖', text: 'AI-generated project descriptions' },
              { icon: '🚀', text: 'One-click deploy to Vercel' },
              { icon: '📊', text: 'Real-time analytics dashboard' },
              { icon: '📄', text: 'Professional resume generator' },
            ].map((f, i) => (
              <motion.li key={i} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-base flex-shrink-0">
                  {f.icon}
                </div>
                <span className="text-sm text-gray-300">{f.text}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Social proof */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex items-center gap-4 pt-2 border-t border-white/[0.05]">
            <div className="flex -space-x-2">
              {['A', 'B', 'C', 'D'].map((l, i) => (
                <div key={l} className="h-8 w-8 rounded-full border-2 border-[#030712] flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'][i] }}>{l}</div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-white">2,400+ developers</p>
              <p className="text-[11px] text-gray-500">already building portfolios</p>
            </div>
          </motion.div>
        </div>

        <p className="text-xs text-gray-700">© {new Date().getFullYear()} FolioForge. All rights reserved.</p>
      </div>

      {/* ── Right Panel — Form ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 relative">
        <div className="w-full max-w-[420px]">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-black text-xl text-white">Folio<span className="text-indigo-400">Forge</span></span>
            </Link>
          </div>

          {/* Heading */}
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-indigo-400">Free Forever · No Credit Card</span>
            </div>
            <h1 className="text-3xl font-black text-white leading-tight">Create your account</h1>
            <p className="text-gray-400 text-sm mt-1.5">Start building your portfolio in minutes</p>
          </motion.div>

          {/* Card */}
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-1 rounded-2xl opacity-20 blur-xl pointer-events-none"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)' }} />

            <div className="relative rounded-2xl border border-white/[0.07] bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-2xl overflow-hidden">
              {/* Top shimmer line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
              {/* Inner top glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.07),transparent_60%)] pointer-events-none" />

              <div className="relative p-7 space-y-5">

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, y: -6, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/8 border border-red-500/20">
                      <div className="h-5 w-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-400 text-xs font-bold">!</span>
                      </div>
                      <p className="text-sm text-red-400 leading-relaxed">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormField
                    id="name" name="name" label="Full Name" type="text"
                    placeholder="John Doe" value={formData.name}
                    onChange={handleChange} icon={User}
                  />

                  <FormField
                    id="email" name="email" label="Email Address" type="email"
                    placeholder="you@example.com" value={formData.email}
                    onChange={handleChange} icon={Mail}
                  />

                  <FormField
                    id="password" name="password" label="Password" type={showPw ? 'text' : 'password'}
                    placeholder="Min. 6 characters" value={formData.password}
                    onChange={handleChange} icon={Lock}
                    rightEl={
                      <button type="button" onClick={() => setShowPw(!showPw)}
                        className="text-gray-600 hover:text-gray-400 transition-colors">
                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    }
                    hint={<StrengthMeter password={formData.password} />}
                  />

                  <FormField
                    id="confirmPassword" name="confirmPassword" label="Confirm Password"
                    type={showConfirm ? 'text' : 'password'} placeholder="Repeat your password"
                    value={formData.confirmPassword} onChange={handleChange} icon={Shield}
                    rightEl={
                      <div className="flex items-center gap-1">
                        {pwMatch && <Check className="h-4 w-4 text-emerald-400" />}
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                          className="text-gray-600 hover:text-gray-400 transition-colors">
                          {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    }
                    hint={
                      <AnimatePresence>
                        {pwMismatch && (
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="text-[11px] text-red-400 mt-1.5 flex items-center gap-1.5">
                            <span className="h-1 w-1 rounded-full bg-red-400 flex-shrink-0" /> Passwords don't match
                          </motion.p>
                        )}
                      </AnimatePresence>
                    }
                  />

                  {/* Terms checkbox */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className="flex items-start gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setAgreed(!agreed)}
                      className={`h-5 w-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 ${
                        agreed ? 'bg-indigo-500 border-indigo-500 shadow-lg shadow-indigo-500/30' : 'border-white/15 hover:border-white/30 bg-white/[0.03]'
                      }`}
                    >
                      <AnimatePresence>
                        {agreed && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check className="h-3 w-3 text-white" strokeWidth={3} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      I agree to the{' '}
                      <Link href="/terms" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Terms of Service</Link>
                      {' '}and{' '}
                      <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Privacy Policy</Link>
                    </p>
                  </motion.div>

                  {/* Submit button */}
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                    <button
                      type="submit"
                      disabled={loading || !agreed}
                      className="relative w-full h-12 rounded-xl text-sm font-bold text-white overflow-hidden transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed group"
                      style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%)', backgroundSize: '200%' }}
                    >
                      {/* Hover shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                      {/* Shadow */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ boxShadow: '0 0 30px rgba(99,102,241,0.5)' }} />
                      <span className="relative flex items-center justify-center gap-2">
                        {loading ? (
                          <><span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Creating account...</>
                        ) : success ? (
                          <><Check className="h-4 w-4" />Account created! Redirecting...</>
                        ) : (
                          <>Create Account <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" /></>
                        )}
                      </span>
                    </button>
                  </motion.div>
                </form>

                {/* Divider */}
                <div className="relative flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/[0.05]" />
                  <span className="text-[11px] text-gray-600 font-medium">or sign up with</span>
                  <div className="flex-1 h-px bg-white/[0.05]" />
                </div>

                {/* Social buttons */}
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { icon: Github, label: 'GitHub' },
                    { icon: Mail, label: 'Google' },
                  ].map(({ icon: Icon, label }) => (
                    <button key={label} disabled
                      className="h-11 flex items-center justify-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-gray-400 text-sm font-medium transition-all hover:border-white/[0.12] hover:bg-white/[0.06] disabled:opacity-40 disabled:cursor-not-allowed">
                      <Icon className="h-4 w-4" />{label}
                    </button>
                  ))}
                </div>

                {/* Sign in link */}
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                    Sign in →
                  </Link>
                </p>

                {/* Trust pills */}
                <div className="flex items-center justify-center gap-3 flex-wrap pt-1">
                  {[
                    { icon: <Lock className="h-3 w-3" />, text: 'Encrypted' },
                    { icon: <Zap className="h-3 w-3" />, text: 'Free forever' },
                    { icon: <Shield className="h-3 w-3" />, text: 'No spam' },
                  ].map(p => (
                    <span key={p.text} className="flex items-center gap-1.5 text-[11px] text-gray-600">
                      {p.icon} {p.text}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom shimmer line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}