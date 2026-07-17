import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { HiChevronDown, HiQuestionMarkCircle } from 'react-icons/hi'

const faqs = {
  id: [
    { q: 'Cara top up-nya gimana?', a: 'Pilih game, pilih paket, masukin ID game, bayar — selesai. Diamond langsung masuk dalam hitungan detik.' },
    { q: 'Berapa lama prosesnya?', a: 'Paling cepet 1-5 detik. Paling lama 5 menit. Kalau lebih dari itu, chat admin aja langsung.' },
    { q: 'Pembayaran apa aja yang tersedia?', a: 'GoPay, OVO, DANA, ShopeePay, LinkAja, Transfer Bank (BCA/Mandiri/BNI/BRI), Alfamart, Indomaret, QRIS.' },
    { q: 'Gimana kalo top up gagal?', a: 'Dijamin uang balik 100% kalo top up gagal. Tinggal chat admin, kami proses refund.' },
    { q: 'Apakah ada minimal top up?', a: 'Gak ada. Mau top up Rp 5.000 juga boleh. Yang penting gas!' },
    { q: 'Apakah aman?', a: 'Aman banget. Ribuan customer udah buktiin. Data kamu dienkripsi dan kami gak nyimpen informasi penting.' },
    { q: 'Gimana cara cek status pesanan?', a: 'Buka menu Riwayat di profil kamu. Status transaksi langsung keliatan di situ.' },
    { q: 'Apakah bisa top up buat temen?', a: 'Bisa tinggal masukin ID game temen kamu di kolom ID Game. Ganti nickname sesuai temenmu.' },
  ],
  en: [
    { q: 'How do I top up?', a: 'Pick a game, pick a pack, enter your game ID, pay — done. Diamonds show up in seconds.' },
    { q: 'How long does it take?', a: 'Fastest is 1-5 seconds. Longest is 5 minutes. If it takes longer, just chat our admin.' },
    { q: 'What payment methods are available?', a: 'GoPay, OVO, DANA, ShopeePay, LinkAja, Bank Transfer (BCA/Mandiri/BNI/BRI), Alfamart, Indomaret, QRIS.' },
    { q: 'What if the top up fails?', a: '100% money-back guarantee if the top up fails. Just chat admin and we\'ll process a refund.' },
    { q: 'Is there a minimum top up?', a: 'Nope. Want to top up Rp 5,000? Go for it. Every bit counts!' },
    { q: 'Is it safe?', a: 'Absolutely. Thousands of customers have proven it. Your data is encrypted and we don\'t store sensitive info.' },
    { q: 'How do I check my order status?', a: 'Open the History page in your profile. Transaction status is shown there.' },
    { q: 'Can I top up for a friend?', a: 'Yes! Just enter your friend\'s game ID in the Game ID field and put their nickname.' },
  ]
}

export default function FAQ() {
  const { t, lang } = useLanguage()
  const [open, setOpen] = useState(null)
  const data = faqs[lang] || faqs.id

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <HiQuestionMarkCircle className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {lang === 'id' ? 'Pertanyaan Umum (FAQ)' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-gray-400">
            {lang === 'id' ? 'Yang sering ditanyakan sama gamers lain:' : 'What other gamers usually ask:'}
          </p>
        </div>

        <div className="space-y-3">
          {data.map((faq, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden transition-all duration-300">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-white font-medium text-sm md:text-base pr-4">{faq.q}</span>
                <HiChevronDown className={`w-5 h-5 text-cyan-400 transition flex-shrink-0 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  <div className="mt-3 flex gap-2">
                    <Link href="/" className="text-xs text-cyan-400 hover:underline">{lang === 'id' ? 'Mulai Top Up' : 'Start Top Up'}</Link>
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="text-xs text-green-400 hover:underline">
                      {lang === 'id' ? 'Chat Admin' : 'Chat Admin'}
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
