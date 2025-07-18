import React from 'react'
import { Link, useForm } from '@inertiajs/react'

export default function Index({ skills }) {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Your Skills</h1>
      <Link href="/skills/create" className="bg-blue-600 text-white px-4 py-2 rounded">+ Add Skill</Link>

      <ul className="mt-6 space-y-4">
        {skills.map(skill => (
          <li key={skill.id} className="p-4 border rounded shadow">
            <div className="flex justify-between">
              <div>
                <strong>{skill.name}</strong> – Level {skill.level}
              </div>
              <div>
                <Link href={`/skills/${skill.id}/edit`} className="text-blue-500 mr-4">Edit</Link>
                <form
                  method="POST"
                  action={`/skills/${skill.id}`}
                  onSubmit={e => {
                    e.preventDefault()
                    if (confirm('Delete?')) e.target.submit()
                  }}
                >
                  <input type="hidden" name="_method" value="delete" />
                  <button className="text-red-600">Delete</button>
                </form>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
