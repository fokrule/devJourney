import React from 'react'
import { useForm } from '@inertiajs/react'

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    content: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/blogs')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">New Blog</h1>

      <div>
        <label>Title</label>
        <input
          value={data.title}
          onChange={e => setData('title', e.target.value)}
          className="w-full border p-2 rounded"
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label>Content (Markdown supported)</label>
        <textarea
          value={data.content}
          onChange={e => setData('content', e.target.value)}
          rows="10"
          className="w-full border p-2 rounded font-mono"
        />
        {errors.content && <p className="text-red-500">{errors.content}</p>}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={processing}>
        Publish
      </button>
    </form>
  )
}
