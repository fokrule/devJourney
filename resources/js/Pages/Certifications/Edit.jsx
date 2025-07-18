import React from 'react'
import { useForm } from '@inertiajs/react'

export default function Edit({ certification }) {
  const { data, setData, put, processing, errors } = useForm({
    title: certification.title,
    issuer: certification.issuer || '',
    issued_on: certification.issued_on || '',
    certificate_url: certification.certificate_url || ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    put(`/certifications/${certification.id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Edit Certification</h1>

      <input
        type="text"
        value={data.title}
        onChange={e => setData('title', e.target.value)}
        className="w-full border p-2 rounded"
      />
      {errors.title && <p className="text-red-500">{errors.title}</p>}

      <input
        type="text"
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
        value={data.certificate_url}
        onChange={e => setData('certificate_url', e.target.value)}
        className="w-full border p-2 rounded"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={processing}>Update</button>
    </form>
  )
}
