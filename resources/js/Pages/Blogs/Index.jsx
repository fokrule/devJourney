import React from 'react'
import { Link } from '@inertiajs/react'

export default function Index({ blogs }) {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Your Blog Posts</h1>
      <Link href="/blogs/create" className="bg-blue-600 text-white px-4 py-2 rounded">+ New Blog</Link>

      <div className="mt-6 space-y-4">
        {blogs.map(blog => (
          <div key={blog.id} className="p-4 border rounded shadow">
            <h2 className="font-semibold text-lg">{blog.title}</h2>
            <Link href={`/blogs/${blog.id}/edit`} className="text-blue-500 mr-4">Edit</Link>
            <form method="POST" action={`/blogs/${blog.id}`} onSubmit={e => { e.preventDefault(); if (confirm('Delete?')) e.target.submit() }}>
              <input type="hidden" name="_method" value="delete" />
              <button className="text-red-600">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}
