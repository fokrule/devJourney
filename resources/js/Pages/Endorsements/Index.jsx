import React from 'react'
import { Link } from '@inertiajs/react'

export default function Index({ endorsements }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Endorsements for You</h1>
        <Link href="/endorsements/create" className="bg-blue-600 text-white px-4 py-2 rounded">+ Endorse Someone</Link>
      </div>

      {endorsements.map(endorsement => (
        <div key={endorsement.id} className="p-4 border rounded shadow mb-4">
          <p>"{endorsement.message}"</p>
          <p className="text-sm text-gray-600 mt-2">– {endorsement.endorser.name}</p>
          <form
            method="POST"
            action={`/endorsements/${endorsement.id}`}
            onSubmit={e => { e.preventDefault(); if (confirm('Delete?')) e.target.submit() }}
          >
            <input type="hidden" name="_method" value="delete" />
            <button className="text-red-500 text-sm mt-2">Delete</button>
          </form>
        </div>
      ))}
    </div>
  )
}
