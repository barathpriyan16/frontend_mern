import React from 'react'
import { motion } from 'framer-motion'

export default function ExpenseCard({ expense }){
  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-center">
      <div>
        <div className="text-sm text-gray-500">{expense.date}</div>
        <div className="font-semibold">{expense.category}</div>
        <div className="text-xs text-gray-400">{expense.description}</div>
      </div>
      <div className="text-lg font-bold text-red-500">₹{expense.amount}</div>
    </motion.div>
  )
}
