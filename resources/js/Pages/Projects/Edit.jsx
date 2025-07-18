import React from 'react'
import { useForm } from '@inertiajs/react'

export default function Edit({ project }) {
  const { data, setData, put, processing, errors } = useForm({
    title: project.title || '',
    description: project.description || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    put(`/projects/${project.id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Edit Project</h1>

      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          value={data.title}
          onChange={e => setData('title', e.target.value)}
          className="w-full border p-2 rounded"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          value={data.description}
          onChange={e => setData('description', e.target.value)}
          className="w-full border p-2 rounded"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
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
