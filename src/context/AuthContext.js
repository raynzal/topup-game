import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { setUser(null) }
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { success: false, error: 'Email atau password salah' }
    const userData = { id: found.id, name: found.name, email: found.email, isMember: true }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return { success: true }
  }

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(u => u.email === email)) return { success: false, error: 'Email sudah terdaftar' }
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      isMember: true,
      points: 0,
      createdAt: new Date().toISOString()
    }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    const userData = { id: newUser.id, name: newUser.name, email: newUser.email, isMember: true }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    router.push('/')
  }

  const getOrders = () => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    return orders.filter(o => o.userId === user?.id)
  }

  const addOrder = (order) => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const newOrder = { ...order, id: Date.now().toString(), userId: user?.id, date: new Date().toISOString() }
    orders.push(newOrder)
    localStorage.setItem('orders', JSON.stringify(orders))
  }

  return (
    <AuthContext.Provider value={{
      user, loading, login, register, logout, getOrders, addOrder
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
