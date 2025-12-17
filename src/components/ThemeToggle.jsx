import React, { useEffect, useState } from 'react'

export default function ThemeToggle(){
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('etp_theme')
      if (saved) return saved === 'dark'
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      return false
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')
    try { localStorage.setItem('etp_theme', isDark ? 'dark' : 'light') } catch {}
  }, [isDark])

  return (
    <button onClick={() => setIsDark(prev => !prev)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Toggle theme">
      {isDark ? '🌙' : '☀️'}
    </button>
  )
}
