import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import ClockInOut from './pages/ClockInOut'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/clock" element={<ClockInOut />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App