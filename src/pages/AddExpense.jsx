import React, { useState, useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AddExpense(){
  const { addExpense } = useContext(ExpenseContext)
  const [form, setForm] = useState({ amount: '', category: '', description: '', date: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const payload = { amount: Number(form.amount), category: form.category, description: form.description, date: form.date }
      await addExpense(payload)
      nav('/dashboard')
    } catch (error) {
      setError('Failed to add expense. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="max-w-xl"
    >
      <motion.h2 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold mb-4"
      >
        Add Expense
      </motion.h2>
      <motion.form 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onSubmit={submit} 
        className="space-y-4 onero-card p-6 rounded-xl"
      >
        {[
          { label: 'Amount', type: 'number', key: 'amount', required: true, delay: 0.4 },
          { label: 'Category', type: 'text', key: 'category', required: true, delay: 0.5 },
          { label: 'Description', type: 'text', key: 'description', required: false, delay: 0.6 },
          { label: 'Date', type: 'date', key: 'date', required: true, delay: 0.7 }
        ].map((field) => (
          <motion.div 
            key={field.key}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: field.delay }}
          >
            <label className="block text-sm font-medium">{field.label}</label>
            <input 
              required={field.required}
              value={form[field.key]} 
              onChange={e => setForm({...form, [field.key]: e.target.value})} 
              type={field.type} 
              className="mt-1 block w-full rounded-lg border border-indigo-200 dark:border-indigo-700 px-3 py-2 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
            />
          </motion.div>
        ))}
        
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-2"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Expense'}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  )
}
