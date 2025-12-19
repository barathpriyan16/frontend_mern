import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    try {
      const savedUser = localStorage.getItem('etp_user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (e) {
      // ignore errors
    }
    setIsLoading(false)

    // Listen for user updates from other components
    const handleUserUpdate = (event) => {
      setUser(event.detail)
    }

    window.addEventListener('userUpdated', handleUserUpdate)
    return () => window.removeEventListener('userUpdated', handleUserUpdate)
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('etp_user', JSON.stringify(userData))
    // Trigger storage event for other components to update
    window.dispatchEvent(new Event('storage'))
  }

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem('etp_user', JSON.stringify(updatedUser))
    window.dispatchEvent(new Event('storage'))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('etp_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}