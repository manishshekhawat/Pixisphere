import React from 'react'

export default function SkeletonCard(){
  return (
    <div className="bg-white rounded-lg overflow-hidden animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="h-6 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  )
}
