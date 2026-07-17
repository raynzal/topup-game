import { useState, useEffect } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useLanguage } from '@/context/LanguageContext'
import { HiCheck, HiX, HiSearch, HiChevronDown } from 'react-icons/hi'

export default function AdminOrders() {
  const { t } = useLanguage()
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem('orders') || '[]').sort((a, b) => new Date(b.date) - new Date(a.date)))
  }, [])

  const filtered = orders.filter(o => {
    if (filter !== 'all' && o.status !== filter) return false
    if (search && !o.game?.toLowerCase().includes(search.toLowerCase()) && !o.gameId?.includes(search)) return false
    return true
  })

  const updateStatus = (id, status) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o)
    setOrders(updated)
    localStorage.setItem('orders', JSON.stringify(updated))
  }

  const statusColors = {
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    failed: 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-white">{t('admin.orders')}</h1>
            <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari..." className="bg-dark-800 border border-dark-700 rounded-xl pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/40 w-48" />
            </div>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {['all', 'pending', 'processing', 'success', 'failed'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${filter === f ? 'bg-cyan-500 text-white' : 'bg-dark-800 text-gray-400 hover:text-cyan-400 border border-dark-700'}`}>
                {f === 'all' ? 'Semua' : t(`history.status.${f}`)}
              </button>
            ))}
          </div>

          <div className="bg-dark-800/50 border border-dark-700 rounded-2xl overflow-hidden">
            {filtered.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-700">
                      <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Game</th>
                      <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Produk</th>
                      <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">ID Game</th>
                      <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Total</th>
                      <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Tanggal</th>
                      <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Status</th>
                      <th className="text-right text-gray-400 text-xs font-medium px-4 py-3">{t('admin.action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(o => (
                      <tr key={o.id} className="border-b border-dark-700 hover:bg-dark-700/30 transition">
                        <td className="px-4 py-3 text-white text-sm">{o.game}</td>
                        <td className="px-4 py-3 text-gray-300 text-sm">{o.product?.name}</td>
                        <td className="px-4 py-3 text-gray-400 text-sm">{o.gameId}{o.serverId ? ` (${o.serverId})` : ''}</td>
                        <td className="px-4 py-3 text-cyan-400 text-sm font-medium">Rp {o.total?.toLocaleString()}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{new Date(o.date).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${statusColors[o.status] || statusColors.pending}`}>
                            {t(`history.status.${o.status}`)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {o.status === 'pending' && (
                              <>
                                <button onClick={() => updateStatus(o.id, 'processing')} className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition" title="Proses">
                                  <HiChevronDown className="w-4 h-4" />
                                </button>
                                <button onClick={() => updateStatus(o.id, 'failed')} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition" title="Tolak">
                                  <HiX className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            {o.status === 'processing' && (
                              <button onClick={() => updateStatus(o.id, 'success')} className="p-1.5 text-green-400 hover:bg-green-500/10 rounded-lg transition" title="Selesai">
                                <HiCheck className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-12">Tidak ada pesanan</p>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
