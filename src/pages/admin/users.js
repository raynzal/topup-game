import { useState, useEffect } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useLanguage } from '@/context/LanguageContext'
import { HiSearch, HiTrash, HiBadgeCheck } from 'react-icons/hi'

export default function AdminUsers() {
  const { t } = useLanguage()
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem('users') || '[]'))
  }, [])

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  const deleteUser = (id) => {
    if (!confirm('Hapus user ini?')) return
    const updated = users.filter(u => u.id !== id)
    setUsers(updated)
    localStorage.setItem('users', JSON.stringify(updated))
  }

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-white">{t('admin.users')}</h1>
            <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari user..." className="bg-dark-800 border border-dark-700 rounded-xl pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/40 w-48" />
            </div>
          </div>

          <div className="bg-dark-800/50 border border-dark-700 rounded-2xl overflow-hidden">
            {filtered.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-700">
                      <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Nama</th>
                      <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Email</th>
                      <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Status</th>
                      <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Bergabung</th>
                      <th className="text-right text-gray-400 text-xs font-medium px-4 py-3">{t('admin.action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(u => (
                      <tr key={u.id} className="border-b border-dark-700 hover:bg-dark-700/30 transition">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                              {u.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <span className="text-white text-sm">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">{u.email}</td>
                        <td className="px-4 py-3">
                          {u.isMember ? (
                            <span className="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 flex items-center gap-1 w-fit">
                              <HiBadgeCheck className="w-3 h-3" /> Member
                            </span>
                          ) : (
                            <span className="text-xs text-gray-500 bg-dark-900 px-2 py-0.5 rounded-full">Regular</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{new Date(u.id).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => deleteUser(u.id)} className="p-1.5 text-gray-500 hover:text-red-400 transition">
                            <HiTrash className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-12">Tidak ada user</p>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
