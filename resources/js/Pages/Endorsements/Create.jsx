import React from 'react'
import { useForm } from '@inertiajs/react'

export default function Create({ users }) {
  const { data, setData, post, processing, errors } = useForm({
    user_id: '',
    message: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    post('/endorsements')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Endorse a User</h1>

      <div>
        <label>User</label>
        <select
          value={data.user_id}
          onChange={e => setData('user_id', e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Select User --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        {errors.user_id && <p className="text-red-500">{errors.user_id}</p>}
      </div>

      <div>
        <label>Message</label>
        <textarea
          value={data.message}
          onChange={e => setData('message', e.target.value)}
          className="w-full border p-2 rounded"
          rows="4"
        />
        {errors.message && <p className="text-red-500">{errors.message}</p>}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={processing}>
        Submit
      </button>
    </form>
  )
}
