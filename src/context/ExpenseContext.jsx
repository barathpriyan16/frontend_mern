import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react'
import { expenseAPI, authAPI } from '../services/api'

export const ExpenseContext = createContext()

const defaultProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  profileImage: null,
  budget: 20000,
  currency: '₹'
}

export function ExpenseProvider({ children }){
  const [expenses, setExpenses] = useState([])
  const [profile, setProfile] = useState(defaultProfile)
  const [loading, setLoading] = useState(false)

  // Get current user from localStorage
  const getCurrentUser = () => {
    try {
      const authUser = localStorage.getItem('etp_user')
      return authUser ? JSON.parse(authUser) : null
    } catch (e) {
      return null
    }
  }

  // Load expenses from backend
  const loadExpenses = useCallback(async () => {
    const user = getCurrentUser()
    if (!user?._id) return
    
    try {
      setLoading(true)
      const expenses = await expenseAPI.getExpenses(user._id)
      setExpenses(expenses)
    } catch (error) {
      console.error('Failed to load expenses:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Sync profile with auth user data
  React.useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setProfile({
        name: user.name || defaultProfile.name,
        email: user.email || defaultProfile.email,
        profileImage: null,
        budget: user.budget || defaultProfile.budget,
        currency: user.currency || defaultProfile.currency
      })
      loadExpenses()
    }
  }, [])

  const addExpense = useCallback(async (expense) => {
    const user = getCurrentUser()
    if (!user?._id) return
    
    try {
      const response = await expenseAPI.createExpense(user._id, expense)
      setExpenses(prev => [response.expense, ...prev])
      return response.expense
    } catch (error) {
      console.error('Failed to add expense:', error)
      throw error
    }
  }, [])

  const updateExpense = useCallback(async (id, changes) => {
    try {
      const response = await expenseAPI.updateExpense(id, changes)
      setExpenses(prev => prev.map(p => p._id === id ? response.expense : p))
      return response.expense
    } catch (error) {
      console.error('Failed to update expense:', error)
      throw error
    }
  }, [])

  const removeExpense = useCallback(async (id) => {
    try {
      await expenseAPI.deleteExpense(id)
      setExpenses(prev => prev.filter(p => p._id !== id))
    } catch (error) {
      console.error('Failed to delete expense:', error)
      throw error
    }
  }, [])

  const updateProfile = useCallback(async (updates) => {
    const user = getCurrentUser()
    if (!user?._id) return
    
    try {
      const response = await authAPI.updateUser(user._id, updates)
      setProfile(prev => ({...prev, ...updates}))
      
      // Update localStorage with new user data
      const updatedUser = { ...user, ...updates }
      localStorage.setItem('etp_user', JSON.stringify(updatedUser))
      
      return response.user
    } catch (error) {
      console.error('Failed to update profile:', error)
      throw error
    }
  }, [])

  // Memoize the context value to prevent unnecessary rerenders
  const value = useMemo(() => ({
    expenses,
    addExpense,
    updateExpense,
    removeExpense,
    profile,
    updateProfile,
    loading,
    loadExpenses
  }), [expenses, addExpense, updateExpense, removeExpense, profile, updateProfile, loading, loadExpenses])

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  )
}
