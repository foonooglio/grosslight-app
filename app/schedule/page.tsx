'use client'

import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'

export default function SchedulePage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-2">
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">{t.scheduleTitle}</h1>
        <p className="text-gray-600 text-sm leading-relaxed">{t.scheduleBody}</p>
        <div className="w-full h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-sm">
          Calendly embed goes here
        </div>
        <Link
          href="/payment"
          className="block w-full py-3 bg-[#15803d] text-white font-semibold rounded-lg hover:bg-green-800 transition-colors text-sm"
        >
          {t.doneSubmit}
        </Link>
      </div>
    </div>
  )
}
