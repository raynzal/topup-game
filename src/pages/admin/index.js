import ProtectedRoute from '@/components/ProtectedRoute'
import { useLanguage } from '@/context/LanguageContext'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HiUsers, HiShoppingBag, HiCurrencyDollar, HiTrendingUp, HiArrowRight } from 'react-icons/hi'

export default function AdminDashboard() {
  const { t } = useLanguage()
  const [stats, setStats] = useState({ users: 0, orders: 0, revenue: 0, activeUsers: 0 })

  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
    setStats({ users: users.length, orders: orders.length, revenue, activeUsers: users.filter(u => u.isMember).length })
    setRecentOrders(orders.slice(-5).reverse())
  }, [])

  const cards = [
    { icon: HiUsers, label: t('admin.totalUsers'), value: stats.users, color: 'from-cyan-400 to-blue-500', href: '/admin/users' },
    { icon: HiShoppingBag, label: t('admin.totalOrders'), value: stats.orders, color: 'from-purple-400 to-pink-500', href: '/admin/orders' },
    { icon: HiCurrencyDollar, label: t('admin.totalRevenue'), value: `Rp ${stats.revenue.toLocaleString()}`, color: 'from-green-400 to-emerald-500', href: '/admin/orders' },
    { icon: HiTrendingUp, label: t('admin.activeUsers'), value: stats.activeUsers, color: 'from-yellow-400 to-orange-500', href: '/admin/users' },
  ]

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-6">{t('admin.title')}</h1>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((card, i) => (
              <Link key={i} href={card.href} className="bg-dark-800/50 border border-dark-700 rounded-2xl p-5 card-hover group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{card.value}</p>
                <p className="text-gray-500 text-sm">{card.label}</p>
              </Link>
            ))}
          </div>

          <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Pesanan Terbaru</h2>
              <Link href="/admin/orders" className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                Lihat Semua <HiArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {recentOrders.length > 0 ? (
              <div className="space-y-2">
                {recentOrders.map(o => (
                  <div key={o.id} className="flex items-center justify-between py-2 border-b border-dark-700 last:border-0">
                    <div>
                      <p className="text-white text-sm">{o.game} - {o.product?.name}</p>
                      <p className="text-gray-600 text-xs">{o.gameId} • {new Date(o.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-400 text-sm font-bold">Rp {o.total?.toLocaleString()}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        o.status === 'success' ? 'bg-green-500/10 text-green-400' :
                        o.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                      }`}>{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-6">Belum ada pesanan</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Link href="/admin/products" className="bg-dark-800/50 border border-dark-700 rounded-2xl p-5 card-hover flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{t('admin.products')}</p>
                <p className="text-gray-500 text-sm">Kelola produk game</p>
              </div>
              <HiArrowRight className="w-5 h-5 text-cyan-400" />
            </Link>
            <Link href="/admin/orders" className="bg-dark-800/50 border border-dark-700 rounded-2xl p-5 card-hover flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{t('admin.orders')}</p>
                <p className="text-gray-500 text-sm">Kelola pesanan masuk</p>
              </div>
              <HiArrowRight className="w-5 h-5 text-cyan-400" />
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
