import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { games } from '@/data/games'
import GameCard from '@/components/GameCard'
import FlashSale from '@/components/FlashSale'
import TestimonialSlider from '@/components/TestimonialSlider'
import { HiLightningBolt, HiCash, HiShieldCheck, HiSupport, HiArrowRight, HiChevronRight, HiFire } from 'react-icons/hi'

export default function Home() {
  const { t, lang } = useLanguage()
  const { user } = useAuth()
  const [filter, setFilter] = useState('all')

  const popular = games.filter(g => g.popular)
  const filtered = filter === 'all' ? games : games.filter(g => g.category === filter)
  const categories = [...new Set(games.map(g => g.category))]

  return (
    <div className="animate-fade-in">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-dark-900 to-dark-900" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-semibold rounded-full border border-cyan-500/20">
                  #1 Top Up Indonesia
                </span>
                <span className="px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-semibold rounded-full border border-orange-500/20 flex items-center gap-1">
                  <HiFire className="w-3 h-3" /> 100K+ Pelanggan
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
                {t('hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#games" className="btn-primary px-6 py-3 flex items-center gap-2 text-base">
                  {t('hero.cta')} <HiArrowRight className="w-4 h-4" />
                </Link>
                {!user && (
                  <Link href="/auth/register" className="btn-secondary px-6 py-3 flex items-center gap-2 text-base">
                    {t('hero.cta2')}
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 border-2 border-dark-900 flex items-center justify-center text-[9px] text-white font-bold">
                      {String.fromCharCode(64+i)}
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 text-sm">Trusted by <span className="text-white font-semibold">10,000+</span> gamers</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="w-80 h-80 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
                <div className="relative w-80 h-80 rounded-full border border-cyan-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-2">🎮</div>
                    <p className="text-cyan-400 font-bold text-lg">ZallStore</p>
                    <p className="text-gray-500 text-sm">No.1 Top Up Indonesia</p>
                  </div>
                </div>
                {['ML', 'FF', 'PUBG', 'GI', 'VL'].map((label, i) => {
                  const angles = [0, 72, 144, 216, 288]
                  const rad = (angles[i] * Math.PI) / 180
                  const r = 160
                  const x = Math.cos(rad) * r
                  const y = Math.sin(rad) * r
                  return (
                    <div key={i} className="absolute w-10 h-10 bg-dark-800 border border-dark-700 rounded-xl flex items-center justify-center text-[8px] text-cyan-400 font-bold shadow-lg" style={{ left: `calc(50% + ${x}px - 20px)`, top: `calc(50% + ${y}px - 20px)` }}>
                      {label}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: HiLightningBolt, title: t('feature.instant'), desc: t('feature.instant.desc'), color: 'from-yellow-400 to-orange-500' },
              { icon: HiCash, title: t('feature.price'), desc: t('feature.price.desc'), color: 'from-green-400 to-emerald-500' },
              { icon: HiShieldCheck, title: t('feature.secure'), desc: t('feature.secure.desc'), color: 'from-cyan-400 to-blue-500' },
              { icon: HiSupport, title: t('feature.support'), desc: t('feature.support.desc'), color: 'from-purple-400 to-pink-500' },
            ].map((feat, i) => (
              <div key={i} className="glass rounded-2xl p-5 card-hover group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
                  <feat.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{feat.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GAMES SECTION ===== */}
      <section id="games" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">{t('games.title')}</h2>
              <p className="text-gray-500 mt-2">{t('games.subtitle')}</p>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button onClick={() => setFilter('all')} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${filter === 'all' ? 'bg-cyan-500 text-white' : 'bg-dark-800 text-gray-400 hover:text-cyan-400 border border-dark-700'}`}>
                {t('games.all')}
              </button>
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${filter === cat ? 'bg-cyan-500 text-white' : 'bg-dark-800 text-gray-400 hover:text-cyan-400 border border-dark-700'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filtered.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-gray-500 py-12">No games found</p>
          )}
        </div>
      </section>

      {/* ===== POPULAR GAMES ===== */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <HiFire className="w-5 h-5 text-orange-400" /> {t('games.popular')}
            </h2>
            <Link href="#games" className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
              {t('games.viewAll')} <HiChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popular.slice(0, 3).map(game => (
              <GameCard key={game.id} game={game} featured />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FLASH SALE ===== */}
      <FlashSale />

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialSlider />

      {/* ===== CTA SECTION ===== */}
      {!user && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-dark-800 border border-cyan-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('home.cta.title')}</h2>
                <p className="text-gray-400 max-w-xl mx-auto mb-8">{t('home.cta.desc')}</p>
                <Link href="/auth/register" className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-base">
                  {t('home.cta.btn')} <HiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
