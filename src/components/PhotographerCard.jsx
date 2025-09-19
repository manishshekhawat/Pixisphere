import React from 'react'
import { Link } from 'react-router-dom'

export default function PhotographerCard({ p }){
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm card-fade flex flex-col">
      <div className="h-44 bg-gray-100 flex items-center justify-center  overflow-hidden">
        <img src={p.profilePic || 'https://via.placeholder.com/400x300'} alt={p.name} className="object-cover w-full h-full" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.location}</p>
          </div>
          <div className="text-right">
            <div className="text-brand-500 font-semibold">₹{p.price}</div>
            <div className="text-sm text-gray-500">{p.rating} ★</div>
          </div>
        </div>
        <div className="mt-3 flex gap-2 flex-wrap">
          {p.tags && p.tags.map(t => (
            <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded">{t}</span>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Link to={`/photographer/${p.id}`} className="text-sm px-3 py-2 bg-brand-500 text-white rounded ">View Profile</Link>
          <button className="text-sm px-3 py-2 border rounded">Contact</button>
        </div>
      </div>
    </div>
  )
}
