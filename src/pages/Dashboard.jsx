import React, { useContext, useMemo } from 'react'
import ChartComponent from '../components/ChartComponent'
import ExpenseList from '../components/ExpenseList'
import { motion } from 'framer-motion'
import { ExpenseContext } from '../context/ExpenseContext'

export default function Dashboard(){
  const { expenses, profile } = useContext(ExpenseContext)
  
  const stats = useMemo(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date)
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
    })
    
    const totalSpent = monthlyExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
    const remaining = profile.budget - totalSpent
    
    // Category breakdown for spending breakdown
    const categoryData = {}
    monthlyExpenses.forEach(expense => {
      categoryData[expense.category] = (categoryData[expense.category] || 0) + Number(expense.amount)
    })
    
    return {
      totalSpent,
      remaining,
      transactions: monthlyExpenses.length,
      categoryData
    }
  }, [expenses, profile.budget])
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.div 
        initial={{ x: -20, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-sm text-gray-500">Overview of recent activity</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="p-4 rounded-xl onero-card"
        >
          <h4 className="text-sm text-gray-500">Total Spent (This Month)</h4>
          <div className="text-2xl font-bold mt-2">{profile.currency} {stats.totalSpent.toLocaleString()}</div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="p-4 rounded-xl onero-card"
        >
          <h4 className="text-sm text-gray-500">Remaining Budget</h4>
          <div className={`text-2xl font-bold mt-2 ${stats.remaining < 0 ? 'text-red-500' : 'text-green-500'}`}>
            {profile.currency} {stats.remaining.toLocaleString()}
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="p-4 rounded-xl onero-card"
        >
          <h4 className="text-sm text-gray-500">Transactions</h4>
          <div className="text-2xl font-bold mt-2">{stats.transactions}</div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.7, duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ChartComponent />
        </motion.div>
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="p-4 rounded-xl onero-card"
        >
          <h3 className="font-semibold mb-4">Spending Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(stats.categoryData).map(([category, amount]) => {
              const percentage = ((amount / stats.totalSpent) * 100).toFixed(1)
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{category}</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{profile.currency} {amount.toLocaleString()} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500" 
                      style={{width: `${percentage}%`}}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.0, duration: 0.5 }}
        className="p-4 rounded-xl onero-card"
      >
        <h3 className="font-semibold mb-4">Recent Transactions</h3>
        <ExpenseList />
      </motion.div>
    </motion.div>
  )
}
