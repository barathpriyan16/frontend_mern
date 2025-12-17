import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { ExpenseProvider } from './context/ExpenseContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ExpenseProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ExpenseProvider>
    </AuthProvider>
  </React.StrictMode>
)
