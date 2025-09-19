import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-brand-500">Pixisphere</Link>
        <nav className="hidden md:flex gap-6 items-center text-sm text-gray-600">
          <a href="#" className="hover:text-brand-500">Explore</a>
          <a href="#" className="hover:text-brand-500">How it works</a>
          <button className="px-3 py-1 bg-brand-500 text-white rounded">Sign in</button>
        </nav>
      </div>
    </header>
  )
}
