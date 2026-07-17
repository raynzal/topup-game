import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { HiMenu, HiX, HiSearch, HiChevronDown } from 'react-icons/hi'
import { games } from '@/data/games'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const router = useRouter()
  const { user, logout } = useAuth()
  const { t, lang, toggleLang } = useLanguage()

  const filtered = games.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.nameId.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <nav className="fixed top-0 z-50 w-full bg-dark-900/95 backdrop-blur-md border-b border-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-800 rounded-lg flex items-center justify-center font-bold text-white text-sm group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all">
              ZS
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
              Zall<span className="text-white">Store</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-3 py-2 text-sm text-gray-300 hover:text-blue-400 transition rounded-lg hover:bg-dark-800">
              {t('nav.home')}
            </Link>
            <div className="relative group">
              <button className="px-3 py-2 text-sm text-gray-300 hover:text-blue-400 transition rounded-lg hover:bg-dark-800 flex items-center gap-1">
                {t('nav.games')} <HiChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-dark-800 border border-dark-700 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2 max-h-64 overflow-y-auto">
                  {games.map(g => (
                    <Link key={g.id} href={`/games/${g.id}`} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-dark-700 transition text-sm">
                      <img src={g.image} alt={g.name} className="w-6 h-6 rounded object-cover" />
                      <span className="text-gray-300">{lang === 'id' ? g.nameId : g.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/#promo" className="px-3 py-2 text-sm text-gray-300 hover:text-blue-400 transition rounded-lg hover:bg-dark-800">
              {t('nav.promo')}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-gray-400 hover:text-blue-400 transition rounded-lg hover:bg-dark-800">
              <HiSearch className="w-5 h-5" />
            </button>
            <button onClick={toggleLang} className="px-2 py-1 text-xs font-bold text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition uppercase">
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
            {user ? (
              <div className="relative">
                <button onClick={() => setDropdown(!dropdown)} className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-600/25 transition">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  {user.name}
                </button>
                {dropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-dark-800 border border-dark-700 rounded-xl shadow-2xl py-2">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-700" onClick={() => setDropdown(false)}>{t('nav.profile')}</Link>
                    <Link href="/history" className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-700" onClick={() => setDropdown(false)}>{t('nav.history')}</Link>
                    {user.email === 'admin@topup.com' && (
                      <Link href="/admin" className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-700" onClick={() => setDropdown(false)}>{t('nav.admin')}</Link>
                    )}
                    <hr className="border-dark-700 my-1" />
                    <button onClick={() => { setDropdown(false); logout() }} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-dark-700">{t('nav.logout')}</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="px-4 py-1.5 text-sm text-gray-300 hover:text-white transition">{t('nav.login')}</Link>
                <Link href="/auth/register" className="px-4 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-600/25 transition">{t('nav.register')}</Link>
              </>
            )}
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-400 hover:text-white">
            {open ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-dark-800 bg-dark-900/95 backdrop-blur-md">
          <div className="max-w-3xl mx-auto px-4 py-3">
            <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('nav.search')}
                className="w-full bg-dark-800 border border-dark-700 rounded-xl pl-10 pr-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                autoFocus
              />
            </div>
            {search && (
              <div className="mt-2 bg-dark-800 border border-dark-700 rounded-xl overflow-hidden">
                {filtered.length > 0 ? filtered.slice(0, 5).map(g => (
                  <Link key={g.id} href={`/games/${g.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-dark-700 transition" onClick={() => { setSearchOpen(false); setSearch('') }}>
                    <img src={g.image} alt={g.name} className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm text-gray-200">{lang === 'id' ? g.nameId : g.name}</p>
                      <p className="text-xs text-gray-500">{g.category}</p>
                    </div>
                  </Link>
                )) : (
                  <p className="px-4 py-3 text-sm text-gray-500">Game tidak ditemukan</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {open && (
        <div className="md:hidden border-t border-dark-800 bg-dark-900/95 backdrop-blur-md">
          <div className="px-4 py-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-gray-300 hover:bg-dark-800 rounded-lg" onClick={() => setOpen(false)}>{t('nav.home')}</Link>
            <div className="px-3 py-2 text-gray-300 font-medium">{t('nav.games')}</div>
            <div className="pl-4 space-y-1 max-h-48 overflow-y-auto">
              {games.map(g => (
                <Link key={g.id} href={`/games/${g.id}`} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-dark-800 rounded-lg" onClick={() => setOpen(false)}>
                  <img src={g.image} alt={g.name} className="w-5 h-5 rounded object-cover" />
                  {lang === 'id' ? g.nameId : g.name}
                </Link>
              ))}
            </div>
            <Link href="/#promo" className="block px-3 py-2 text-gray-300 hover:bg-dark-800 rounded-lg" onClick={() => setOpen(false)}>{t('nav.promo')}</Link>
            <hr className="border-dark-700 my-2" />
            {user ? (
              <>
                <Link href="/profile" className="block px-3 py-2 text-gray-300 hover:bg-dark-800 rounded-lg" onClick={() => setOpen(false)}>{t('nav.profile')}</Link>
                <Link href="/history" className="block px-3 py-2 text-gray-300 hover:bg-dark-800 rounded-lg" onClick={() => setOpen(false)}>{t('nav.history')}</Link>
                <button onClick={() => { setOpen(false); logout() }} className="block w-full text-left px-3 py-2 text-red-400 hover:bg-dark-800 rounded-lg">{t('nav.logout')}</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="block px-3 py-2 text-gray-300 hover:bg-dark-800 rounded-lg" onClick={() => setOpen(false)}>{t('nav.login')}</Link>
                <Link href="/auth/register" className="block px-3 py-2 text-blue-400 hover:bg-dark-800 rounded-lg" onClick={() => setOpen(false)}>{t('nav.register')}</Link>
              </>
            )}
            <button onClick={toggleLang} className="w-full text-left px-3 py-2 text-gray-300 hover:bg-dark-800 rounded-lg">
              {lang === 'id' ? 'English' : 'Indonesia'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
