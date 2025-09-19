import React from 'react'
import { usePhotographers } from '../context/PhotographerContext'

export default function SearchBar(){
  const { search, setSearch } = usePhotographers()
  return (
    <div className="w-full">
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by name, city or tag (e.g. maternity, candid)..."
        className="w-full md:w-3/4 lg:w-1/2 px-4 py-3 rounded-md border border-gray-200 shadow-sm focus:outline-none"
      />
    </div>
  )
}
