import { useState, useEffect } from 'react'
import { Loader2, Flame, Target, Plus } from 'lucide-react'
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

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-4 pb-24">
        <Flame size={48} className="text-orange-400" />
        <h2 className="font-bold text-xl text-gray-900">Track Your Calories</h2>
        <p className="text-gray-500 text-sm text-center">Sign in to save your daily food intake across devices</p>
        <Link to="/auth" className="bg-green-600 text-white font-bold px-8 py-3.5 rounded-2xl">
          Sign In
        </Link>
      </div>
    )
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-green-600" size={32} /></div>
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28 pt-14">
      <div className="px-4 py-4 space-y-4">
        <h1 className="font-black text-2xl text-gray-900">Today's Tracker</h1>

        {/* Calorie Ring */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 shrink-0">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="#f0fdf4" strokeWidth="10" />
                <circle
                  cx="40" cy="40" r="34" fill="none"
                  stroke={progress >= 100 ? '#ef4444' : '#16a34a'}
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Flame size={22} className={progress >= 100 ? 'text-red-500' : 'text-orange-500'} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-gray-900">{Math.round(totalCalories)}</div>
              <div className="text-sm text-gray-400">of <span className="font-semibold text-gray-600">{goal}</span> kcal</div>
              <div className={`text-sm font-semibold mt-1 ${remaining < 0 ? 'text-red-500' : 'text-green-600'}`}>
                {remaining < 0 ? `${Math.abs(Math.round(remaining))} over` : `${Math.round(remaining)} remaining`}
              </div>
            </div>
          </div>

          {/* Goal adjuster */}
          <div className="mt-4 flex items-center gap-3">
            <Target size={14} className="text-gray-400 shrink-0" />
            <span className="text-xs text-gray-500">Daily goal:</span>
            <input
              type="number"
              value={goal}
              onChange={e => setGoal(Number(e.target.value))}
              className="w-20 text-sm font-bold text-gray-900 border border-gray-200 rounded-lg px-2 py-1 text-center"
            />
            <span className="text-xs text-gray-400">kcal</span>
          </div>
        </div>

        {/* Food Log */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Food Log</h2>
            <Link to="/scan" className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <Plus size={16} /> Add
            </Link>
          </div>

          {logs.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-gray-400 text-sm">No food logged today</p>
              <Link to="/scan" className="text-green-600 text-sm font-semibold mt-2 inline-block">
                Scan a product →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {logs.map(log => (
                <div key={log.id} className="px-4 py-3 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{log.product_name}</p>
                    <p className="text-gray-400 text-xs">{log.servings} serving{log.servings !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900 text-sm">{Math.round(log.calories * log.servings)} kcal</p>
                    <button
                      onClick={() => removeLog(log.id)}
                      className="text-red-400 text-xs font-medium"
                    >
                      Remove
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
