'use client'

import { useEffect, useState } from 'react'
import { translations, Language } from '@/lib/translations'

export function useLanguage() {
  const [lang, setLang] = useState<Language>('en')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Language | null
    if (stored) setLang(stored)
    const handler = (e: Event) => {
      const custom = e as CustomEvent
      setLang(custom.detail)
    }
    window.addEventListener('langChange', handler)
    return () => window.removeEventListener('langChange', handler)
  }, [])

  const t = translations[lang]
  return { lang, t }
}
