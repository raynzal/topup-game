import { useState, useEffect } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { HiUser, HiMail, HiBadgeCheck, HiGift, HiShoppingBag, HiClock, HiStar } from 'react-icons/hi'

export default function Profile() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [orders, setOrders] = useState([])
  const [totalSpent, setTotalSpent] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]').filter(o => o.userId === user?.id)
    setOrders(allOrders)
    setTotalSpent(allOrders.reduce((sum, o) => sum + (o.total || 0), 0))
  }, [user])

  if (!mounted) return null

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-dark-800 border border-cyan-500/20 rounded-3xl p-6 md:p-8 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-[60px]" />
            <div className="relative flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/20">
                <span className="text-3xl font-bold text-white">{user?.name?.charAt(0)?.toUpperCase()}</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
                  <HiBadgeCheck className="w-5 h-5 text-cyan-400" />
                </div>
                <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start gap-1">
                  <HiMail className="w-3 h-3" /> {user?.email}
                </p>
                <div className="flex items-center gap-1 mt-1 text-green-400 text-xs justify-center md:justify-start">
                  <HiGift className="w-3 h-3" /> {t('profile.discount')}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-center bg-dark-900/50 rounded-xl px-4 py-3 border border-dark-700">
                  <p className="text-2xl font-bold text-cyan-400">{orders.length}</p>
                  <p className="text-gray-500 text-xs">{t('profile.orders')}</p>
                </div>
                <div className="text-center bg-dark-900/50 rounded-xl px-4 py-3 border border-dark-700">
                  <p className="text-2xl font-bold text-yellow-400">{Math.floor(totalSpent / 10000)}</p>
                  <p className="text-gray-500 text-xs">{t('profile.points')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { icon: HiShoppingBag, label: t('history.title'), value: `${orders.length} transaksi`, color: 'from-blue-400 to-cyan-500' },
              { icon: HiClock, label: 'Member Since', value: user?.id ? new Date(parseInt(user.id)).toLocaleDateString() : '-', color: 'from-purple-400 to-pink-500' },
              { icon: HiStar, label: t('profile.points'), value: `${Math.floor(totalSpent / 10000)} points`, color: 'from-yellow-400 to-orange-500' },
              { icon: HiGift, label: t('checkout.discount'), value: '5% setiap transaksi', color: 'from-green-400 to-emerald-500' },
            ].map((item, i) => (
              <div key={i} className="bg-dark-800/50 border border-dark-700 rounded-2xl p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">{item.label}</p>
                  <p className="text-white text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">{t('history.title')} Terakhir</h2>
            {orders.length > 0 ? (
              <div className="space-y-3">
                {orders.slice(-5).reverse().map(order => (
                  <div key={order.id} className="bg-dark-900/50 rounded-xl p-4 border border-dark-700 flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">{order.game} - {order.product?.name}</p>
                      <p className="text-gray-500 text-xs">{new Date(order.date).toLocaleDateString()} • ID: {order.gameId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-400 font-bold text-sm">Rp {order.total?.toLocaleString()}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        order.status === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>{t(`history.status.${order.status}`)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-6">{t('history.empty')}</p>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
