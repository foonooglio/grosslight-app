'use client'

import { useLanguage } from '@/hooks/useLanguage'

export default function ThankYouPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-2">
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-4">
        <div className="text-5xl mb-2">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900">{t.allSet}</h1>
        <p className="text-gray-600 text-sm leading-relaxed">{t.thankYouBody}</p>
        <p className="text-gray-400 text-xs pt-2">{t.thankYouContact}</p>
      </div>
    </div>
  )
}
