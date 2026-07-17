import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { games } from '@/data/games'
import GameCard from '@/components/GameCard'
import FlashSale from '@/components/FlashSale'
import TestimonialSlider from '@/components/TestimonialSlider'
import { HiLightningBolt, HiCash, HiShieldCheck, HiSupport, HiArrowRight, HiChevronRight, HiFire } from 'react-icons/hi'

const carouselImages = [
  '/images/mobile-legends.webp',
  '/images/free-fire.png',
  '/images/pubg-mobile.jpeg',
  '/images/valorant.jpg',
  '/images/cod-mobile.jpg',
]

export default function Home() {
  const { t, lang } = useLanguage()
  const { user } = useAuth()
  const [filter, setFilter] = useState('all')
  const [slide, setSlide] = useState(0)
  const [wordIdx, setWordIdx] = useState(0)

  const rotatingWords = lang === 'id'
    ? [{ text: 'Murah', color: 'text-blue-400' }, { text: 'Cepet', color: 'text-white' }, { text: 'Aman', color: 'text-blue-300' }]
    : [{ text: 'Cheap', color: 'text-blue-400' }, { text: 'Fast', color: 'text-white' }, { text: 'Safe', color: 'text-blue-300' }]

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide(s => (s + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx(i => (i + 1) % rotatingWords.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [rotatingWords.length])

  const popular = games.filter(g => g.popular)
  const filtered = filter === 'all' ? games : games.filter(g => g.category === filter)
  const categories = [...new Set(games.map(g => g.category))]

  return (
    <div className="animate-fade-in">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {carouselImages.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${i === slide ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/95 via-dark-900/90 to-dark-950/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-dark-950/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-500/15 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/30">
                  #1 Top Up Indonesia
                </span>
                <span className="px-3 py-1 bg-white/10 text-white/80 text-xs font-semibold rounded-full border border-white/20 flex items-center gap-1">
                  <HiFire className="w-3 h-3" /> 100K+ Pelanggan
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                {lang === 'id' ? 'Top Up Gas!' : 'Top Up? Let\'s Go!'}
              </h1>
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 h-12 md:h-14 overflow-hidden">
                <span className={`inline-block transition-all duration-500 ${rotatingWords[wordIdx].color}`}
                  style={{
                    animation: 'none',
                    transform: `translateY(0)`,
                    opacity: 1,
                  }}
                  key={wordIdx}
                >
                  <span className="inline-block animate-slide-up">{rotatingWords[wordIdx].text}</span>
                </span>
                <span className="text-gray-300 font-extrabold ml-2">
                  {lang === 'id' ? 'No.1 Top Up Indonesia' : 'Indonesia\'s Top Up Hub'}
                </span>
              </div>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#games" className="btn-primary px-6 py-3 flex items-center gap-2 text-base">
                  {t('hero.cta')} <HiArrowRight className="w-4 h-4" />
                </Link>
                {!user && (
                  <Link href="/auth/register" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-xl px-6 py-3 flex items-center gap-2 text-base hover:bg-white/20 transition-all duration-300">
                    {t('hero.cta2')}
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-800 border-2 border-dark-900 flex items-center justify-center text-[9px] text-white font-bold">
                      {String.fromCharCode(64+i)}
                    </div>
                  ))}
                </div>
                <p className="text-gray-400 text-sm">Trusted by <span className="text-white font-semibold">10,000+</span> gamers</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="w-80 h-80 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-800 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
                <div className="relative w-80 h-80 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm bg-white/5">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-blue-800 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/30">
                      <span className="text-3xl font-extrabold text-white">ZS</span>
                    </div>
                    <p className="text-white font-bold text-lg">ZallStore</p>
                    <p className="text-gray-400 text-sm">No.1 Top Up Indonesia</p>
                  </div>
                </div>
                <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '12s' }}>
                  {['ML', 'FF', 'PUBG', 'GI', 'VL'].map((label, i) => {
                    const angles = [0, 72, 144, 216, 288]
                    const rad = (angles[i] * Math.PI) / 180
                    const r = 160
                    const x = Math.cos(rad) * r
                    const y = Math.sin(rad) * r
                    return (
                      <div key={i} className="absolute w-11 h-11 bg-dark-800/90 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center text-[9px] text-white font-bold shadow-lg hover:scale-110 transition-transform" style={{ left: `calc(50% + ${x}px - 22px)`, top: `calc(50% + ${y}px - 22px)` }}>
                        {label}
                      </div>
                    )
                  })}
                </div>
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
              { icon: HiLightningBolt, title: t('feature.instant'), desc: t('feature.instant.desc'), color: 'from-blue-400 to-blue-600' },
              { icon: HiCash, title: t('feature.price'), desc: t('feature.price.desc'), color: 'from-blue-500 to-blue-800' },
              { icon: HiShieldCheck, title: t('feature.secure'), desc: t('feature.secure.desc'), color: 'from-blue-400 to-indigo-600' },
              { icon: HiSupport, title: t('feature.support'), desc: t('feature.support.desc'), color: 'from-blue-600 to-blue-900' },
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
              <button onClick={() => setFilter('all')} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-dark-800 text-gray-400 hover:text-blue-400 border border-dark-700'}`}>
                {t('games.all')}
              </button>
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${filter === cat ? 'bg-blue-600 text-white' : 'bg-dark-800 text-gray-400 hover:text-blue-400 border border-dark-700'}`}>
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
              <HiFire className="w-5 h-5 text-blue-400" /> {t('games.popular')}
            </h2>
            <Link href="#games" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
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
            <div className="bg-gradient-to-r from-blue-600/20 via-blue-800/10 to-dark-800 border border-blue-500/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
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
