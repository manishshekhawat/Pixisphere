import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Gallery from '../components/Gallery'
import ReviewList from '../components/ReviewList'
import InquiryModal from '../components/InquiryModal'

const API = import.meta.env.VITE_API

export default function ProfilePage() {
  const { id } = useParams()
  const [p, setP] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openInquiry, setOpenInquiry] = useState(false)

  useEffect(() => {
    if (!id) return
    let mounted = true
    setLoading(true)

    axios
      .get(`${API}/${id}`)
      .then(res => mounted && setP(res.data))
      .catch(() => mounted && setP(null))
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [id])

  if (loading) return <div className="p-8">Loading...</div>
  if (!p)
    return (
      <div className="p-8">
        Photographer not found.{' '}
        <Link to="/" className="text-brand-500">
          Back
        </Link>
      </div>
    )

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Link to="/" className="text-sm text-gray-500">
          ← Back to results
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="md:col-span-1 bg-white rounded p-4 shadow-sm">
          <img
            src={p.profilePic}
            alt={p.name}
            className="w-full h-64 object-cover rounded"
          />
          <div className="mt-4 text-brand-500 font-semibold text-lg">
            Starting at ₹{p.price}
          </div>
          <div className="mt-2">
            Rating: <span className="font-medium">{p.rating} ★</span>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setOpenInquiry(true)}
              className="px-4 py-2 bg-brand-500 text-white rounded"
            >
              Send Inquiry
            </button>
            <a
              href={`tel:+911234567890`}
              className="px-4 py-2 border rounded"
            >
              Call
            </a>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold">Location:</span> {p.location}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded shadow-sm">
            <h1 className="text-2xl font-bold">{p.name}</h1>
            <p className="mt-2 text-gray-700">{p.bio}</p>

            <div className="mt-4">
              <h3 className="font-semibold">Styles & Tags</h3>
              <div className="mt-2 flex gap-2 flex-wrap">
                {p.styles?.map(s => (
                  <span
                    key={s}
                    className="px-2 py-1 bg-gray-100 rounded text-sm"
                  >
                    {s}
                  </span>
                ))}
                {p.tags?.map(t => (
                  <span
                    key={t}
                    className="px-2 py-1 bg-gray-100 rounded text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-semibold mb-3">Portfolio</h3>
            <Gallery images={p.portfolio} />
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-semibold mb-3">Reviews</h3>
            <ReviewList reviews={p.reviews} />
          </div>
        </div>
      </div>

      <InquiryModal
        open={openInquiry}
        onClose={() => setOpenInquiry(false)}
        photographer={p}
      />
    </div>
  )
}
