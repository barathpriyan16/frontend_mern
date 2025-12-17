import React from 'react'
import { motion } from 'framer-motion'

export default function LineChart({ data, title, currency = '₹', height = 200 }) {
  const entries = Object.entries(data).slice(-14) // Show last 14 days
  const values = entries.map(([, value]) => value)
  const maxValue = Math.max(...values, 1)
  const minValue = Math.min(...values, 0)
  const range = maxValue - minValue || 1

  const getY = (value) => {
    return height - ((value - minValue) / range) * (height - 40)
  }

  const pathData = entries.map(([key, value], index) => {
    const x = (index / (entries.length - 1)) * 100
    const y = ((maxValue - value) / range) * 80 + 10
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')

  return (
    <div className="p-6 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl shadow-lg border border-blue-100 dark:border-blue-800/30">
      <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        {title}
      </h3>
      
      <div className="relative" style={{ height: `${height}px` }}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Grid */}
          {[20, 40, 60, 80].map(y => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="currentColor" strokeWidth="0.1" opacity="0.2" />
          ))}
          
          {/* Area under curve */}
          {entries.length > 1 && (
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              d={`${pathData} L 100 90 L 0 90 Z`}
              fill="url(#areaGradient)"
            />
          )}
          
          {/* Main line */}
          {entries.length > 1 && (
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d={pathData}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          
          {/* Data points */}
          {entries.map(([key, value], index) => {
            const x = (index / (entries.length - 1)) * 100
            const y = ((maxValue - value) / range) * 80 + 10
            return (
              <motion.g key={key}>
                <motion.circle
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 1 }}
                  cx={x}
                  cy={y}
                  r="1"
                  fill="#3B82F6"
                  className="hover:r-2 transition-all duration-200"
                />
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 1.2 }}
                  cx={x}
                  cy={y}
                  r="0.5"
                  fill="white"
                />
              </motion.g>
            )
          })}
        </svg>
        
        {/* Hover tooltips */}
        <div className="absolute inset-0 flex">
          {entries.map(([key, value], index) => (
            <div
              key={key}
              className="flex-1 relative group cursor-pointer"
              style={{ left: `${(index / (entries.length - 1)) * 100}%` }}
            >
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                <div className="font-medium">{new Date(key).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                <div>{currency} {value.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        {entries.filter((_, i) => i % Math.ceil(entries.length / 4) === 0).map(([key]) => (
          <span key={key}>
            {new Date(key).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        ))}
      </div>
      
      {entries.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-2">📈</div>
            <p>No trend data available</p>
          </div>
        </div>
      )}
    </div>
  )
}