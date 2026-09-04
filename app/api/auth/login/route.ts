import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const VALID_USERNAME = 'CBA_01'
const VALID_PASSWORD = 'CBA_t26'
const SESSION_DURATION = 3 * 60 * 60 * 1000 // 3 hours in milliseconds

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      const cookieStore = await cookies()
      
      // Set authentication cookie with 3-hour expiration
      cookieStore.set('cba_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_DURATION / 1000, // Convert to seconds
        path: '/',
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
