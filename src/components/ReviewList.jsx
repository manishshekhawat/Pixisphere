import React from 'react'

export default function ReviewList({ reviews = [] }){
  if(!reviews || reviews.length === 0) return <div className="text-gray-500">No reviews yet.</div>
  return (
    <div className="space-y-3">
      {reviews.map((r, i) => (
        <div key={i} className="p-3 bg-white rounded shadow-sm">
          <div className="flex items-center justify-between">
            <div className="font-semibold">{r.name}</div>
            <div className="text-sm text-gray-500">{r.rating} ★</div>
          </div>
          <div className="mt-1 text-sm text-gray-700">{r.comment}</div>
          <div className="mt-2 text-xs text-gray-400">{r.date}</div>
        </div>
      ))}
    </div>
  )
}
