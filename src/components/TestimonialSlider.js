import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const testimonials = [
  { name: 'Rizky Pratama', nameId: 'Rizky Pratama', text: 'Insane fast. Like literally seconds after payment, diamonds were in my account. Been using this for 3 months, never disappointed.', textId: 'Gila sih ini cepet bangeet. Baru aja transfer, bbrp detik udah masuk diamondnya. Udah langganan 3 bulan, gas terus!', rating: 5, game: 'Mobile Legends' },
  { name: 'Sinta', nameId: 'Sinta', text: '4th time topping up Welkin Moon here. Never failed, always goes through. Admin was super helpful when I chatted them too.', textId: 'Udah kali ke-4 top up Welkin Moon di sini. Gak pernah gagal, masuk terus. Adminnya juga ramah pas chat kemarin. Recommended!', rating: 5, game: 'Genshin Impact' },
  { name: 'Bambang', nameId: 'Bambang', text: 'First time trying, was nervous about scams honestly. But it\'s legit and fast. Definitely coming back tomorrow!', textId: 'Baru pertama nyobain, awalnya ragu soalnya takut penipuan. Tapi ternyata aman dan cepet. Besok top up lagi dah!', rating: 5, game: 'Free Fire' },
  { name: 'Ayu', nameId: 'Ayu', text: '6 months in and never once failed. Always goes through, and prices are better than anywhere else. No complaints!', textId: 'Udah 6 bulan langganan di sini. Gak pernah zonk, selalu masuk. Harga juga lebih miring dari pasar. Mantep!', rating: 5, game: 'PUBG Mobile' },
  { name: 'Dimas', nameId: 'Dimas', text: 'Signed up, got the 5% discount, used it right away for VP. Saved enough for some snacks too lol.', textId: 'Pas daftar dapet diskon langsung dipake buat top up VP. Lumayan hemat 5%, bisa buat jajan lagi wkwk.', rating: 4, game: 'Valorant' },
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
