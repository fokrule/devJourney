import React, { useState } from 'react'
import { useForm } from '@inertiajs/react'

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/projects')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Add Project</h1>

      <div>
        <label>Title</label>
        <input
          type="text"
          value={data.title}
          onChange={e => setData('title', e.target.value)}
          className="w-full border p-2 rounded"
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={data.description}
          onChange={e => setData('description', e.target.value)}
          className="w-full border p-2 rounded"
        />
        {errors.description && <p className="text-red-500">{errors.description}</p>}
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
