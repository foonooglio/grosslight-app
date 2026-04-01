'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useLanguage } from '@/hooks/useLanguage'

export default function PaymentPage() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submissionId, setSubmissionId] = useState<string | null>(null)

  useEffect(() => {
    // Get the user's latest submission ID so we can pass it to Stripe
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase
        .from('intake_submissions')
        .select('id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .then(({ data }) => {
          if (data?.length) setSubmissionId(data[0].id)
        })
    })
  }, [])

  const handlePay = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissionId }),
      })

      const data = await res.json()
      if (data.error) throw new Error(data.error)
      if (data.url) window.location.href = data.url

    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please try again.')
      setLoading(false)
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

        <button
          onClick={handlePay}
          disabled={loading || !submissionId}
          className="block w-full py-3 bg-[#15803d] text-white font-semibold rounded-lg hover:bg-green-800 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Redirecting to checkout...' : !submissionId ? 'Loading...' : 'Pay $50 — Book My Call'}
        </button>

        <p className="text-xs text-gray-400">
          Secure payment via Stripe. You will be redirected to complete payment.
        </p>
      </div>
    </div>
  )
}
