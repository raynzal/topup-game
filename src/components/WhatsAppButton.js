import { useLanguage } from '@/context/LanguageContext'
import { HiChat } from 'react-icons/hi'

export default function WhatsAppButton() {
  const { t } = useLanguage()
  const phone = '6281234567890'
  const msg = encodeURIComponent('Halo ZallStore, saya mau tanya-tanya tentang top up...')

  return (
    <a
      href={`https://wa.me/${phone}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 group animate-slide-up"
    >
      <HiChat className="w-5 h-5" />
      <span className="text-sm font-medium hidden sm:block">{t('whatsapp.chat')}</span>
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
    </a>
  )
}
