import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const SITE_ID = process.env.SITE_ID || 'cardioguard'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Get client IP for logging (optional)
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown'
    
    // Store signup data
    const signupData = {
      email: email.toLowerCase().trim(),
      timestamp: new Date().toISOString(),
      ip: clientIP,
      userAgent: request.headers.get('user-agent') || 'unknown'
    }

    // Add to email signups list
    await redis.rpush(`email_signups:${SITE_ID}`, JSON.stringify(signupData))
    
    // Increment counter
    await redis.incr(`email_signups_count:${SITE_ID}`)
    
    // Set expiration on counter (optional - keeps data for 1 year)
    await redis.expire(`email_signups_count:${SITE_ID}`, 31536000)
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}