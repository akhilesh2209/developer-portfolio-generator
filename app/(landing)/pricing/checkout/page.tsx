'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, Check, CreditCard, Landmark,
  Smartphone, Shield, Lock, Sparkles, Crown, Globe, Zap,
  CheckCircle2, Star
} from 'lucide-react'

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit / Debit Card',
    icon: CreditCard,
    description: 'Visa, Mastercard, Amex',
    fields: ['Card Number', 'Expiry Date', 'CVV', 'Name on Card'],
  },
  {
    id: 'upi',
    name: 'UPI / PhonePe / Google Pay',
    icon: Smartphone,
    description: 'Instant payment via UPI',
    fields: ['UPI ID (e.g., name@upi)'],
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    icon: Landmark,
    description: 'Pay directly from your bank',
    fields: ['Select Bank'],
  },
]

const banks = [
  'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank',
  'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda',
]

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'pro'
  const [selectedMethod, setSelectedMethod] = useState('card')
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const planDetails = plan === 'pro' ? {
    name: 'Pro Plan',
    price: '$9',
    period: '/month',
    icon: Crown,
    color: 'text-indigo-500 dark:text-indigo-400',
    bg: 'bg-indigo-100 dark:bg-indigo-500/10',
    features: ['All 6 templates', 'Unlimited projects', 'Analytics', 'AI descriptions', 'Custom domain'],
  } : plan === 'enterprise' ? {
    name: 'Enterprise Plan',
    price: 'Custom',
    period: '',
    icon: Globe,
    color: 'text-violet-500 dark:text-violet-400',
    bg: 'bg-violet-100 dark:bg-violet-500/10',
    features: ['Everything in Pro', 'Team collaboration', 'API access', 'SSO', 'Dedicated support'],
  } : {
    name: 'Free Plan',
    price: '$0',
    period: '',
    icon: Zap,
    color: 'text-emerald-500 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-500/10',
    features: ['1 Portfolio', '3 Templates', 'GitHub integration'],
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleProceedToPayment = () => {
    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      router.push(`/pricing/payment?plan=${plan}&method=${selectedMethod}`)
    }, 1000)
  }

  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-20 max-w-4xl">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-foreground text-sm mb-8 flex items-center gap-2 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Pricing
        </button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[
            { step: 1, label: 'Select Plan', completed: true },
            { step: 2, label: 'Payment Method', completed: false, active: true },
            { step: 3, label: 'Complete Payment', completed: false },
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

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Payment Method Selection */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-2 border-border bg-card p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Select Payment Method
              </h2>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                      selectedMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30 bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                        selectedMethod === method.id
                          ? 'bg-primary/10 border border-primary/20'
                          : 'bg-muted/50 border border-border'
                      }`}>
                        <method.icon className={`h-6 w-6 ${
                          selectedMethod === method.id ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-foreground">{method.name}</p>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                      <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                        selectedMethod === method.id ? 'border-primary bg-primary' : 'border-border'
                      }`}>
                        {selectedMethod === method.id && <Check className="h-3.5 w-3.5 text-white" />}
                      </div>
                    </div>

                    {/* Dynamic Form Fields */}
                    {selectedMethod === method.id && (
                      <div className="mt-4 pt-4 border-t border-border space-y-3">
                        {method.id === 'netbanking' ? (
                          <div>
                            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Select Bank</label>
                            <select className="w-full h-11 px-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:border-primary/50">
                              <option value="">Choose your bank...</option>
                              {banks.map((bank) => (
                                <option key={bank} value={bank}>{bank}</option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          method.fields.map((field) => (
                            <div key={field}>
                              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">{field}</label>
                              <Input
                                placeholder={`Enter ${field.toLowerCase()}`}
                                onChange={(e) => handleInputChange(field, e.target.value)}
                                className="h-11 bg-muted/50 border-border focus:border-primary/50 rounded-xl text-sm"
                              />
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-border bg-card p-6 sticky top-24">
              <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>

              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                <div className={`h-10 w-10 rounded-xl ${planDetails.bg} flex items-center justify-center`}>
                  <planDetails.icon className={`h-5 w-5 ${planDetails.color}`} />
                </div>
                <div>
                  <p className="font-bold text-foreground">{planDetails.name}</p>
                  <p className="text-xs text-muted-foreground">Monthly billing</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-bold text-foreground">{planDetails.price}</p>
                  {planDetails.period && <p className="text-xs text-muted-foreground">{planDetails.period}</p>}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {planDetails.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{planDetails.price}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-foreground mt-2 pt-2 border-t border-border">
                  <span>Total</span>
                  <span>{planDetails.price}{planDetails.period}</span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary hover:to-purple-600 text-white shadow-xl shadow-primary/25 rounded-xl h-12 gap-2"
                onClick={handleProceedToPayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <><span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Processing...</>
                ) : (
                  <>Proceed to Payment <ArrowRight className="h-4 w-4" /></>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Secure payment · 256-bit encryption
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}