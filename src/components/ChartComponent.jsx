import React, { useContext, useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import { ExpenseContext } from '../context/ExpenseContext'
import { motion } from 'framer-motion'

const ONERO_COLORS = ["#6366F1", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EC4899", "#8B5A2B", "#6B7280"]

export default function ChartComponent(){
  const { expenses } = useContext(ExpenseContext)

  const data = useMemo(() => {
    const grouped = expenses.reduce((acc, cur) => {
      acc[cur.category] = (acc[cur.category] || 0) + Number(cur.amount)
      return acc
    }, {})
    const total = Object.values(grouped).reduce((sum, val) => sum + val, 0)
    return Object.keys(grouped).map((k,i) => ({ 
      name: k, 
      value: grouped[k], 
      color: ONERO_COLORS[i % ONERO_COLORS.length],
      percentage: ((grouped[k] / total) * 100).toFixed(1)
    }))
  }, [expenses])

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-indigo-200 dark:border-indigo-700"
        >
          <p className="font-medium text-gray-900 dark:text-white">{payload[0].name}</p>
          <p className="text-sm text-indigo-600 dark:text-indigo-400">
            Amount: ₹ {payload[0].value.toLocaleString()}
          </p>
        </motion.div>
      )
    }
    return null
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 onero-card rounded-xl"
    >
      <motion.h3 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-semibold mb-4 text-gray-900 dark:text-white"
      >
        Category Distribution
      </motion.h3>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ width: '100%', height: 260 }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie 
              data={data} 
              dataKey="value" 
              nameKey="name" 
              outerRadius={80} 
              isAnimationActive 
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-out"
              label={({ percentage }) => `${percentage}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke={entry.color}
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  )
}
