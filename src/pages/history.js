import { useEffect } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { HiClock, HiSearch } from 'react-icons/hi'
import { useState } from 'react'

export default function History() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [orders, setOrders] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      .filter(o => o.userId === user?.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
    setOrders(allOrders)
  }, [user])

  if (!mounted) return null

  const filtered = orders.filter(o => {
    if (filter !== 'all' && o.status !== filter) return false
    if (search && !o.game?.toLowerCase().includes(search.toLowerCase()) && !o.gameId?.includes(search)) return false
    return true
  })

  const statusColors = {
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    failed: 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">{t('history.title')}</h1>
              <p className="text-gray-500 text-sm">{orders.length} transaksi</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-48">
                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari..." className="w-full bg-dark-800 border border-dark-700 rounded-xl pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/40" />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {['all', 'success', 'pending', 'processing', 'failed'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${filter === f ? 'bg-cyan-500 text-white' : 'bg-dark-800 text-gray-400 hover:text-cyan-400 border border-dark-700'}`}>
                {f === 'all' ? 'Semua' : t(`history.status.${f}`)}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map(order => (
                <div key={order.id} className="bg-dark-800/50 border border-dark-700 rounded-2xl p-5 hover:border-dark-600 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {order.game?.charAt(0) || 'G'}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{order.game}</p>
                        <p className="text-gray-500 text-xs">{order.product?.name}</p>
                        <p className="text-gray-600 text-xs">ID: {order.gameId}{order.serverId ? ` (${order.serverId})` : ''}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:text-right">
                      <div>
                        <p className="text-cyan-400 font-bold text-sm">Rp {order.total?.toLocaleString()}</p>
                        <p className="text-gray-600 text-xs">{new Date(order.date).toLocaleDateString()} • {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${statusColors[order.status] || statusColors.pending}`}>
                        {t(`history.status.${order.status}`)}
                      </span>
                    </div>
                  </div>
                  {order.payment && (
                    <div className="mt-2 pt-2 border-t border-dark-700 flex items-center gap-2">
                      <span className="text-gray-600 text-xs">Pembayaran: {order.payment}</span>
                      {order.email && <span className="text-gray-600 text-xs">• Email: {order.email}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <HiClock className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500">{t('history.empty')}</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
