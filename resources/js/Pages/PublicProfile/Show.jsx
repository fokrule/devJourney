import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function Show({ user, skills, projects, blogs, certifications, endorsements }) {
  return (
    <div className="max-w-5xl mx-auto space-y-10 py-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-sm text-gray-500">{user.email}</p>
      </header>

      {/* Skills */}
      <section>
        <h2 className="text-xl font-semibold">Skills</h2>
        <ul className="flex flex-wrap gap-4 mt-2">
          {skills.map(skill => (
            <li key={skill.name} className="bg-gray-200 px-3 py-1 rounded-full">
              {skill.name} (Level {skill.level})
            </li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-xl font-semibold">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {projects.map((p, i) => (
            <div key={i} className="p-4 border rounded shadow">
              <h3 className="font-bold">{p.title}</h3>
              <p className="text-sm mt-1">{p.description}</p>
              <div className="mt-2 space-x-2">
                {p.github_url && <a href={p.github_url} target="_blank" className="text-blue-600 underline">GitHub</a>}
                {p.demo_url && <a href={p.demo_url} target="_blank" className="text-green-600 underline">Demo</a>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blogs */}
      <section>
        <h2 className="text-xl font-semibold">Blogs</h2>
        <div className="space-y-4 mt-2">
          {blogs.map((b, i) => (
            <div key={i}>
              <h3 className="font-bold">{b.title}</h3>
              <ReactMarkdown className="prose prose-sm mt-1">{b.content.slice(0, 300)}...</ReactMarkdown>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section>
        <h2 className="text-xl font-semibold">Certifications</h2>
        <ul className="mt-2 space-y-2">
          {certifications.map((c, i) => (
            <li key={i} className="text-sm">
              <strong>{c.title}</strong> – {c.issuer} ({c.issued_on})
              {c.certificate_url && (
                <a href={c.certificate_url} className="text-blue-600 underline ml-2" target="_blank">View</a>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Endorsements */}
      <section>
        <h2 className="text-xl font-semibold">Endorsements</h2>
        <ul className="space-y-3 mt-2">
          {endorsements.map((e, i) => (
            <li key={i} className="border p-3 rounded bg-gray-50">
              <p>"{e.message}"</p>
              <p className="text-sm text-gray-500 mt-1">– {e.endorser.name}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
