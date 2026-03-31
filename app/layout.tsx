import type { Metadata } from 'next'
import './globals.css'
import LanguageToggle from '@/components/LanguageToggle'

export const metadata: Metadata = {
  title: 'Grosslight Consulting',
  description: 'Client Intake Form',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-[480px] mx-auto px-4 py-3 flex items-center justify-between">
            <span className="font-bold text-[#15803d] text-lg tracking-tight">
              Grosslight Consulting
            </span>
            <LanguageToggle />
          </div>
        </header>
        <main className="max-w-[480px] mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
