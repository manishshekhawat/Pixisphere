import React from 'react'
import { usePhotographers } from '../context/PhotographerContext'
import SearchBar from '../components/SearchBar'
import Filters from '../components/Filters'
import PhotographerCard from '../components/PhotographerCard'
import SkeletonCard from '../components/SkeletonCard'

export default function CategoryPage(){
  const { paginated, loading, filtered, loadMore } = usePhotographers()

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-80">
          <Filters />
        </div>

        <div className="md:flex-1">
          <div className="mb-4">
            <SearchBar />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Photographers</h2>
            <div className="text-sm text-gray-600">{filtered.length} results</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({length:6}).map((_,i) => <SkeletonCard key={i} />)
              : paginated.map(p => <PhotographerCard key={p.id} p={p} />)
            }
          </div>

          <div className="mt-6 flex justify-center">
            {(!loading && paginated.length < filtered.length) && (
              <button onClick={loadMore} className="px-4 py-2 bg-brand-500 text-white rounded">Load more</button>
            )}
            {(!loading && filtered.length === 0) && (
              <div className="text-gray-500">No photographers match your filters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
