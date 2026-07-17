import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { games } from '@/data/games'
import { products } from '@/data/products'
import GameIDChecker from '@/components/GameIDChecker'
import { HiArrowLeft, HiStar, HiFire, HiCheck, HiShoppingCart, HiChevronDown } from 'react-icons/hi'

export default function GameDetail() {
  const router = useRouter()
  const { slug } = router.query
  const { t, lang } = useLanguage()
  const { user } = useAuth()

  const game = games.find(g => g.id === slug)
  const productList = products[slug] || []

  const [selected, setSelected] = useState(null)
  const [gameId, setGameId] = useState('')
  const [serverId, setServerId] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [payment, setPayment] = useState('')
  const [showCheckout, setShowCheckout] = useState(false)
  const [success, setSuccess] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Game not found</p>
          <Link href="/" className="text-cyan-400 mt-2 inline-block">Back to home</Link>
        </div>
      </div>
    )
  }

  const payMethods = [
    { id: 'gopay', name: 'GoPay', icon: '💚' },
    { id: 'ovo', name: 'OVO', icon: '💜' },
    { id: 'dana', name: 'DANA', icon: '💙' },
    { id: 'shopeepay', name: 'ShopeePay', icon: '🧡' },
    { id: 'linkaja', name: 'LinkAja', icon: '🔴' },
  ]

  const total = selected ? (user ? Math.round(selected.price * 0.95) : selected.price) : 0
  const discount = user ? Math.round(selected ? selected.price * 0.05 : 0) : 0

  const handleBuy = () => {
    if (!gameId.trim()) return alert('Masukkan ID Game')
    if (!selected) return alert('Pilih paket terlebih dahulu')
    setShowCheckout(true)
  }

  const handlePay = () => {
    if (!payment) return alert('Pilih metode pembayaran')
    const order = {
      gameId: gameId.trim(),
      serverId: serverId.trim(),
      nickname: nickname.trim(),
      email: email.trim(),
      product: selected,
      payment,
      total,
      status: 'success',
      game: lang === 'id' ? game.nameId : game.name,
    }
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push({ ...order, id: Date.now().toString(), userId: user?.id, date: new Date().toISOString() })
    localStorage.setItem('orders', JSON.stringify(orders))
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-dark-800 border border-green-500/20 rounded-3xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiCheck className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{t('checkout.success')}</h2>
          <p className="text-gray-400 text-sm mb-4">{t('checkout.success.desc')}</p>
          <div className="bg-dark-900 rounded-xl p-4 mb-6 text-left space-y-2">
            <p className="text-gray-400 text-sm">Game: <span className="text-white">{lang === 'id' ? game.nameId : game.name}</span></p>
            <p className="text-gray-400 text-sm">ID: <span className="text-white">{gameId}</span></p>
            <p className="text-gray-400 text-sm">Paket: <span className="text-white">{selected?.name}</span></p>
            <p className="text-gray-400 text-sm">Total: <span className="text-cyan-400 font-bold">Rp {total.toLocaleString()}</span></p>
            <p className="text-gray-400 text-sm">Pembayaran: <span className="text-white">{payMethods.find(p => p.id === payment)?.name}</span></p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="btn-secondary flex-1 py-3 text-sm">Beranda</Link>
            <Link href="/history" className="btn-primary flex-1 py-3 text-sm">Riwayat</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen animate-fade-in">
      <div className={`relative h-56 md:h-72 overflow-hidden`}>
        <img src={game.image} alt={game.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-br ${game.bgColor} mix-blend-overlay opacity-50`} />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <Link href="/#games" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-4 transition">
              <HiArrowLeft className="w-4 h-4" /> Kembali
            </Link>
            <div className="flex items-end justify-between">
              <div className="flex items-end gap-5">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white font-bold text-2xl md:text-3xl border border-white/20 shadow-xl">
                  {game.logo}
                </div>
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">{lang === 'id' ? game.nameId : game.name}</h1>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-white/80 bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10">{game.category}</span>
                    <span className="flex items-center gap-1 text-yellow-300 text-sm drop-shadow-md"><HiStar className="w-4 h-4" /> {game.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {!showCheckout ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">{t('product.title')}</h2>
                  {user && (
                    <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                      {t('checkout.discount')}: 5% OFF
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {productList.map(p => (
                    <button key={p.id} onClick={() => setSelected(p)} className={`text-left p-4 rounded-2xl border transition-all duration-300 ${selected?.id === p.id ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10' : 'border-dark-700 bg-dark-800/50 hover:border-dark-600'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium text-sm">{lang === 'id' && p.nameId ? p.nameId : p.name}</span>
                        {p.popular && <span className="text-[10px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded-full border border-orange-500/20">{t('product.popular')}</span>}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-cyan-400">Rp {user ? Math.round(p.price * 0.95).toLocaleString() : p.price.toLocaleString()}</span>
                        {p.originalPrice > p.price && (
                          <span className="text-xs text-gray-600 line-through">Rp {p.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      {p.originalPrice > p.price && (
                        <span className="text-[10px] text-green-400 mt-1 inline-block">{t('product.discount')} {Math.round((1 - p.price / p.originalPrice) * 100)}%</span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <GameIDChecker gameId={slug} />
                </div>

                <div className="mt-6">
                  <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6">
                    <h3 className="text-white font-semibold mb-4">Data Pesanan</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-400 text-sm block mb-1.5">{t('checkout.gameId')} *</label>
                        <input type="text" value={gameId} onChange={e => setGameId(e.target.value)} placeholder={t('checkout.gameId.placeholder')} className="input-field" />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm block mb-1.5">{t('checkout.serverId')}</label>
                        <input type="text" value={serverId} onChange={e => setServerId(e.target.value)} placeholder={t('checkout.serverId.placeholder')} className="input-field" />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm block mb-1.5">{t('checkout.nickname')}</label>
                        <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} placeholder={t('checkout.nickname.placeholder')} className="input-field" />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm block mb-1.5">{t('checkout.email')}</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t('checkout.email.placeholder')} className="input-field" />
                      </div>
                    </div>
                    <button onClick={handleBuy} disabled={!selected} className="btn-primary w-full mt-6 py-3 text-sm disabled:opacity-50 flex items-center justify-center gap-2">
                      <HiShoppingCart className="w-4 h-4" /> {t('product.buy')}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">{t('checkout.title')}</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm py-2 border-b border-dark-700">
                    <span className="text-gray-400">{t('checkout.gameId')}</span>
                    <span className="text-white">{gameId}{serverId ? ` (${serverId})` : ''}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-dark-700">
                    <span className="text-gray-400">{t('history.game')}</span>
                    <span className="text-white">{lang === 'id' ? game.nameId : game.name}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-dark-700">
                    <span className="text-gray-400">{t('history.product')}</span>
                    <span className="text-white">{selected?.name}</span>
                  </div>
                  {user && (
                    <div className="flex justify-between text-sm py-2 border-b border-dark-700">
                      <span className="text-green-400">{t('checkout.discount')}</span>
                      <span className="text-green-400">-Rp {discount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="text-gray-400 text-sm block mb-2">{t('checkout.payment')}</label>
                  <div className="relative">
                    <button onClick={() => setPaymentOpen(!paymentOpen)} className="w-full input-field text-left flex items-center justify-between">
                      {payment ? (
                        <span className="flex items-center gap-2">
                          <span>{payMethods.find(p => p.id === payment)?.icon}</span>
                          <span className="text-white">{payMethods.find(p => p.id === payment)?.name}</span>
                        </span>
                      ) : <span className="text-gray-500">Pilih {t('checkout.payment')}</span>}
                      <HiChevronDown className={`w-4 h-4 text-gray-500 transition ${paymentOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {paymentOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-dark-800 border border-dark-700 rounded-xl overflow-hidden z-10 shadow-xl">
                        {payMethods.map(pm => (
                          <button key={pm.id} onClick={() => { setPayment(pm.id); setPaymentOpen(false) }} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-dark-700 transition">
                            <span>{pm.icon}</span> {pm.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-dark-900 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{t('checkout.total')}</span>
                    <span className="text-2xl font-bold text-cyan-400">Rp {total.toLocaleString()}</span>
                  </div>
                </div>

                <button onClick={handlePay} disabled={!payment} className="btn-primary w-full py-3 text-sm disabled:opacity-50">
                  {t('checkout.submit')} - Rp {total.toLocaleString()}
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-dark-800/50 border border-dark-700 rounded-2xl relative overflow-hidden">
                <img src={game.image} alt={game.name} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                <div className={`absolute inset-0 bg-gradient-to-br ${game.bgColor} mix-blend-overlay opacity-40`} />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
                <div className="relative p-5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-xl font-bold text-white border border-white/30 shadow-lg">
                      {game.logo}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold drop-shadow-lg">{lang === 'id' ? game.nameId : game.name}</h3>
                      <span className="text-xs text-white/60">{game.category}</span>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm drop-shadow-md">{lang === 'id' ? game.descriptionId : game.description}</p>
                </div>
              </div>
              {selected && (
                <div className="bg-dark-800/50 border border-cyan-500/20 rounded-2xl p-5">
                  <p className="text-gray-400 text-xs mb-1">Paket dipilih</p>
                  <p className="text-white font-medium text-sm">{selected.name}</p>
                  <p className="text-cyan-400 font-bold text-lg mt-1">Rp {user ? Math.round(selected.price * 0.95).toLocaleString() : selected.price.toLocaleString()}</p>
                  {user && <p className="text-green-400 text-xs mt-1">Termasuk diskon member 5%</p>}
                </div>
              )}
              <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-5">
                <p className="text-gray-400 text-sm mb-3">Metode Pembayaran</p>
                <div className="flex flex-wrap gap-2">
                  {payMethods.map(pm => (
                    <span key={pm.id} className="text-xs bg-dark-900 border border-dark-700 px-2 py-1 rounded-lg text-gray-400">
                      {pm.icon} {pm.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
