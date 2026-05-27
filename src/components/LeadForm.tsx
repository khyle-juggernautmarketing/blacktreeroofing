'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'
import type { FormEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'
import {
  PROPERTY_OPTIONS,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  type FormOption,
} from '@/lib/formOptions'
import type { LeadFormData } from '@/types/lead'
import { initialLeadForm } from '@/types/lead'

const STEPS = [
  { id: 1, title: 'What do you need help with?' },
  { id: 2, title: 'What type of property?' },
  { id: 3, title: 'How soon do you need service?' },
  { id: 4, title: 'Almost done! Enter your details:' },
]

function useStepAdvanceDelay() {
  const [ms, setMs] = useState(180)
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setMs(0)
    })
    return () => cancelAnimationFrame(id)
  }, [])
  return ms
}

type OptionGridProps<T extends string> = {
  options: FormOption<T>[]
  value: T | ''
  onSelect: (v: T) => void
  columns?: 'one' | 'two'
}

function OptionGrid<T extends string>({
  options,
  value,
  onSelect,
  columns = 'two',
}: OptionGridProps<T>) {
  return (
    <div
      className={
        columns === 'one'
          ? 'grid grid-cols-1 gap-3'
          : 'grid grid-cols-1 gap-3 sm:grid-cols-2'
      }
    >
      {options.map((opt, i) => {
        const selected = value === opt.value
        const Icon = opt.icon
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            style={{ animationDelay: `${i * 40}ms` }}
            className={`animate-form-option group flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 p-3.5 text-left transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.98] motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:hover:scale-100 sm:min-h-14 sm:p-4 ${
              selected
                ? 'border-[#48D1CC] bg-[#48D1CC]/5 shadow-[0_0_0_1px_rgba(72,209,204,0.25)] ring-2 ring-[#48D1CC]'
                : 'border-slate-200/80 bg-white/90 hover:border-[#48D1CC]/50 hover:bg-slate-50/90'
            }`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors sm:h-11 sm:w-11 ${
                selected
                  ? 'bg-[#48D1CC] text-white shadow-md shadow-[#48D1CC]/35'
                  : 'bg-slate-100 text-slate-600 group-hover:bg-[#48D1CC]/10 group-hover:text-[#48D1CC]'
              }`}
              aria-hidden
            >
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <span
              className={`flex-1 text-sm font-medium leading-snug ${
                selected ? 'text-slate-900' : 'text-slate-700'
              }`}
            >
              {opt.label}
            </span>
            {selected && (
              <span
                className="animate-form-check flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#48D1CC] text-white"
                aria-hidden
              >
                <CheckCircle2 className="h-4 w-4" />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

function SuccessMarks() {
  return (
    <svg className="h-28 w-28 text-[#48D1CC]" viewBox="0 0 64 64" aria-hidden>
      <circle cx="32" cy="32" r="28" fill="rgba(72,209,204,0.12)" />
      <path
        className="animate-check-stroke"
        stroke="currentColor"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 34l8 8 20-22"
      />
    </svg>
  )
}

export function LeadForm() {
  const prefersReducedMotion = useReducedMotion()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<LeadFormData>(initialLeadForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const stepAdvanceDelayMs = useStepAdvanceDelay()

  const progress = (step / STEPS.length) * 100

  const advance = useCallback(
    (updater: (d: LeadFormData) => LeadFormData, next: number) => {
      setData(updater)
      setTimeout(() => setStep(next), stepAdvanceDelayMs)
    },
    [stepAdvanceDelayMs],
  )

  const handleService = (service: LeadFormData['service']) => {
    if (!service) return
    advance((d) => ({ ...d, service }), 2)
  }

  const handleProperty = (propertyType: LeadFormData['propertyType']) => {
    if (!propertyType) return
    advance((d) => ({ ...d, propertyType }), 3)
  }

  const handleTimeline = (timeline: LeadFormData['timeline']) => {
    if (!timeline) return
    advance((d) => ({ ...d, timeline }), 4)
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (!data.fullName.trim() || !data.email.trim() || !data.phone.trim()) {
      setErrorMsg('Please fill in all fields.')
      return
    }
    const phoneDigits = data.phone.replace(/\D/g, '')
    if (phoneDigits.length < 10) {
      setErrorMsg('Please enter a valid phone number.')
      return
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
    if (!emailOk) {
      setErrorMsg('Please enter a valid email.')
      return
    }

    const payload = {
      ...data,
      fullName: data.fullName.trim(),
      email: data.email.trim(),
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setStatus('idle')
        setErrorMsg(typeof j.error === 'string' ? j.error : 'Could not send your request. Please try again or call us.')
        return
      }

      const diagnostic = [
        {
          event: 'lead_submit_success',
          at: new Date().toISOString(),
          service: payload.service,
          propertyType: payload.propertyType,
          timeline: payload.timeline,
          fullName: payload.fullName,
          email: payload.email,
          phone: payload.phone,
        },
      ]
      console.log('[BlackTree LeadForm] diagnostic trace', diagnostic)

      setData(initialLeadForm)
      setStep(1)
      setStatus('success')
    } catch {
      setStatus('idle')
      setErrorMsg('Something went wrong. Please try again or call us directly.')
    }
  }

  const motionDur = prefersReducedMotion ? 0 : 0.35

  if (status === 'success') {
    return (
      <div className="animate-form-success flex min-h-[360px] flex-col items-center justify-center px-2 text-center">
        <SuccessMarks />
        <h3 className="mt-6 text-xl font-bold text-slate-900">You&apos;re on the list</h3>
        <p className="mt-2 max-w-sm text-slate-600">
          We&apos;ll reach out shortly during business hours. For urgent leaks, call{' '}
          <a href="tel:+12082745706" className="font-semibold text-[#48D1CC] hover:underline">
            208-274-5706
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 min-h-12 rounded-xl border-2 border-slate-200 px-6 text-sm font-semibold text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#48D1CC] hover:bg-[#48D1CC]/5 motion-reduce:hover:translate-y-0"
        >
          Submit another estimate
        </button>
      </div>
    )
  }

  return (
    <div id="contact" className="w-full">
      <div className="mb-5 sm:mb-6">
        <div className="mb-2 flex justify-between text-xs font-semibold text-slate-500">
          <span>
            Step {step} of {STEPS.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200/80 ring-1 ring-slate-200/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3ab8b3] to-[#48D1CC] shadow-[0_0_14px_rgba(72,209,204,0.65)] transition-[width] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
          transition={{ duration: motionDur, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="mb-4 text-base font-bold text-slate-900 sm:text-lg">{STEPS[step - 1].title}</h3>

          {step === 1 && (
            <OptionGrid
              options={SERVICE_OPTIONS}
              value={data.service}
              onSelect={handleService}
              columns="two"
            />
          )}
          {step === 2 && (
            <OptionGrid
              options={PROPERTY_OPTIONS}
              value={data.propertyType}
              onSelect={handleProperty}
              columns="two"
            />
          )}
          {step === 3 && (
            <OptionGrid
              options={TIMELINE_OPTIONS}
              value={data.timeline}
              onSelect={handleTimeline}
              columns="two"
            />
          )}
          {step === 4 && (
            <form onSubmit={submit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">Full name</span>
                <input
                  required
                  autoComplete="name"
                  value={data.fullName}
                  onChange={(e) => setData({ ...data, fullName: e.target.value })}
                  className="min-h-12 w-full rounded-xl border border-slate-200 bg-white/90 px-4 text-base backdrop-blur-sm focus:border-[#48D1CC] focus:outline-none focus:ring-2 focus:ring-[#48D1CC]/25 sm:text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">Email</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="min-h-12 w-full rounded-xl border border-slate-200 bg-white/90 px-4 text-base backdrop-blur-sm focus:border-[#48D1CC] focus:outline-none focus:ring-2 focus:ring-[#48D1CC]/25 sm:text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">Phone</span>
                <input
                  type="tel"
                  required
                  autoComplete="tel"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  className="min-h-12 w-full rounded-xl border border-slate-200 bg-white/90 px-4 text-base backdrop-blur-sm focus:border-[#48D1CC] focus:outline-none focus:ring-2 focus:ring-[#48D1CC]/25 sm:text-sm"
                />
              </label>
              {errorMsg && (
                <p className="text-sm text-red-600" role="alert">
                  {errorMsg}
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#48D1CC] text-base font-semibold text-white shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(72,209,204,0.5)] disabled:opacity-70 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:hover:shadow-md sm:text-sm"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                    Sending...
                  </>
                ) : (
                  'Get My Free Roofing Estimate'
                )}
              </button>
              <p className="text-center text-xs text-slate-500">🔒 Your info is safe. No spam, ever.</p>
            </form>
          )}
        </motion.div>
      </AnimatePresence>

      {step > 1 && (
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          className="mt-4 flex min-h-12 items-center text-sm font-semibold text-slate-500 transition-colors hover:text-[#48D1CC]"
        >
          ← Back
        </button>
      )}
    </div>
  )
}
