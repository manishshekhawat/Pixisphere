import React from 'react'
import { usePhotographers } from '../context/PhotographerContext'

function Checkbox({ label, checked, onChange }){
  return (
    <label className="inline-flex items-center gap-2">
      <input type="checkbox" checked={checked} onChange={onChange} className="form-checkbox h-4 w-4" />
      <span className="text-sm">{label}</span>
    </label>
  )
}

export default function Filters(){
  const {
    styles, cities,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    ratingFilter, setRatingFilter,
    selectedStyles, setSelectedStyles,
    city, setCity,
    sortBy, setSortBy
  } = usePhotographers()

  function toggleStyle(s){
    setSelectedStyles(ss => ss.includes(s) ? ss.filter(x => x !== s) : [...ss, s])
  }

  return (
    <aside className="p-4 bg-white rounded-md shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Filters</h3>

      <div className="mb-4">
        <label className="block text-sm mb-1">Price min</label>
        <input type="number" value={minPrice} onChange={e => setMinPrice(Number(e.target.value))} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-1">Price max</label>
        <input type="number" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-2">Rating</label>
        <select value={ratingFilter} onChange={e => setRatingFilter(Number(e.target.value))} className="w-full p-2 border rounded">
          <option value={0}>Any</option>
          <option value={4}>4+</option>
          <option value={3}>3+</option>
          <option value={2}>2+</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-2">Styles</label>
        <div className="flex flex-col gap-2">
          {styles.map(s => (
            <Checkbox key={s} label={s} checked={selectedStyles.includes(s)} onChange={() => toggleStyle(s)} />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-1">City</label>
        <select value={city} onChange={e => setCity(e.target.value)} className="w-full p-2 border rounded">
          <option value="">All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="mb-2">
        <label className="block text-sm mb-1">Sort by</label>
        <select className="w-full p-2 border rounded" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="rating_desc">Rating: High to Low</option>
          <option value="recent">Recently Added</option>
        </select>
      </div>
    </aside>
  )
}
