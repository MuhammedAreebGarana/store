'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/` },
    })
    if (error) { setError(error.message); setLoading(false); return }
    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 text-center">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink mb-4">Check your email</h1>
          <p className="text-muted mb-8">We sent a confirmation link to <strong>{email}</strong>.</p>
          <Link href="/" className="btn-primary inline-block">Back to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted mb-3">Join us</p>
        <h1 className="font-display text-3xl font-medium text-ink mb-10">Create account</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs tracking-wide uppercase text-muted mb-2">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input-field" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-xs tracking-wide uppercase text-muted mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="input-field" placeholder="Min. 6 characters" />
          </div>
          {error && <p className="text-xs text-rust">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full mt-2 disabled:opacity-60">
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>
        <p className="mt-6 text-sm text-muted text-center">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-ink underline underline-offset-2">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
