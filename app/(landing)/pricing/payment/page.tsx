'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft, Check, Shield, Lock, Sparkles, CreditCard,
  Smartphone, Landmark, ArrowRight, CheckCircle2
} from 'lucide-react'

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'pro'
  const method = searchParams.get('method') || 'card'
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 50)
    return () => clearInterval(timer)
  }, [])

  const methodNames: Record<string, string> = {
    card: 'Credit/Debit Card',
    upi: 'UPI / PhonePe / Google Pay',
    netbanking: 'Net Banking',
  }

  const handleSendOTP = () => {
    setOtpSent(true)
  }

  const handleVerifyAndPay = () => {
    if (otp.length < 4) return
    setIsProcessing(true)
    setTimeout(() => {
      // Update local storage to mark user as Pro
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      user.plan = plan
      user.isPro = true
      localStorage.setItem('user', JSON.stringify(user))
      
      // Save subscription info
      localStorage.setItem('subscription', JSON.stringify({
        plan,
        method,
        startDate: new Date().toISOString(),
        status: 'active',
      }))

      router.push(`/pricing/payment/confirmation?plan=${plan}`)
    }, 2000)
  }

  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-20 max-w-lg">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[
            { step: 1, label: 'Select Plan', completed: true },
            { step: 2, label: 'Payment Method', completed: true },
            { step: 3, label: 'Complete Payment', completed: false, active: true },
            { step: 4, label: 'Confirmation', completed: false },
          ].map((s) => (
            <div key={s.step} className="flex items-center">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                s.active ? 'bg-primary text-white shadow-lg shadow-primary/25' :
                s.completed ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/20' :
                'bg-muted/50 text-muted-foreground border border-border'
              }`}>
                {s.completed ? <Check className="h-3 w-3" /> : <span className="h-3 w-3 rounded-full border border-current flex items-center justify-center text-[10px]">{s.step}</span>}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {s.step < 4 && <div className={`w-8 h-0.5 mx-1 ${s.completed ? 'bg-emerald-500' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <Card className="border-2 border-border bg-card overflow-hidden">
          {/* Processing Animation */}
          <div className="p-8 text-center">
            <div className="relative mx-auto w-24 h-24 mb-6">
              <svg className="w-24 h-24" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/30" />
                <circle
                  cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="4"
                  className="text-primary"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
                  transform="rotate(-90 50 50)"
                  style={{ transition: 'stroke-dashoffset 0.1s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="h-10 w-10 text-primary" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-foreground mb-2">Secure Payment</h2>
            <p className="text-sm text-muted-foreground mb-2">
              {methodNames[method]} · {plan === 'pro' ? '$9/month' : 'Enterprise'}
            </p>

            {!otpSent ? (
              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-2xl bg-muted/30 border border-border text-center">
                  <p className="text-sm text-foreground font-semibold mb-1">Verification Required</p>
                  <p className="text-xs text-muted-foreground">We'll send an OTP to verify this transaction</p>
                </div>
                <Button
                  onClick={handleSendOTP}
                  className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-xl h-12 gap-2"
                >
                  Send OTP <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-center">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 mx-auto mb-1" />
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">OTP Sent!</p>
                  <p className="text-xs text-muted-foreground">Enter the 6-digit code sent to your device</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Enter OTP</label>
                  <Input
                    placeholder="000000"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="h-12 text-center text-2xl tracking-[0.5em] font-bold bg-muted/50 border-border focus:border-primary/50 rounded-xl"
                  />
                </div>
                <Button
                  onClick={handleVerifyAndPay}
                  disabled={otp.length < 4 || isProcessing}
                  className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-xl h-12 gap-2"
                >
                  {isProcessing ? (
                    <><span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Verifying & Processing...</>
                  ) : (
                    <>Verify & Pay {plan === 'pro' ? '$9' : ''} <ArrowRight className="h-4 w-4" /></>
                  )}
                </Button>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              Protected by 256-bit SSL encryption
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}