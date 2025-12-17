import React from 'react'
import { NavLink } from 'react-router-dom'

const nav = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/add', label: 'Add Expense' },
  { to: '/reports', label: 'Reports' },
  { to: '/profile', label: 'Profile' }
]

export default function Sidebar(){
  return (
    <aside className="w-20 md:w-64 bg-gradient-to-b from-white/50 to-white/10 dark:from-gray-900/60 dark:to-gray-900/40 p-4 border-r border-gray-200 dark:border-gray-800">
      <div className="hidden md:block mb-6">
        <h2 className="font-bold text-lg">Menu</h2>
      </div>
      <nav className="flex flex-col gap-2">
        {nav.map(item => (
          <NavLink key={item.to} to={item.to} className={({isActive}) => `px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive? 'bg-gray-200 dark:bg-gray-700':''}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
