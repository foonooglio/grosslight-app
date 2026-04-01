import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { submissionId } = body

    const origin = request.headers.get('origin') || 'https://app.grosslightconsulting.com'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Discovery Call — Grosslight Consulting',
            description: '30-minute scoping call with Charles. We review your project, confirm the approach, and set expectations.',
          },
          unit_amount: 5000, // $50.00
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment`,
      metadata: {
        submission_id: submissionId || '',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
