import React, { useContext, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ExpenseContext } from '../context/ExpenseContext'

export default function HorizontalExpenseChart() {
  const { expenses, profile } = useContext(ExpenseContext)

  const chartData = useMemo(() => {
    const categoryTotals = {}
    
    expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount
    })

    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
  }, [expenses])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">{label}</p>
          <p className="text-sm text-indigo-600">
            Amount: {profile.currency} {payload[0].value.toLocaleString()}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Category-wise Expense Chart</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
        >
          <defs>
            <linearGradient id="oneroGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <XAxis 
            type="number" 
            stroke="#6B7280"
            fontSize={12}
            tick={{ fill: '#6B7280' }}
          />
          <YAxis 
            dataKey="category" 
            type="category" 
            stroke="#6B7280"
            fontSize={12}
            tick={{ fill: '#374151', fontWeight: 'bold' }}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="amount" 
            fill="url(#oneroGradient)"
            stroke="#6366f1"
            strokeWidth={1}
            radius={[0, 6, 6, 0]}
            background={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}