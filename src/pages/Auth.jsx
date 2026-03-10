import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Leaf, Loader2, Mail } from 'lucide-react'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleGoogleLogin() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/' }
    })
    if (error) setError(error.message)
    setLoading(false)
  }

  async function handleEmailAuth(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setMessage('Check your email to confirm your account.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else navigate('/')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center px-6 pb-20">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4">
            <Leaf size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Temple</h1>
          <p className="text-gray-500 text-sm mt-1">Know what you eat</p>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-2xl py-4 font-semibold text-gray-700 hover:bg-gray-50 transition-all mb-4 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 text-sm text-gray-900 outline-none focus:border-green-500 transition-colors"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 text-sm text-gray-900 outline-none focus:border-green-500 transition-colors"
          />

          {error && <p className="text-red-500 text-xs px-1">{error}</p>}
          {message && <p className="text-green-600 text-xs px-1">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="w-full text-center text-gray-500 text-sm mt-4"
        >
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <span className="text-green-600 font-semibold">
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </span>
        </button>
      </div>
    </div>
  )
}
