import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { HiMail, HiLockClosed, HiUser, HiEye, HiEyeOff, HiGift } from 'react-icons/hi'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const { register } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault(); setError('')
    if (password !== confirm) { setError('Password tidak cocok'); return }
    if (password.length < 6) { setError('Password minimal 6 karakter'); return }
    const result = register(name, email, password)
    if (result.success) {
      router.push('/')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
            <span className="text-2xl font-bold text-white">ZS</span>
          </div>
          <h1 className="text-2xl font-bold text-white">{t('auth.register.title')}</h1>
          <p className="text-gray-500 text-sm mt-1">{t('auth.register.subtitle')}</p>
          <div className="flex items-center justify-center gap-1 mt-2 text-green-400 text-xs">
            <HiGift className="w-3 h-3" /> Diskon 5% untuk semua member!
          </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-dark-800 border border-dark-700 rounded-3xl p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">{error}</div>
          )}
          <div>
            <label className="text-gray-400 text-sm block mb-1.5">{t('auth.name')}</label>
            <div className="relative">
              <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('auth.name.placeholder')} className="input-field pl-10" required />
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-1.5">{t('auth.email')}</label>
            <div className="relative">
              <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t('auth.email.placeholder')} className="input-field pl-10" required />
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-1.5">{t('auth.password')}</label>
            <div className="relative">
              <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={t('auth.password.placeholder')} className="input-field pl-10 pr-10" required />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showPw ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-1.5">{t('auth.confirmPassword')}</label>
            <div className="relative">
              <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input type={showPw ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder={t('auth.confirmPassword.placeholder')} className="input-field pl-10" required />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full py-3 text-sm">{t('auth.register.btn')}</button>
          <p className="text-center text-gray-500 text-sm">
            {t('auth.register.haveAccount')}{' '}
            <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300">{t('auth.register.link')}</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
