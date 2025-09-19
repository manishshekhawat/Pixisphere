import React, { useState } from 'react'

export default function Gallery({ images = [] }){
  const [idx, setIdx] = useState(0)
  if(!images || images.length === 0) return null

  function prev(){ setIdx(i => (i - 1 + images.length) % images.length) }
  function next(){ setIdx(i => (i + 1) % images.length) }

  return (
    <div className="space-y-3">
      {/* Large carousel for md+ */}
      <div className="hidden md:block bg-gray-50 rounded overflow-hidden">
        <div className="relative h-96">
          <img src={images[idx]} alt={`gallery-${idx}`} className="w-full h-full object-cover" />
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow">‹</button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow">›</button>
        </div>
        <div className="grid grid-cols-5 gap-2 p-2">
          {images.map((img, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`h-20 overflow-hidden rounded ${i===idx?'ring-2 ring-brand-500':''}`}>
              <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile grid */}
      <div className="md:hidden grid grid-cols-2 gap-2">
        {images.map((img, i) => (
          <img key={i} src={img} alt={`m-${i}`} className="w-full h-36 object-cover rounded" />
        ))}
      </div>
    </div>
  )
}
