import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { games } from '@/data/games'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'

export default function Footer() {
  const { t, lang } = useLanguage()
  const featured = games.filter(g => g.popular).slice(0, 6)

  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">
              ZS
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Zall<span className="text-white">Store</span>
            </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{t('footer.desc')}</p>
            <div className="flex gap-3 mt-4">
              {['M', 'T', 'Y', 'I'].map((letter, i) => (
                <div key={i} className="w-8 h-8 bg-dark-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-400 transition cursor-pointer text-xs font-bold">
                  {letter}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {[{ href: '/', label: 'nav.home' }, { href: '/#games', label: 'nav.games' }, { href: '/#promo', label: 'nav.promo' }, { href: '/faq', label: 'FAQ' }, { href: '/auth/register', label: 'nav.register' }, { href: '/auth/login', label: 'nav.login' }, { href: '/admin', label: 'nav.admin' }].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-500 hover:text-cyan-400 transition text-sm">{t(link.label)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.games')}</h3>
            <ul className="space-y-2">
              {featured.map(g => (
                <li key={g.id}>
                  <Link href={`/games/${g.id}`} className="text-gray-500 hover:text-cyan-400 transition text-sm">
                    {lang === 'id' ? g.nameId : g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-500 text-sm">
                <HiMail className="w-4 h-4 text-cyan-400" />
                support@zallstore.com
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm">
                <HiPhone className="w-4 h-4 text-cyan-400" />
                +62 812-3456-7890
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm">
                <HiLocationMarker className="w-4 h-4 text-cyan-400" />
                Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">© 2024 ZallStore. {t('footer.rights')}</p>
          <div className="flex gap-4 text-sm">
            <Link href="#" className="text-gray-600 hover:text-cyan-400 transition">{t('footer.tos')}</Link>
            <Link href="#" className="text-gray-600 hover:text-cyan-400 transition">{t('footer.privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
