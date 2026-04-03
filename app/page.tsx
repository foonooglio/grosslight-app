'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { useLanguage } from '@/hooks/useLanguage'

export default function AuthPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [tab, setTab] = useState<'signup' | 'login'>('signup')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName },
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/intake')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/intake')
    }
  }

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm'

  return (
    <div className="flex flex-col items-center pt-8">
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Tab toggle */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              tab === 'signup'
                ? 'bg-white text-[#15803d] shadow-sm'
                : 'text-gray-500'
            }`}
            onClick={() => { setTab('signup'); setError('') }}
          >
            {t.signUp}
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              tab === 'login'
                ? 'bg-white text-[#15803d] shadow-sm'
                : 'text-gray-500'
            }`}
            onClick={() => { setTab('login'); setError('') }}
          >
            {t.logIn}
          </button>
        </div>

        {tab === 'signup' ? (
          <form onSubmit={handleSignUp} className="space-y-4" autoComplete="on">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.firstName}</label>
                <input
                  type="text"
                  name="signup-first-name"
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.lastName}</label>
                <input
                  type="text"
                  name="signup-last-name"
                  autoComplete="family-name"
                  required
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
              <input
                type="email"
                name="signup-email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.password}</label>
              <input
                type="password"
                name="signup-password"
                autoComplete="new-password"
                required
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#15803d] text-white font-semibold rounded-lg hover:bg-green-800 disabled:opacity-60 transition-colors"
            >
              {loading ? t.signingUp : t.createAccount}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4" autoComplete="on">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
              <input
                type="email"
                name="login-email"
                autoComplete="username"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.password}</label>
              <input
                type="password"
                name="login-password"
                autoComplete="current-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#15803d] text-white font-semibold rounded-lg hover:bg-green-800 disabled:opacity-60 transition-colors"
            >
              {loading ? t.loggingIn : t.loginButton}
            </button>
          </form>
        )}
      </div>
    <div className="text-center pb-4">
        <span className="text-xs text-gray-300">v27</span>
      </div>
    </div>
  )
}
