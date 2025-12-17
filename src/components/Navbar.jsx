import React, { useContext } from 'react'
import ThemeToggle from './ThemeToggle'
import { Link, NavLink } from 'react-router-dom'
import { ExpenseContext } from '../context/ExpenseContext'
import { motion } from 'framer-motion'

const navigationItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/add', label: 'Add Expense' },
  { to: '/reports', label: 'Reports' }
]

export default function Navbar(){
  const { profile } = useContext(ExpenseContext)
  
  return (
    <header className="flex items-center justify-between px-6 py-3 onero-card backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          ExpenseTracker<span className="text-cyan-500">Pro</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navigationItems.map(item => (
            <motion.div key={item.to} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <NavLink 
                to={item.to} 
                className={({isActive}) => 
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 shadow-sm' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
          <NavLink 
            to="/profile" 
            className={({isActive}) => 
              `flex items-center gap-2 px-2 py-1 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 shadow-sm' 
                  : 'hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
              }`
            }
          >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            {profile.profileImage ? (
              <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                👤
              </div>
            )}
          </div>
            <span className="hidden md:inline text-sm font-medium">{profile.name}</span>
          </NavLink>
        </motion.div>
      </div>
    </header>
  )
}
