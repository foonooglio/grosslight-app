'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useLanguage } from '@/hooks/useLanguage'

export default function PaymentPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)
  const [error, setError] = useState('')

  const handlePay = async () => {
    setPaying(true)
    setError('')

    try {
      // Get current user and their latest submission
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not logged in')

      const { data: submissions, error: subError } = await supabase
        .from('intake_submissions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)

      if (subError || !submissions?.length) throw new Error('No submission found')

      const submission = submissions[0]

      // Fire the Brief Builder webhook — payment gate
      const res = await fetch('/api/webhook/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submission })
      })

      if (!res.ok) throw new Error('Payment processing failed')

      setPaid(true)
      setTimeout(() => router.push('/schedule'), 1500)

    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please try again.')
      setPaying(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">{t.almostThere}</h1>

        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <div className="text-3xl font-bold text-gray-900">$50</div>
          <div className="text-sm text-gray-500">Discovery Call</div>
          <div className="text-xs text-gray-400 leading-relaxed">
            30-minute scoping call with Charles. We review your project, confirm the approach, and set expectations.
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 rounded-lg p-3">{error}</div>
        )}

        {paid ? (
          <div className="text-green-700 font-semibold text-sm bg-green-50 rounded-lg p-3">
            ✅ Payment confirmed — redirecting to scheduling...
          </div>
        ) : (
          <button
            onClick={handlePay}
            disabled={paying}
            className="block w-full py-3 bg-[#15803d] text-white font-semibold rounded-lg hover:bg-green-800 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {paying ? 'Processing...' : 'Pay $50 — Book My Call'}
          </button>
        )}

        <p className="text-xs text-gray-400">
          Stripe integration coming soon. For now this confirms your intent and starts your project brief.
        </p>
      </div>
    </div>
  )
}
