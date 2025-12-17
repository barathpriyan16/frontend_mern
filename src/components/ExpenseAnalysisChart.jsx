import React, { useContext, useMemo } from 'react'
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ExpenseContext } from '../context/ExpenseContext'

export default function ExpenseAnalysisChart() {
  const { expenses, profile } = useContext(ExpenseContext)

  const chartData = useMemo(() => {
    const categoryStats = {}
    
    expenses.forEach(expense => {
      if (!categoryStats[expense.category]) {
        categoryStats[expense.category] = {
          category: expense.category,
          totalAmount: 0,
          transactionCount: 0
        }
      }
      categoryStats[expense.category].totalAmount += expense.amount
      categoryStats[expense.category].transactionCount += 1
    })

    return Object.values(categoryStats)
  }, [expenses])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey === 'totalAmount' 
                ? `Amount: ${profile.currency} ${entry.value.toLocaleString()}`
                : `Transactions: ${entry.value}`
              }
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Expense Analysis</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis 
            dataKey="category" 
            stroke="#6B7280"
            fontSize={12}
            tick={{ fill: '#6B7280' }}
          />
          <YAxis 
            yAxisId="amount"
            orientation="left"
            stroke="#3B82F6"
            fontSize={12}
            tick={{ fill: '#3B82F6' }}
          />
          <YAxis 
            yAxisId="count"
            orientation="right"
            stroke="#EF4444"
            fontSize={12}
            tick={{ fill: '#EF4444' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            yAxisId="amount"
            dataKey="totalAmount" 
            fill="#3B82F6"
            name="Total Amount"
            radius={[4, 4, 0, 0]}
          />
          <Line 
            yAxisId="count"
            type="monotone" 
            dataKey="transactionCount" 
            stroke="#EF4444"
            strokeWidth={3}
            dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
            name="Transaction Count"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}