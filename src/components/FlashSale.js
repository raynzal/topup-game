import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { HiClock } from 'react-icons/hi'
import { games } from '@/data/games'
import Link from 'next/link'

export default function FlashSale() {
  const { t, lang } = useLanguage()
  const [time, setTime] = useState({ hours: 8, minutes: 45, seconds: 30 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev
        if (seconds > 0) seconds--
        else if (minutes > 0) { minutes--; seconds = 59 }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59 }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const flashGame = games[Math.floor(Math.random() * games.length)]

  return (
    <section id="promo" className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-600/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="bg-gradient-to-r from-dark-800 via-dark-800/90 to-dark-800 border border-blue-500/30 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full border border-red-500/30 animate-pulse-slow">
                  {t('promo.flashsale')}
                </span>
                <span className="px-3 py-1 bg-white/10 text-white/80 text-xs font-bold rounded-full border border-white/20">
                  {t('promo.discount')}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{t('promo.title')}</h2>
              <div className="flex items-center gap-2 mt-4">
                <HiClock className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 text-sm">{t('promo.ending')}</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                {[time.hours, time.minutes, time.seconds].map((val, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-dark-900 border border-blue-500/30 rounded-xl px-4 py-2 min-w-[60px] text-center">
                      <span className="text-2xl font-bold text-blue-400 font-mono">{String(val).padStart(2, '0')}</span>
                      <p className="text-[10px] text-gray-500 uppercase">
                        {i === 0 ? t('promo.hours') : i === 1 ? t('promo.minutes') : t('promo.seconds')}
                      </p>
                    </div>
                    {i < 2 && <span className="text-2xl font-bold text-gray-600">:</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 text-center">
              <Link href={`/games/${flashGame.id}`}>
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-dark-700 to-dark-800 border border-dark-700 flex flex-col items-center justify-center p-4 hover:border-blue-500/40 transition group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${flashGame.bgColor} flex items-center justify-center text-white font-bold text-lg mb-2 group-hover:scale-110 transition`}>
                    {flashGame.logo}
                  </div>
                  <p className="text-white text-sm font-medium">{lang === 'id' ? flashGame.nameId : flashGame.name}</p>
                  <p className="text-blue-400 text-xs font-bold mt-1">50% OFF</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
