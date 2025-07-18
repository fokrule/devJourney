import React from 'react'
import { useForm } from '@inertiajs/react'

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    level: 1
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/skills')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Add Skill</h1>

      <div>
        <label>Name</label>
        <input
          value={data.name}
          onChange={e => setData('name', e.target.value)}
          className="w-full border p-2 rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label>Level (1–5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={data.level}
          onChange={e => setData('level', e.target.value)}
          className="w-full border p-2 rounded"
        />
        {errors.level && <p className="text-red-500">{errors.level}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={processing}
      >
        Save
      </button>
    </form>
  )
}
