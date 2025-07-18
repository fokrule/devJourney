import React from 'react'
import { usePage } from '@inertiajs/react'

export default function Dashboard() {
  const { auth } = usePage().props
  const username = auth.user.name

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-bold">Welcome, {username}</h1>

      <a
        href={`/profile/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        🔗 View Public Profile
      </a>
    </div>
  )
}
