import { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useLanguage } from '@/context/LanguageContext'
import { games } from '@/data/games'
import { products } from '@/data/products'
import { HiPlus, HiPencil, HiTrash, HiChevronDown, HiCurrencyDollar } from 'react-icons/hi'

export default function AdminProducts() {
  const { t, lang } = useLanguage()
  const [selectedGame, setSelectedGame] = useState('mobile-legends')
  const [showAdd, setShowAdd] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', nameId: '', price: '', originalPrice: '' })

  const productList = products[selectedGame] || []
  const game = games.find(g => g.id === selectedGame)

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price) return
    alert(`Produk ${newProduct.name} berhasil ditambahkan! (Demo)`)
    setShowAdd(false)
    setNewProduct({ name: '', nameId: '', price: '', originalPrice: '' })
  }

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-white">{t('admin.products')}</h1>
            <button onClick={() => setShowAdd(true)} className="btn-primary flex items-center gap-2 px-4 py-2 text-sm">
              <HiPlus className="w-4 h-4" /> {t('admin.addProduct')}
            </button>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {games.map(g => (
              <button key={g.id} onClick={() => setSelectedGame(g.id)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${selectedGame === g.id ? 'bg-cyan-500 text-white' : 'bg-dark-800 text-gray-400 hover:text-cyan-400 border border-dark-700'}`}>
                {lang === 'id' ? g.nameId : g.name}
              </button>
            ))}
          </div>

          <div className="bg-dark-800/50 border border-dark-700 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-dark-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={game?.image} alt={game?.name} className="w-8 h-8 rounded-lg object-cover" />
                <span className="text-white font-medium">{lang === 'id' ? game?.nameId : game?.name}</span>
              </div>
              <span className="text-gray-500 text-sm">{productList.length} produk</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-700">
                    <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Nama</th>
                    <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Harga</th>
                    <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Harga Asli</th>
                    <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Diskon</th>
                    <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Status</th>
                    <th className="text-right text-gray-400 text-xs font-medium px-4 py-3">{t('admin.action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map(p => (
                    <tr key={p.id} className="border-b border-dark-700 hover:bg-dark-700/30 transition">
                      <td className="px-4 py-3 text-white text-sm">{p.name}</td>
                      <td className="px-4 py-3 text-cyan-400 text-sm font-medium">Rp {p.price.toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-500 text-sm">{p.originalPrice ? `Rp ${p.originalPrice.toLocaleString()}` : '-'}</td>
                      <td className="px-4 py-3">
                        {p.originalPrice > p.price ? (
                          <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">{Math.round((1 - p.price / p.originalPrice) * 100)}%</span>
                        ) : '-'}
                      </td>
                      <td className="px-4 py-3">
                        {p.popular ? <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">{t('product.popular')}</span> : '-'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="p-1.5 text-gray-500 hover:text-cyan-400 transition"><HiPencil className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-500 hover:text-red-400 transition"><HiTrash className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showAdd && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowAdd(false)}>
              <div className="bg-dark-800 border border-dark-700 rounded-3xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-white mb-4">{t('admin.addProduct')}</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-400 text-xs block mb-1">Nama Produk (EN)</label>
                    <input type="text" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="86 Diamonds" className="input-field text-sm" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs block mb-1">Nama Produk (ID)</label>
                    <input type="text" value={newProduct.nameId} onChange={e => setNewProduct({ ...newProduct, nameId: e.target.value })} placeholder="86 Diamond" className="input-field text-sm" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs block mb-1">Harga</label>
                    <div className="relative">
                      <HiCurrencyDollar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input type="number" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="21000" className="input-field pl-9 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs block mb-1">Harga Asli (sebelum diskon)</label>
                    <input type="number" value={newProduct.originalPrice} onChange={e => setNewProduct({ ...newProduct, originalPrice: e.target.value })} placeholder="25000" className="input-field text-sm" />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowAdd(false)} className="btn-secondary flex-1 py-2.5 text-sm">Batal</button>
                  <button onClick={handleAdd} className="btn-primary flex-1 py-2.5 text-sm">Simpan</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
