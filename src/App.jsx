import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import Dashboard from './pages/dashboard/Dashboard'

const App = () => {
  const [authenticated, setAuthenticated] = useState(true)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    setAuthenticated(!!token)
  }, [])

  const ProtectedRoute = ({ children }) => {
    const authenticated = true; //test
    return authenticated ? children : <Navigate to="/login" />
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
