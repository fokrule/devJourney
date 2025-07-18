import React from 'react'
import { Link } from '@inertiajs/react'

export default function Index({ goals }) {
  const byStatus = (status) => goals.filter(g => g.status === status)

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Your Learning Goals</h1>
        <Link href="/goals/create" className="bg-blue-600 text-white px-4 py-2 rounded">+ New Goal</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['planned', 'in_progress', 'done'].map(status => (
          <div key={status} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold capitalize">{status.replace('_', ' ')}</h2>
            <ul className="mt-4 space-y-3">
              {byStatus(status).map(goal => (
                <li key={goal.id} className="border p-2 rounded bg-white">
                  <div className="font-semibold">{goal.title}</div>
                  <div className="text-sm text-gray-600">{goal.details}</div>
                  <div className="mt-2 text-sm">
                    <Link href={`/goals/${goal.id}/edit`} className="text-blue-500 mr-2">Edit</Link>
                    <form
                      method="POST"
                      action={`/goals/${goal.id}`}
                      className="inline"
                      onSubmit={e => { e.preventDefault(); if (confirm('Delete?')) e.target.submit() }}
                    >
                      <input type="hidden" name="_method" value="delete" />
                      <button className="text-red-600">Delete</button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
