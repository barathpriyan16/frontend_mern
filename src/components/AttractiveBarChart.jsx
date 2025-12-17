import React from 'react'
import { motion } from 'framer-motion'

const colorPalette = [
  'from-pink-500 to-rose-500',
  'from-blue-500 to-cyan-500', 
  'from-purple-500 to-indigo-500',
  'from-green-500 to-emerald-500',
  'from-yellow-500 to-orange-500',
  'from-red-500 to-pink-500',
  'from-indigo-500 to-purple-500',
  'from-teal-500 to-green-500'
]

export default function AttractiveBarChart({ data, title, currency = '₹', type = 'daily' }) {
  const maxValue = Math.max(...Object.values(data), 1)
  const entries = Object.entries(data).slice(-10) // Show last 10 entries

  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h3>
      
      <div className="space-y-4">
        {entries.map(([key, value], index) => {
          const percentage = (value / maxValue) * 100
          const colorClass = colorPalette[index % colorPalette.length]
          const displayKey = type === 'daily' ? new Date(key).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : key
          
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {displayKey}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {currency} {value.toLocaleString()}
                </span>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${colorClass} rounded-full relative overflow-hidden group-hover:shadow-lg transition-shadow duration-300`}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    <motion.div
                      animate={{ x: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    />
                  </motion.div>
                </div>
                
                <div className="absolute -top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg">
                  {percentage.toFixed(1)}% of max
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
      
      {entries.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📊</div>
          <p>No data available</p>
        </div>
      )}
    </div>
  )
}