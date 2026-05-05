'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  CheckCircle2, ArrowRight, Sparkles, Crown, Star,
  Download, Rocket, Palette, BarChart3, Github, Zap,
  FileText
} from 'lucide-react'

export default function ConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'pro'
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [router])

  const features = [
    { icon: Palette, label: 'All 6 Templates' },
    { icon: Github, label: 'Unlimited Projects' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: FileText, label: 'Resume Generator' },
    { icon: Rocket, label: 'Vercel Deploy' },
    { icon: Zap, label: 'AI Descriptions' },
  ]

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-2xl text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-2xl opacity-50" />
            <div className="relative h-full w-full rounded-full bg-emerald-100 dark:bg-emerald-500/10 border-2 border-emerald-300 dark:border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Payment Successful</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-3">
          Welcome to <span className="text-indigo-500 dark:text-indigo-400">Pro</span>! 🎉
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Your payment has been confirmed. You now have access to all premium features.
        </p>

        {/* Features Grid */}
        <Card className="border-2 border-indigo-200 dark:border-indigo-500/20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-500/5 dark:to-purple-500/5 p-6 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div key={feature.label} className="flex items-center gap-2 p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-border">
                <feature.icon className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                <span className="text-xs font-semibold text-foreground">{feature.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-2xl px-8 py-6 text-base gap-2"
            asChild
          >
            <Link href="/dashboard">
              Go to Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:border-primary/30 bg-muted/50 rounded-2xl px-8 py-6 text-base gap-2"
            asChild
          >
            <Link href="/generate">
              <Sparkles className="w-5 h-5" /> Generate Portfolio
            </Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-6">
          Auto-redirecting to dashboard in {countdown} seconds...
        </p>

        <div className="mt-8 p-4 rounded-2xl bg-muted/30 border border-border">
          <div className="flex items-center gap-2 justify-center mb-2">
            <Crown className="h-4 w-4 text-yellow-500" />
            <p className="text-sm font-semibold text-foreground">You're now a Pro member!</p>
          </div>
          <p className="text-xs text-muted-foreground">
            A confirmation email has been sent to your registered email address.
            Your Pro badge will appear in the dashboard navbar.
          </p>
        </div>
      </div>
    </div>
  )
}