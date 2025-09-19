import React, { useState } from 'react'

export default function InquiryModal({ open, onClose, photographer }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function submit(e){
    e.preventDefault()
    // simulate API call
    setTimeout(() => {
      setSent(true)
      setName(''); setEmail(''); setMessage('')
    }, 700)
  }

  if(!open) return null
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 modal-backdrop" onClick={onClose}></div>
      <div className="relative z-50 max-w-md w-full bg-white rounded p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Send Inquiry</h3>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <div className="mt-3">
          <div className="text-sm text-gray-600">To: <span className="font-medium">{photographer?.name}</span></div>
        </div>

        <form onSubmit={submit} className="mt-3 space-y-3">
          <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full p-2 border rounded" />
          <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email" className="w-full p-2 border rounded" />
          <textarea required value={message} onChange={e=>setMessage(e.target.value)} placeholder="Message" className="w-full p-2 border rounded h-24" />
          <div className="flex items-center justify-between">
            <button type="submit" className="px-4 py-2 bg-brand-500 text-white rounded">{sent ? 'Sent ✓' : 'Send'}</button>
            <button type="button" onClick={onClose} className="text-sm text-gray-500">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
