import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const vpsResponse = await fetch('http://178.156.168.207:3100/webhook/intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return NextResponse.json({ ok: true, vpsStatus: vpsResponse.status })
  } catch (error) {
    console.error('Webhook relay error:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
