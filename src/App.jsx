import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CategoryPage from './pages/CategoryPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        
        <Route path="/photographer/:id" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}
