import React from 'react'
import { Link } from '@inertiajs/react'

export default function Index({ certifications }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Certifications</h1>
        <Link href="/certifications/create" className="bg-blue-600 text-white px-4 py-2 rounded">+ Add</Link>
      </div>

      <div className="space-y-4">
        {certifications.map(cert => (
          <div key={cert.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{cert.title}</h2>
            <p className="text-sm text-gray-600">{cert.issuer} • {cert.issued_on}</p>
            {cert.certificate_url && (
              <a href={cert.certificate_url} target="_blank" rel="noreferrer" className="text-blue-600 text-sm underline">View Certificate</a>
            )}
            <div className="mt-2">
              <Link href={`/certifications/${cert.id}/edit`} className="text-blue-500 mr-4">Edit</Link>
              <form
                method="POST"
                action={`/certifications/${cert.id}`}
                className="inline"
                onSubmit={e => { e.preventDefault(); if (confirm('Delete?')) e.target.submit() }}
              >
                <input type="hidden" name="_method" value="delete" />
                <button className="text-red-600">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
