import ReactMarkdown from 'react-markdown'

export default function Show({ blog }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      <ReactMarkdown className="prose">{blog.content}</ReactMarkdown>
    </div>
  )
}
