import React from 'react'
import { useForm } from '@inertiajs/react'

export default function Edit({ goal }) {
  const { data, setData, put, processing, errors } = useForm({
    title: goal.title,
    details: goal.details || '',
    status: goal.status
  })

  const handleSubmit = e => {
    e.preventDefault()
    put(`/goals/${goal.id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Edit Goal</h1>

      <div>
        <label>Title</label>
        <input value={data.title} onChange={e => setData('title', e.target.value)} className="w-full border p-2 rounded" />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label>Details</label>
        <textarea value={data.details} onChange={e => setData('details', e.target.value)} className="w-full border p-2 rounded" />
        {errors.details && <p className="text-red-500">{errors.details}</p>}
      </div>

      <div>
        <label>Status</label>
        <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full border p-2 rounded">
          <option value="planned">Planned</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        {errors.status && <p className="text-red-500">{errors.status}</p>}
      </div>

      <button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
    </form>
  )
}
