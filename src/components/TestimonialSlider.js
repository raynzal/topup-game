import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const testimonials = [
  { name: 'Rizky Pratama', nameId: 'Rizky Pratama', text: 'Top up MLBB cuma 5 detik langsung masuk! Harganya juga lebih murah dari yang lain. Recommended banget!', textId: 'Top up MLBB cuma 5 detik langsung masuk! Harganya juga lebih murah dari yang lain. Recommended banget!', rating: 5, game: 'Mobile Legends' },
  { name: 'Sinta Dewi', nameId: 'Sinta Dewi', text: 'Pelayanan cepat dan ramah. Top up Genshin Impact saya selalu di sini. Trusted!', textId: 'Pelayanan cepat dan ramah. Top up Genshin Impact saya selalu di sini. Trusted!', rating: 5, game: 'Genshin Impact' },
  { name: 'Bambang', nameId: 'Bambang', text: 'Baru pertama kali top up di sini, prosesnya gampang banget. Customer service-nya fast respon!', textId: 'Baru pertama kali top up di sini, prosesnya gampang banget. Customer service-nya fast respon!', rating: 5, game: 'Free Fire' },
  { name: 'Ayu Lestari', nameId: 'Ayu Lestari', text: 'Sudah jadi langganan sejak 6 bulan lalu. Gak pernah mengecewakan. Top up selalu masuk!', textId: 'Sudah jadi langganan sejak 6 bulan lalu. Gak pernah mengecewakan. Top up selalu masuk!', rating: 5, game: 'PUBG Mobile' },
  { name: 'Dimas Saputra', nameId: 'Dimas Saputra', text: 'Diskon member-nya worth banget! Setiap top up jadi lebih hemat. Thank you TopUp Game!', textId: 'Diskon member-nya worth banget! Setiap top up jadi lebih hemat. Thank you TopUp Game!', rating: 4, game: 'Valorant' },
]

export default function TestimonialSlider() {
  const { t, lang } = useLanguage()
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(c => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent(c => (c === testimonials.length - 1 ? 0 : c + 1))

  const tst = testimonials[current]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white">{t('testimonial.title')}</h2>
          <p className="text-gray-500 mt-2">{t('testimonial.subtitle')}</p>
        </div>
        <div className="max-w-3xl mx-auto relative">
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-2 bg-dark-800 border border-dark-700 rounded-full text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition z-10">
            <HiChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-2 bg-dark-800 border border-dark-700 rounded-full text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition z-10">
            <HiChevronRight className="w-5 h-5" />
          </button>
          <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-8 md:p-10 text-center relative">
            <div className="absolute top-6 left-6 text-5xl text-cyan-500/20 font-serif leading-none">&ldquo;</div>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <HiStar key={i} className={`w-5 h-5 ${i < tst.rating ? 'text-yellow-400' : 'text-gray-600'}`} />
              ))}
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
              &ldquo;{lang === 'id' ? tst.textId : tst.text}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                {tst.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-white font-medium text-sm">{lang === 'id' ? tst.nameId : tst.name}</p>
                <p className="text-gray-500 text-xs">Top up {tst.game}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition ${i === current ? 'bg-cyan-400 w-6' : 'bg-dark-600 hover:bg-dark-500'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
