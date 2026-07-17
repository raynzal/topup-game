import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { HiSearch, HiCheckCircle, HiXCircle, HiUser } from 'react-icons/hi'

export default function GameIDChecker({ gameId: gameSlug }) {
  const { t } = useLanguage()
  const [id, setId] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const checkID = () => {
    if (!id.trim()) { setError('Masukkan ID Game'); return }
    setLoading(true); setError(''); setResult(null)
    setTimeout(() => {
      const rand = Math.random()
      if (rand > 0.2) {
        setResult({
          success: true,
          nickname: `Player${id.slice(-4)}`,
          id: id.trim()
        })
      } else {
        setResult({ success: false })
      }
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-1">{t('gid.title')}</h3>
      <p className="text-gray-500 text-xs mb-4">Cek nickname game kamu sebelum top up</p>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={id}
            onChange={e => { setId(e.target.value); setError(''); setResult(null) }}
            placeholder={t('gid.placeholder')}
            className="w-full bg-dark-900 border border-dark-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/40"
          />
        </div>
        <button onClick={checkID} disabled={loading} className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-600/20 transition disabled:opacity-50">
          {loading ? '...' : t('gid.btn')}
        </button>
      </div>
      {error && (
        <div className="flex items-center gap-2 mt-3 text-red-400 text-sm">
          <HiXCircle className="w-4 h-4" /> {error}
        </div>
      )}
      {result && (
        <div className={`mt-4 p-4 rounded-xl ${result.success ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
          {result.success ? (
            <div className="flex items-center gap-3">
              <HiCheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-white text-sm font-medium">{t('gid.result')} {result.nickname}</p>
                <p className="text-gray-500 text-xs">ID: {result.id}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <HiXCircle className="w-6 h-6 text-red-400" />
              <p className="text-red-300 text-sm">{t('gid.error')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
