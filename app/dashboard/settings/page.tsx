'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  LogOut, Trash2, Github, Check, AlertCircle, Save,
  User, Bell, Lock, Shield, Globe, Eye, EyeOff,
  ChevronRight, Loader2, Sparkles, Mail, MapPin,
  Link2, Twitter, Briefcase, Key, Fingerprint,
  Smartphone, Monitor, Cookie, History, CreditCard
} from 'lucide-react'

const API = 'http://localhost:5000'

function FloatingParticles() {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const generated = [...Array(8)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4',
      duration: 6,
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

export default function SettingsPage() {
  const router = useRouter()
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [activeSection, setActiveSection] = useState('profile')
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [userId, setUserId] = useState('')

  const [profile, setProfile] = useState({
    name: '', email: '', bio: '', location: '',
    github: '', linkedin: '', twitter: '', website: '',
  })

  const [passwords, setPasswords] = useState({ current: '', newPw: '', confirm: '' })

  const [notifications, setNotifications] = useState({
    portfolioUpdates: true, weeklyDigest: true,
    recruiterAlerts: false, productUpdates: true,
  })

  const [privacy, setPrivacy] = useState({
    portfolioPublic: true, showEmail: false, showPhone: false,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    const id = storedUser.id || storedUser._id || ''
    setUserId(id)
    const gh = localStorage.getItem('githubUsername') || storedUser.githubUsername || ''
    setProfile({
      name: storedUser.name || '',
      email: storedUser.email || '',
      bio: storedUser.bio || '',
      location: storedUser.location || '',
      github: gh,
      linkedin: storedUser.linkedin || '',
      twitter: storedUser.twitter || '',
      website: storedUser.website || '',
    })
    const savedNotifs = localStorage.getItem('notificationPrefs')
    if (savedNotifs) setNotifications(JSON.parse(savedNotifs))
    const savedPrivacy = localStorage.getItem('privacyPrefs')
    if (savedPrivacy) setPrivacy(JSON.parse(savedPrivacy))
  }, [router])

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const handleSaveProfile = async () => {
    if (!profile.name.trim()) { showToast('Name is required', 'error'); return }
    setSavingProfile(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API}/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: profile.name, email: profile.email, bio: profile.bio,
          location: profile.location, githubUsername: profile.github,
          linkedin: profile.linkedin, twitter: profile.twitter, website: profile.website,
        }),
      })
      const data = await res.json()
      const updatedUser = data.user || data
      localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user') || '{}'), ...updatedUser }))
      if (profile.github) localStorage.setItem('githubUsername', profile.github)
      showToast('Profile saved successfully!')
    } catch {
      const current = JSON.parse(localStorage.getItem('user') || '{}')
      localStorage.setItem('user', JSON.stringify({ ...current, name: profile.name, email: profile.email, bio: profile.bio }))
      if (profile.github) localStorage.setItem('githubUsername', profile.github)
      showToast('Profile saved locally (server offline)')
    } finally { setSavingProfile(false) }
  }

  const handleSaveNotifications = () => {
    localStorage.setItem('notificationPrefs', JSON.stringify(notifications))
    showToast('Notification preferences saved!')
  }

  const handleSavePrivacy = () => {
    localStorage.setItem('privacyPrefs', JSON.stringify(privacy))
    showToast('Privacy settings saved!')
  }

  const handleChangePassword = async () => {
    if (!passwords.current || !passwords.newPw || !passwords.confirm) {
      showToast('Fill all password fields', 'error'); return
    }
    if (passwords.newPw !== passwords.confirm) { showToast('Passwords do not match', 'error'); return }
    if (passwords.newPw.length < 6) { showToast('Password must be at least 6 characters', 'error'); return }
    setSavingPassword(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API}/api/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId, currentPassword: passwords.current, newPassword: passwords.newPw }),
      })
      if (res.ok) {
        setPasswords({ current: '', newPw: '', confirm: '' })
        showToast('Password updated!')
      } else {
        const d = await res.json()
        showToast(d.message || 'Incorrect current password', 'error')
      }
    } catch { showToast('Server unavailable', 'error') }
    finally { setSavingPassword(false) }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token'); localStorage.removeItem('user')
    sessionStorage.removeItem('githubRepos')
    router.push('/login')
  }

  const handleDeleteAccount = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return }
    setIsDeleting(true)
    try {
      const token = localStorage.getItem('token')
      await fetch(`${API}/api/users/${userId}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${token}` }
      })
    } catch { /* still clear local */ }
    localStorage.clear(); sessionStorage.clear()
    router.push('/signup')
  }

  const navItems = [
    { id: 'profile', label: 'Profile', icon: User, desc: 'Personal information' },
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Alert preferences' },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield, desc: 'Visibility controls' },
    { id: 'password', label: 'Password', icon: Key, desc: 'Update credentials' },
    { id: 'danger', label: 'Danger Zone', icon: Trash2, desc: 'Account actions', danger: true },
  ]

  const inputCls = "h-11 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 rounded-xl transition-all text-sm"
  const labelCls = "text-xs font-semibold text-muted-foreground uppercase tracking-wider"

  return (
    <div className="relative min-h-screen">
      <FloatingParticles />

      <div className="relative space-y-8 max-w-7xl mx-auto px-4 pb-16">
        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold backdrop-blur-xl border ${
                toast.type === 'success'
                  ? 'bg-emerald-500/90 text-white border-emerald-400/30'
                  : 'bg-red-500/90 text-white border-red-400/30'
              }`}
            >
              {toast.type === 'success' ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="relative pt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-violet-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />

          <div className="relative py-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-violet-500/20 backdrop-blur-xl rounded-full px-4 py-1.5 border border-primary/30 shadow-lg shadow-primary/10 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">Account Settings</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Settings
              </span>
            </h1>
            <p className="text-muted-foreground mt-3 text-sm">
              Manage your account, preferences, and security settings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Nav */}
          <div className="lg:col-span-1">
            <Card className="relative overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl shadow-xl sticky top-20">
              <div className="relative p-3">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                        activeSection === item.id
                          ? item.danger
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-primary/10 text-primary border border-primary/20'
                          : item.danger
                            ? 'text-red-400/70 hover:bg-red-500/5 hover:text-red-400'
                            : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                      }`}
                    >
                      <div className={`h-9 w-9 rounded-xl flex items-center justify-center transition-colors ${
                        activeSection === item.id
                          ? item.danger ? 'bg-red-500/10' : 'bg-primary/10'
                          : 'bg-white/5 group-hover:bg-white/10'
                      }`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{item.label}</p>
                        <p className="text-[11px] opacity-60 truncate">{item.desc}</p>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 opacity-40 flex-shrink-0" />
                    </button>
                  ))}
                </nav>
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">

              {/* PROFILE */}
              {activeSection === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Card className="relative overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl shadow-xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_70%)]" />

                    <div className="relative p-6 md:p-8">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-lg shadow-blue-500/10">
                          <User className="h-7 w-7 text-blue-400" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">Profile</h2>
                          <p className="text-sm text-muted-foreground">Public information visible on your portfolio</p>
                        </div>
                        <Badge className="ml-auto bg-blue-500/10 text-blue-400 border-blue-500/20">
                          Public
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[
                          { label: 'Full Name *', key: 'name', ph: 'John Doe', type: 'text', icon: User },
                          { label: 'Email Address', key: 'email', ph: 'john@example.com', type: 'email', icon: Mail },
                          { label: 'Location', key: 'location', ph: 'Hyderabad, India', type: 'text', icon: MapPin },
                          { label: 'GitHub Username', key: 'github', ph: 'johndoe', type: 'text', icon: Github },
                          { label: 'LinkedIn Profile', key: 'linkedin', ph: 'linkedin.com/in/john', type: 'text', icon: Briefcase },
                          { label: 'Twitter / X', key: 'twitter', ph: '@johndoe', type: 'text', icon: Twitter },
                        ].map((f) => (
                          <div key={f.key}>
                            <label className="flex items-center gap-2 mb-2">
                              <f.icon className="h-3 w-3 text-muted-foreground" />
                              <span className={labelCls}>{f.label}</span>
                            </label>
                            <Input
                              className={inputCls}
                              type={f.type}
                              placeholder={f.ph}
                              value={(profile as any)[f.key]}
                              onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                            />
                          </div>
                        ))}

                        <div className="sm:col-span-2">
                          <label className="flex items-center gap-2 mb-2">
                            <Globe className="h-3 w-3 text-muted-foreground" />
                            <span className={labelCls}>Website URL</span>
                          </label>
                          <Input
                            className={inputCls}
                            type="url"
                            placeholder="https://johndoe.dev"
                            value={profile.website}
                            onChange={e => setProfile(p => ({ ...p, website: e.target.value }))}
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-3 w-3 text-muted-foreground" />
                            <span className={labelCls}>Bio</span>
                          </label>
                          <textarea
                            value={profile.bio}
                            onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                            placeholder="Full-stack developer passionate about building beautiful web experiences with modern technologies..."
                            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-sm resize-none focus:outline-none focus:border-primary/50 focus:bg-white/10 min-h-28 transition-all placeholder:text-muted-foreground/50"
                          />
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">
                              Brief description for your portfolio
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {profile.bio.length}/200
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                          Changes auto-save to localStorage
                        </div>
                        <Button
                          onClick={handleSaveProfile}
                          disabled={savingProfile}
                          className="gap-2 bg-gradient-to-r from-primary to-violet-500 hover:from-primary hover:to-violet-600 text-white shadow-xl shadow-primary/25 rounded-xl px-6"
                        >
                          {savingProfile ? (
                            <><Loader2 className="h-4 w-4 animate-spin" />Saving...</>
                          ) : (
                            <><Save className="h-4 w-4" />Save Profile</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* NOTIFICATIONS */}
              {activeSection === 'notifications' && (
                <motion.div
                  key="notifs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Card className="relative overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl shadow-xl">
                    <div className="relative p-6 md:p-8">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
                          <Bell className="h-7 w-7 text-cyan-400" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">Notifications</h2>
                          <p className="text-sm text-muted-foreground">Choose what you want to be notified about</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {[
                          { key: 'portfolioUpdates', title: 'Portfolio Views', desc: 'Get notified when someone visits your portfolio', icon: '👁', color: 'blue' },
                          { key: 'weeklyDigest', title: 'Weekly Analytics Digest', desc: 'Receive a weekly summary of your portfolio performance', icon: '📊', color: 'violet' },
                          { key: 'recruiterAlerts', title: 'Recruiter Interest', desc: 'Alert when recruiters interact with your portfolio', icon: '💼', color: 'emerald' },
                          { key: 'productUpdates', title: 'Product Updates', desc: 'Stay informed about new features and improvements', icon: '🚀', color: 'amber' },
                        ].map((n) => (
                          <div
                            key={n.key}
                            className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-lg">
                                {n.icon}
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{n.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                              </div>
                            </div>
                            <Switch
                              checked={(notifications as any)[n.key]}
                              onCheckedChange={v => setNotifications(prev => ({ ...prev, [n.key]: v }))}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end mt-8 pt-6 border-t border-white/10">
                        <Button
                          onClick={handleSaveNotifications}
                          className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-xl shadow-cyan-500/25 rounded-xl px-6"
                        >
                          <Save className="h-4 w-4" /> Save Preferences
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* PRIVACY */}
              {activeSection === 'privacy' && (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Card className="relative overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl shadow-xl">
                    <div className="relative p-6 md:p-8">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-14 w-14 rounded-2xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20 shadow-lg shadow-violet-500/10">
                          <Shield className="h-7 w-7 text-violet-400" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">Privacy & Security</h2>
                          <p className="text-sm text-muted-foreground">Control what's visible on your portfolio</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {[
                          { key: 'portfolioPublic', title: 'Public Portfolio', desc: 'Anyone with the link can view your portfolio', icon: Globe, color: 'blue' },
                          { key: 'showEmail', title: 'Show Email Address', desc: 'Display your email on your portfolio page', icon: Mail, color: 'emerald' },
                          { key: 'showPhone', title: 'Show Phone Number', desc: 'Make your phone number publicly visible', icon: Smartphone, color: 'amber' },
                        ].map((p) => (
                          <div
                            key={p.key}
                            className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                                <p.icon className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{p.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
                              </div>
                            </div>
                            <Switch
                              checked={(privacy as any)[p.key]}
                              onCheckedChange={v => setPrivacy(prev => ({ ...prev, [p.key]: v }))}
                            />
                          </div>
                        ))}
                      </div>

                      {/* 2FA Section */}
                      <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-violet-500/5 to-purple-500/5 border border-violet-500/20">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                            <Fingerprint className="h-5 w-5 text-violet-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Two-Factor Authentication</p>
                            <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                          </div>
                          <Badge className="ml-auto bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                            Coming Soon
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="border-violet-500/30 text-violet-400"
                        >
                          <Lock className="h-3.5 w-3.5 mr-2" />
                          Enable 2FA
                        </Button>
                      </div>

                      <div className="flex justify-end mt-8 pt-6 border-t border-white/10">
                        <Button
                          onClick={handleSavePrivacy}
                          className="gap-2 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-xl shadow-violet-500/25 rounded-xl px-6"
                        >
                          <Save className="h-4 w-4" /> Save Settings
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* PASSWORD */}
              {activeSection === 'password' && (
                <motion.div
                  key="password"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Card className="relative overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl shadow-xl">
                    <div className="relative p-6 md:p-8">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-14 w-14 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shadow-lg shadow-orange-500/10">
                          <Key className="h-7 w-7 text-orange-400" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">Change Password</h2>
                          <p className="text-sm text-muted-foreground">Update your account credentials securely</p>
                        </div>
                      </div>

                      <div className="space-y-5 max-w-lg">
                        <div>
                          <label className={`${labelCls} block mb-2`}>Current Password</label>
                          <div className="relative group">
                            <Input
                              className={`${inputCls} pr-12`}
                              type={showCurrentPw ? 'text' : 'password'}
                              placeholder="Enter current password"
                              value={passwords.current}
                              onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrentPw(!showCurrentPw)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-white/5"
                            >
                              {showCurrentPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className={`${labelCls} block mb-2`}>New Password</label>
                          <div className="relative group">
                            <Input
                              className={`${inputCls} pr-12`}
                              type={showNewPw ? 'text' : 'password'}
                              placeholder="Min. 6 characters"
                              value={passwords.newPw}
                              onChange={e => setPasswords(p => ({ ...p, newPw: e.target.value }))}
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPw(!showNewPw)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-white/5"
                            >
                              {showNewPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className={`${labelCls} block mb-2`}>Confirm New Password</label>
                          <Input
                            className={inputCls}
                            type="password"
                            placeholder="Repeat new password"
                            value={passwords.confirm}
                            onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                          />
                        </div>

                        {passwords.newPw && passwords.confirm && passwords.newPw !== passwords.confirm && (
                          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/5 border border-red-500/20">
                            <AlertCircle className="h-4 w-4 text-red-400" />
                            <p className="text-sm text-red-400">Passwords don't match</p>
                          </div>
                        )}

                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">Password requirements:</strong>
                            <br />• At least 6 characters long
                            <br />• Use a mix of letters, numbers, and symbols
                            <br />• Avoid using common words or personal information
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-start mt-8 pt-6 border-t border-white/10">
                        <Button
                          onClick={handleChangePassword}
                          disabled={savingPassword}
                          className="gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-xl shadow-orange-500/25 rounded-xl px-6"
                        >
                          {savingPassword ? (
                            <><Loader2 className="h-4 w-4 animate-spin" />Updating...</>
                          ) : (
                            <><Key className="h-4 w-4" />Update Password</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* DANGER ZONE */}
              {activeSection === 'danger' && (
                <motion.div
                  key="danger"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Card className="relative overflow-hidden border-2 border-red-500/20 bg-gradient-to-br from-red-500/5 via-gray-900/50 to-gray-800/50 backdrop-blur-xl shadow-xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.05),transparent_70%)]" />

                    <div className="relative p-6 md:p-8">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-14 w-14 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-lg shadow-red-500/10">
                          <Trash2 className="h-7 w-7 text-red-400" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-red-400">Danger Zone</h2>
                          <p className="text-sm text-muted-foreground">Irreversible account actions</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Sign Out */}
                        <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10">
                          <div>
                            <p className="font-semibold text-sm">Sign Out</p>
                            <p className="text-xs text-muted-foreground mt-1">Clear your session and return to login</p>
                          </div>
                          <Button
                            variant="outline"
                            onClick={handleSignOut}
                            className="gap-2 border-white/10 hover:border-white/20 rounded-xl"
                          >
                            <LogOut className="h-4 w-4" /> Sign Out
                          </Button>
                        </div>

                        {/* Delete Account */}
                        <div className="p-6 rounded-2xl border-2 border-red-500/20 bg-red-500/5">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                              <AlertCircle className="h-4 w-4 text-red-400" />
                            </div>
                            <p className="font-semibold text-sm text-red-400">Delete Account</p>
                          </div>
                          <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                            This will permanently delete your account, portfolio, and all associated data. This action cannot be undone.
                          </p>

                          {confirmDelete && (
                            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                              <p className="text-sm font-bold text-red-400 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                Are you absolutely sure? Click again to confirm deletion.
                              </p>
                            </div>
                          )}

                          <div className="flex items-center gap-3">
                            <Button
                              variant="destructive"
                              disabled={isDeleting}
                              onClick={handleDeleteAccount}
                              className="gap-2 rounded-xl"
                            >
                              {isDeleting ? (
                                <><Loader2 className="h-4 w-4 animate-spin" />Deleting...</>
                              ) : (
                                <><Trash2 className="h-4 w-4" />{confirmDelete ? 'Confirm Delete' : 'Delete Account'}</>
                              )}
                            </Button>
                            {confirmDelete && (
                              <Button
                                variant="ghost"
                                onClick={() => setConfirmDelete(false)}
                                className="rounded-xl"
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}