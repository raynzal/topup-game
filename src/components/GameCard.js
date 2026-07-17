import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { HiFire } from 'react-icons/hi'

export default function GameCard({ game, featured }) {
  const { t, lang } = useLanguage()

  return (
    <Link href={`/games/${game.id}`}>
      <div className={`group relative overflow-hidden rounded-2xl bg-dark-800 border border-dark-700 hover:border-blue-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 ${featured ? 'h-80' : 'h-64'}`}>
        <img src={game.image} alt={game.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className={`absolute inset-0 bg-gradient-to-br ${game.bgColor} mix-blend-overlay opacity-40`} />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
        <div className="relative h-full flex flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] font-semibold text-white/90 bg-white/15 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/20">
                {game.category}
              </span>
              {game.popular && (
                <span className="text-[10px] font-semibold text-orange-300 bg-orange-500/20 px-2 py-0.5 rounded-full backdrop-blur-sm border border-orange-400/20 flex items-center gap-0.5">
                  <HiFire className="w-2.5 h-2.5" /> #{t('product.popular')}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-end gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white font-bold text-lg border border-white/30 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {game.logo}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white drop-shadow-lg">
                  {lang === 'id' ? game.nameId : game.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-[9px] ${i < Math.floor(game.rating) ? 'text-yellow-300' : 'text-white/30'}`}>★</span>
                    ))}
                  </div>
                  <span className="text-white/60 text-[10px]">{game.rating}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-white/70 line-clamp-1 drop-shadow-md">
              {lang === 'id' ? game.descriptionId : game.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
