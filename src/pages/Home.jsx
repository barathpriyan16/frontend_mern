import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home(){
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <motion.div initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} className="text-center p-8 rounded-xl bg-gradient-to-b from-primary/80 to-accent/60 text-white shadow-lg max-w-3xl">
        <h1 className="text-4xl font-bold mb-2">Expense Tracker Pro</h1>
        <p className="mb-4 opacity-90">A modern expense manager with analytics, monthly budgets and beautiful UI.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/dashboard" className="px-5 py-2 rounded-lg bg-white text-primary font-semibold">Open Dashboard</Link>
          <Link to="/add" className="px-5 py-2 rounded-lg bg-white/20 border border-white/30">Add Expense</Link>
        </div>
      </motion.div>
    </div>
  )
}
