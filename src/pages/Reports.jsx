import React, { useContext, useMemo, useState } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'
import { motion } from 'framer-motion'
import ExpenseAnalysisChart from '../components/ExpenseAnalysisChart'
import HorizontalExpenseChart from '../components/HorizontalExpenseChart'

export default function Reports(){
  const { expenses, profile } = useContext(ExpenseContext)
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const reportData = useMemo(() => {
    const now = new Date()
    let filteredExpenses = expenses

    // Filter by period
    if (selectedPeriod === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      filteredExpenses = expenses.filter(e => new Date(e.date) >= weekAgo)
    } else if (selectedPeriod === 'month') {
      filteredExpenses = expenses.filter(e => {
        const expenseDate = new Date(e.date)
        return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear()
      })
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filteredExpenses = filteredExpenses.filter(e => e.category === selectedCategory)
    }

    // Daily analysis
    const dailyData = {}
    filteredExpenses.forEach(expense => {
      const date = expense.date
      dailyData[date] = (dailyData[date] || 0) + Number(expense.amount)
    })

    // Category breakdown
    const categoryData = {}
    filteredExpenses.forEach(expense => {
      categoryData[expense.category] = (categoryData[expense.category] || 0) + Number(expense.amount)
    })

    const totalAmount = filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0)
    const avgDaily = Object.keys(dailyData).length > 0 ? totalAmount / Object.keys(dailyData).length : 0

    return { dailyData, categoryData, totalAmount, avgDaily, count: filteredExpenses.length }
  }, [expenses, selectedPeriod, selectedCategory])

  const categories = [...new Set(expenses.map(e => e.category))]
  const maxDaily = Math.max(...Object.values(reportData.dailyData), 1)

  const exportCSV = () => {
    const csvContent = [
      ['Date', 'Category', 'Description', 'Amount'],
      ...expenses.map(e => [e.date, e.category, e.description, e.amount])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'expenses.csv'
    a.click()
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-sm text-gray-500">Detailed expense analysis and insights</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={exportCSV} 
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Export CSV
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-medium mb-2">Time Period</label>
          <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
            <option value="week">Last 7 Days</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <label className="block text-sm font-medium mb-2">Category</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
            <option value="all">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        {[
          { label: 'Total Spent', value: `${profile.currency} ${reportData.totalAmount.toLocaleString()}`, delay: 0.8 },
          { label: 'Transactions', value: reportData.count, delay: 0.9 },
          { label: 'Daily Average', value: `${profile.currency} ${Math.round(reportData.avgDaily).toLocaleString()}`, delay: 1.0 },
          { label: 'Categories', value: Object.keys(reportData.categoryData).length, delay: 1.1 }
        ].map((stat, index) => (
          <motion.div 
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: stat.delay }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <h4 className="text-sm text-gray-500">{stat.label}</h4>
            <div className="text-xl font-bold">{stat.value}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <HorizontalExpenseChart />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <ExpenseAnalysisChart />
      </motion.div>


    </motion.div>
  )
}
