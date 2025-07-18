import React from 'react'
import { useForm } from '@inertiajs/react'

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    issuer: '',
    issued_on: '',
    certificate_url: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    post('/certifications')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Add Certification</h1>

      <input
        type="text"
        placeholder="Title"
        value={data.title}
        onChange={e => setData('title', e.target.value)}
        className="w-full border p-2 rounded"
      />
      {errors.title && <p className="text-red-500">{errors.title}</p>}

      <input
        type="text"
        placeholder="Issuer"
        value={data.issuer}
        onChange={e => setData('issuer', e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="date"
        value={data.issued_on}
        onChange={e => setData('issued_on', e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="url"
        placeholder="Certificate URL (optional)"
        value={data.certificate_url}
        onChange={e => setData('certificate_url', e.target.value)}
        className="w-full border p-2 rounded"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={processing}>Save</button>
    </form>
  )
}
