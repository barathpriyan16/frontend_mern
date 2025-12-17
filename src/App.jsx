import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AddExpense from './pages/AddExpense'
import Reports from './pages/Reports'
import Profile from './pages/Profile'
import Auth from './pages/Auth'

export default function App() {
  const { user, login, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Auth onLogin={login} />
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add" element={<AddExpense />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}
