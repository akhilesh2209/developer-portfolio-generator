'use client'
import { useRouter } from "next/navigation";
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Github, Mail, Sparkles, ArrowRight, Eye, EyeOff,
  Lock, Mail as MailIcon, Zap, Shield, Check, Star,
  ArrowLeft, LogIn, Heart
} from 'lucide-react'

// ── Ambient Background with useMemo ──────────────────────────────────────────
function AmbientBackground() {
  const blobs = useMemo(() => [
    { id: 1, left: '50%', top: '-15%', size: 650, color: 'rgba(99,102,241,0.16)' },
    { id: 2, left: '75%', top: '65%', size: 450, color: 'rgba(139,92,246,0.1)' },
    { id: 3, left: '15%', top: '35%', size: 280, color: 'rgba(6,182,212,0.06)' },
  ], [])

  const gridStyle = useMemo(() => ({
    backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
    backgroundSize: '60px 60px',
  }), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {blobs.map(blob => (
        <motion.div
          key={blob.id}
          className="absolute rounded-full"
          style={{
            left: blob.left,
            top: blob.top,
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 10 + blob.id * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: blob.id * 0.8,
          }}
        />
      ))}
      <div className="absolute inset-0 opacity-[0.015]" style={gridStyle} />
    </div>
  )
}

// ── Form Field Component ──────────────────────────────────────────────────────
function FormField({ id, name, label, type = 'text', placeholder, value, onChange, icon: Icon, rightEl }: any) {
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
    </motion.div>
  )
}

// ── Main Page Component ───────────────────────────────────────────────────────
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setIsLoading(true);

const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || data.error || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      router.push("/dashboard");

    } catch (error) {
      console.error(error);
      setError("Cannot connect to server. Make sure backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const features = useMemo(() => [
    { icon: '⚡', text: 'Instant portfolio generation' },
    { icon: '🎨', text: '6 professional templates' },
    { icon: '🚀', text: 'One-click deployment' },
    { icon: '📊', text: 'Real-time analytics' },
  ], [])

  return (
    <div className="relative min-h-screen flex bg-[#030712] overflow-hidden">
      <AmbientBackground />

      {/* ── Left Panel (desktop) ── */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] flex-shrink-0 relative p-12 border-r border-white/[0.04]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-black text-xl text-white">Folio<span className="text-indigo-400">Forge</span></span>
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-semibold text-indigo-400">Welcome back</span>
              </div>
              <h2 className="text-4xl font-black text-white leading-tight">
                Your portfolio is<br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  waiting for you
                </span>
              </h2>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">
              Sign in to access your dashboard, manage projects, and deploy your portfolio.
            </motion.p>
          </div>

          {/* Feature list */}
          <motion.div className="space-y-3" initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all duration-200"
              >
                <div className="h-8 w-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-base flex-shrink-0">
                  {f.icon}
                </div>
                <span className="text-sm text-gray-300">{f.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonial */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-400 italic leading-relaxed mb-3">
              "This tool helped me land my dream job. The templates are stunning and the GitHub integration is seamless."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
                SC
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Sarah Chen</p>
                <p className="text-[11px] text-gray-500">Full Stack Developer at Stripe</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-700">
          <Lock className="h-3 w-3" />
          <span>256-bit encrypted · © {new Date().getFullYear()} FolioForge</span>
        </div>
      </div>

      {/* ── Right Panel — Form ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 lg:py-20 relative">
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
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-semibold text-emerald-400">Secure Login</span>
            </div>
            <h1 className="text-3xl font-black text-white leading-tight">Welcome back</h1>
            <p className="text-gray-400 text-sm mt-1.5">Sign in to continue building your portfolio</p>
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
                    id="email" name="email" label="Email Address" type="email"
                    placeholder="you@example.com" value={email}
                    onChange={(e: any) => { setEmail(e.target.value); setError(''); }}
                    icon={MailIcon}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="password" className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                        Password
                      </label>
                      <Link href="/forgot-password" className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative group">
                      <div className="absolute -inset-px rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.3))', filter: 'blur(4px)' }} />
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 group-focus-within:text-indigo-400 transition-colors z-10 pointer-events-none" />
                        <input
                          id="password"
                          name="password"
                          type={showPw ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => { setPassword(e.target.value); setError(''); }}
                          required
                          className="w-full h-12 pl-11 pr-11 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:bg-white/[0.07] focus:border-indigo-500/40 transition-all duration-200"
                        />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10">
                          <button type="button" onClick={() => setShowPw(!showPw)}
                            className="text-gray-600 hover:text-gray-400 transition-colors">
                            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remember me */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                    className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setRememberMe(!rememberMe)}
                      className="flex items-center gap-2.5 group"
                    >
                      <div className={`h-4 w-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        rememberMe ? 'bg-indigo-500 border-indigo-500 shadow-lg shadow-indigo-500/30' : 'border-white/15 bg-white/[0.03] group-hover:border-white/30'
                      }`}>
                        <AnimatePresence>
                          {rememberMe && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                    </button>
                  </motion.div>

                  {/* Submit button */}
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="relative w-full h-12 rounded-xl text-sm font-bold text-white overflow-hidden transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed group"
                      style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%)', backgroundSize: '200%' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ boxShadow: '0 0 30px rgba(99,102,241,0.5)' }} />
                      <span className="relative flex items-center justify-center gap-2">
                        {isLoading ? (
                          <><span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Signing in...</>
                        ) : (
                          <><LogIn className="h-4 w-4" />Sign In <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" /></>
                        )}
                      </span>
                    </button>
                  </motion.div>
                </form>

                {/* Divider */}
                <div className="relative flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/[0.05]" />
                  <span className="text-[11px] text-gray-600 font-medium">or continue with</span>
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

                {/* Sign up link */}
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                    Create one →
                  </Link>
                </p>

                {/* Trust pills */}
                <div className="flex items-center justify-center gap-3 flex-wrap pt-1">
                  {[
                    { icon: <Lock className="h-3 w-3" />, text: 'Encrypted' },
                    { icon: <Zap className="h-3 w-3" />, text: 'Fast login' },
                    { icon: <Shield className="h-3 w-3" />, text: 'Secure' },
                  ].map(p => (
                    <span key={p.text} className="flex items-center gap-1.5 text-[11px] text-gray-600">
                      {p.icon} {p.text}
                    </span>
                  ))}
                </div>

                {/* Back to home */}
                <div className="text-center">
                  <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-400 transition-colors">
                    <ArrowLeft className="h-3 w-3" />
                    Back to home
                  </Link>
                </div>

                {/* Mobile only features */}
                <div className="lg:hidden pt-2 border-t border-white/[0.05]">
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400 fill-yellow-400" /> 4.9/5</span>
                    <span>·</span>
                    <span>2,400+ developers</span>
                    <span>·</span>
                    <span>Free forever</span>
                  </div>
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