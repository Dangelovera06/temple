import { useState, useEffect } from 'react'
import { Loader2, Flame, Target, Plus, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'

export default function Tracker() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [goal, setGoal] = useState(2000)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) loadLogs(user.id)
      else setLoading(false)
    })
  }, [])

  async function loadLogs(userId) {
    const { data } = await supabase
      .from('calorie_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .order('created_at', { ascending: false })
    setLogs(data || [])
    setLoading(false)
  }

  async function removeLog(id) {
    await supabase.from('calorie_logs').delete().eq('id', id)
    setLogs(logs.filter(l => l.id !== id))
  }

  const totalCalories = logs.reduce((sum, log) => sum + (log.calories * log.servings), 0)
  const progress = Math.min((totalCalories / goal) * 100, 100)
  const remaining = goal - totalCalories
  const over = remaining < 0

  const r = 64
  const circ = 2 * Math.PI * r
  const dash = circ * (1 - progress / 100)

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-5 pb-24"
        style={{ background: '#07070f' }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(59,130,246,0.12)' }}>
          <Flame size={28} className="text-blue-400" />
        </div>
        <div className="text-center">
          <h2 className="font-bold text-xl text-white mb-2">Track Your Calories</h2>
          <p className="text-white/40 text-sm leading-relaxed">Sign in to save your daily food intake across devices</p>
        </div>
        <Link to="/auth" className="bg-blue-600 text-white font-bold px-8 py-3.5 rounded-2xl text-sm">
          Sign In
        </Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#07070f' }}>
        <div className="w-10 h-10 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-28 pt-14" style={{ background: '#07070f' }}>
      <div className="px-5 py-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-black text-2xl text-white">Today</h1>
          <span className="text-white/30 text-sm">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Calorie Ring Card */}
        <div className="rounded-3xl p-5 border border-white/5" style={{ background: '#111827' }}>
          <div className="flex items-center gap-5">
            {/* Ring */}
            <div className="relative shrink-0" style={{ width: 150, height: 150 }}>
              <svg width="150" height="150" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="75" cy="75" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                <circle
                  cx="75" cy="75" r={r} fill="none"
                  stroke={over ? '#ef4444' : '#3b82f6'}
                  strokeWidth="12"
                  strokeDasharray={circ}
                  strokeDashoffset={dash}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.3s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-black text-white leading-none">{Math.round(totalCalories)}</div>
                <div className="text-white/30 text-xs mt-1">kcal</div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-white/30 text-xs mb-0.5">Daily Goal</p>
                <p className="text-white font-bold">{goal} <span className="text-white/30 font-normal text-xs">kcal</span></p>
              </div>
              <div>
                <p className="text-white/30 text-xs mb-0.5">{over ? 'Over by' : 'Remaining'}</p>
                <p className={`font-bold ${over ? 'text-red-400' : 'text-blue-400'}`}>
                  {Math.abs(Math.round(remaining))} <span className="text-white/30 font-normal text-xs">kcal</span>
                </p>
              </div>
              <div>
                <div className="flex justify-between text-xs text-white/30 mb-1.5">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                      background: over ? '#ef4444' : 'linear-gradient(90deg, #3b82f6, #60a5fa)'
                    }} />
                </div>
              </div>
            </div>
          </div>

          {/* Goal adjuster */}
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3">
            <Target size={13} className="text-white/30 shrink-0" />
            <span className="text-xs text-white/30">Daily goal:</span>
            <input
              type="number"
              value={goal}
              onChange={e => setGoal(Number(e.target.value))}
              className="w-20 text-sm font-bold text-white border border-white/10 rounded-xl px-3 py-1.5 text-center outline-none"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            />
            <span className="text-xs text-white/20">kcal</span>
          </div>
        </div>

        {/* Food Log */}
        <div className="rounded-3xl border border-white/5 overflow-hidden" style={{ background: '#111827' }}>
          <div className="px-4 py-3.5 border-b border-white/5 flex items-center justify-between">
            <h2 className="font-bold text-white text-sm">Food Log</h2>
            <Link to="/scan" className="flex items-center gap-1.5 text-blue-400 text-xs font-bold px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(59,130,246,0.12)' }}>
              <Plus size={13} /> Add Food
            </Link>
          </div>

          {logs.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <Flame size={28} className="text-white/10 mx-auto mb-3" />
              <p className="text-white/30 text-sm">No food logged today</p>
              <Link to="/scan" className="text-blue-400 text-xs font-semibold mt-2 inline-block">
                Scan a product →
              </Link>
            </div>
          ) : (
            <div>
              {logs.map((log, i) => (
                <div key={log.id}
                  className={`px-4 py-3.5 flex items-center gap-3 ${i < logs.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(59,130,246,0.1)' }}>
                    <Flame size={15} className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate">{log.product_name}</p>
                    <p className="text-white/30 text-xs mt-0.5">{log.servings} serving{log.servings !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="text-right shrink-0 flex items-center gap-2">
                    <div>
                      <p className="font-bold text-white text-sm">{Math.round(log.calories * log.servings)}</p>
                      <p className="text-white/30 text-xs">kcal</p>
                    </div>
                    <button onClick={() => removeLog(log.id)}
                      className="w-7 h-7 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(239,68,68,0.1)' }}>
                      <Trash2 size={12} className="text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
