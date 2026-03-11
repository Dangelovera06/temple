import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Loader2, Mail, LogOut, ScanLine, Flame, User, Check, Edit2 } from 'lucide-react'
import logo from '../assets/logo.png'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authMode, setAuthMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [savingName, setSavingName] = useState(false)
  const [stats, setStats] = useState({ scans: 0, logs: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const name = session.user.user_metadata?.full_name || session.user.user_metadata?.name || ''
        setDisplayName(name)
        setNameInput(name)
        loadStats(session.user.id)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const name = session.user.user_metadata?.full_name || session.user.user_metadata?.name || ''
        setDisplayName(name)
        setNameInput(name)
        loadStats(session.user.id)
        setLoading(false)
      } else {
        setLoading(false)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function loadStats(userId) {
    const [scansRes, logsRes] = await Promise.all([
      supabase.from('user_scans').select('*', { count: 'exact', head: true }).eq('user_id', userId),
      supabase.from('calorie_logs').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    ])
    setStats({ scans: scansRes.count || 0, logs: logsRes.count || 0 })
  }

  async function handleGoogleLogin() {
    setAuthLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/auth' }
    })
    if (error) setError(error.message)
    setAuthLoading(false)
  }

  async function handleEmailAuth(e) {
    e.preventDefault()
    setAuthLoading(true)
    setError(null)
    setMessage(null)

    if (authMode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: displayName } }
      })
      if (error) setError(error.message)
      else setMessage('Check your email to confirm your account.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    }
    setAuthLoading(false)
  }

  async function saveName() {
    if (!nameInput.trim()) return
    setSavingName(true)
    const { error } = await supabase.auth.updateUser({
      data: { full_name: nameInput.trim() }
    })
    if (!error) {
      setDisplayName(nameInput.trim())
      setEditingName(false)
    }
    setSavingName(false)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#07070f' }}>
        <div className="w-10 h-10 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
      </div>
    )
  }

  // ── LOGGED IN: Profile View ──────────────────────────────────────────
  if (user) {
    const initials = displayName
      ? displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
      : user.email?.[0]?.toUpperCase() || 'U'
    const avatarUrl = user.user_metadata?.avatar_url

    return (
      <div className="min-h-screen pb-28 pt-14" style={{ background: '#07070f' }}>
        <div className="px-5 py-4 space-y-4">
          <h1 className="font-black text-2xl text-white">Profile</h1>

          {/* Avatar + Name card */}
          <div className="rounded-3xl p-5 border border-white/5" style={{ background: '#111827' }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center font-black text-2xl text-white"
                style={{ background: avatarUrl ? 'transparent' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
                {avatarUrl
                  ? <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
                  : initials}
              </div>
              <div className="flex-1 min-w-0">
                {editingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      autoFocus
                      value={nameInput}
                      onChange={e => setNameInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && saveName()}
                      placeholder="Your name"
                      className="flex-1 bg-transparent text-white font-bold text-base outline-none border-b border-blue-500/50 pb-0.5"
                    />
                    <button onClick={saveName} disabled={savingName}
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(59,130,246,0.2)' }}>
                      {savingName
                        ? <Loader2 size={12} className="animate-spin text-blue-400" />
                        : <Check size={12} className="text-blue-400" />}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setEditingName(true)} className="flex items-center gap-2 group text-left">
                    <span className="font-bold text-white text-base">
                      {displayName || 'Tap to add name'}
                    </span>
                    <Edit2 size={12} className="text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
                  </button>
                )}
                <p className="text-white/40 text-xs mt-0.5 truncate">{user.email}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl p-3 text-center"
                style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <ScanLine size={13} className="text-blue-400" />
                  <span className="text-blue-400 text-xs font-semibold">Total Scans</span>
                </div>
                <p className="text-white font-black text-2xl">{stats.scans}</p>
              </div>
              <div className="rounded-2xl p-3 text-center"
                style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.15)' }}>
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Flame size={13} className="text-orange-400" />
                  <span className="text-orange-400 text-xs font-semibold">Food Logs</span>
                </div>
                <p className="text-white font-black text-2xl">{stats.logs}</p>
              </div>
            </div>
          </div>

          {/* Account info */}
          <div className="rounded-3xl border border-white/5 overflow-hidden" style={{ background: '#111827' }}>
            <div className="px-4 py-3 border-b border-white/5">
              <p className="text-white/30 text-xs font-semibold uppercase tracking-widest">Account</p>
            </div>
            <div className="px-4 py-3.5 flex items-center gap-3 border-b border-white/5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <Mail size={14} className="text-white/40" />
              </div>
              <div>
                <p className="text-white/30 text-xs">Email</p>
                <p className="text-white text-sm font-medium">{user.email}</p>
              </div>
            </div>
            <div className="px-4 py-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <User size={14} className="text-white/40" />
              </div>
              <div>
                <p className="text-white/30 text-xs">Member since</p>
                <p className="text-white text-sm font-medium">
                  {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm border border-red-500/20 text-red-400"
            style={{ background: 'rgba(239,68,68,0.06)' }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  // ── LOGGED OUT: Sign In / Sign Up ────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col justify-center px-6 pb-24" style={{ background: '#07070f' }}>
      <div className="w-full max-w-sm mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 overflow-hidden border border-white/10"
            style={{ background: '#111827' }}>
            <img src={logo} alt="Temple" className="w-full h-full object-contain p-2" />
          </div>
          <h1 className="text-2xl font-black text-white">Temple</h1>
          <p className="text-white/40 text-sm mt-1">Know what you eat</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={authLoading}
          className="w-full flex items-center justify-center gap-3 rounded-2xl py-4 font-semibold text-white text-sm mb-4 border border-white/10 active:scale-98 transition-all"
          style={{ background: '#111827' }}
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <span className="text-white/20 text-xs">or</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-3">
          {authMode === 'signup' && (
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-2xl px-4 py-4 text-sm text-white outline-none border border-white/8 focus:border-blue-500/50 transition-colors"
              style={{ background: '#111827' }}
            />
          )}
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full rounded-2xl px-4 py-4 text-sm text-white outline-none border border-white/8 focus:border-blue-500/50 transition-colors"
            style={{ background: '#111827' }}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full rounded-2xl px-4 py-4 text-sm text-white outline-none border border-white/8 focus:border-blue-500/50 transition-colors"
            style={{ background: '#111827' }}
          />

          {error && <p className="text-red-400 text-xs px-1">{error}</p>}
          {message && (
            <div className="rounded-2xl p-3 border border-emerald-500/20 text-emerald-400 text-xs"
              style={{ background: 'rgba(16,185,129,0.08)' }}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 active:bg-blue-700 transition-colors"
          >
            {authLoading ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}
            {authMode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <button
          onClick={() => { setAuthMode(authMode === 'signin' ? 'signup' : 'signin'); setError(null); setMessage(null) }}
          className="w-full text-center text-sm mt-4 text-white/30"
        >
          {authMode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <span className="text-blue-400 font-semibold">
            {authMode === 'signin' ? 'Sign up' : 'Sign in'}
          </span>
        </button>
      </div>
    </div>
  )
}
