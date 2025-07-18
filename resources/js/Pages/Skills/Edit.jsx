import React from 'react'
import { useForm } from '@inertiajs/react'

export default function Edit({ skill }) {
  const { data, setData, put, processing, errors } = useForm({
    name: skill.name,
    level: skill.level
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    put(`/skills/${skill.id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Edit Skill</h1>

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
        Update
      </button>
    </form>
  )
}
