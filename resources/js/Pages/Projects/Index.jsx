import React from 'react'
import { Link, usePage } from '@inertiajs/react'

export default function Index({ projects }) {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Your Projects</h1>

      <Link href="/projects/create" className="bg-blue-600 text-white px-4 py-2 rounded">
        + New Project
      </Link>

      <div className="mt-6 space-y-4">
        {projects.map(project => (
          <div key={project.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{project.title}</h2>
            <p>{project.description}</p>
            <div className="mt-2">
              <Link href={`/projects/${project.id}/edit`} className="text-blue-500 mr-4">Edit</Link>
              <form
                method="post"
                action={`/projects/${project.id}`}
                onSubmit={(e) => {
                  e.preventDefault()
                  if (confirm('Are you sure?')) e.target.submit()
                }}
              >
                <input type="hidden" name="_method" value="delete" />
                <button type="submit" className="text-red-600">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
