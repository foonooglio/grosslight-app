'use client'

import { useEffect, useState } from 'react'

export default function LanguageToggle() {
  const [lang, setLang] = useState<'en' | 'es'>('en')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as 'en' | 'es' | null
    if (stored) setLang(stored)
    const handler = (e: Event) => {
      const custom = e as CustomEvent
      setLang(custom.detail)
    }
    window.addEventListener('langChange', handler)
    return () => window.removeEventListener('langChange', handler)
  }, [])

  const toggle = () => {
    const next = lang === 'en' ? 'es' : 'en'
    localStorage.setItem('lang', next)
    window.dispatchEvent(new CustomEvent('langChange', { detail: next }))
    setLang(next)
  }

  return (
    <button
      onClick={toggle}
      className="text-sm font-medium px-3 py-1 rounded-full border border-green-700 text-green-700 hover:bg-green-50 transition-colors"
      aria-label="Toggle language"
    >
      {lang === 'en' ? 'ES' : 'EN'}
    </button>
  )
}
