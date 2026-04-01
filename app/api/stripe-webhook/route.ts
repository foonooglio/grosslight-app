import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error('Stripe webhook signature failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    const submissionId = session.metadata?.submission_id

    if (submissionId) {
      try {
        // Fetch the full submission from Supabase and fire Brief Builder
        const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

        const res = await fetch(`${SUPABASE_URL}/rest/v1/intake_submissions?id=eq.${submissionId}&select=*`, {
          headers: {
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            'apikey': SUPABASE_SERVICE_KEY,
          }
        })
        const rows = await res.json()

        if (rows?.length) {
          // Fire Brief Builder webhook on VPS
          await fetch('https://api.grosslightconsulting.com/webhook/intake', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ submission: rows[0], stripe_session_id: session.id })
          })
          console.log('Brief Builder triggered for submission:', submissionId)
        }
      } catch (e: any) {
        console.error('Brief Builder trigger failed:', e.message)
      }
    }
  }

  return NextResponse.json({ received: true })
}
