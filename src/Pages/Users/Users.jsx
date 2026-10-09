import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Users() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('https://wallify-backend-crj0.onrender.com/users')

        if (!response.ok) {
          throw new Error('Could not load users')
        }

        const data = await response.json()
        setUsers(data)
      } catch {
        setError('Backend is not running. Start JSON Server first.')
      }
    }

    getUsers()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const handleRemoveAccount = async () => {
    const confirmDelete = window.confirm('Remove your account?')

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(`https://wallify-backend-crj0.onrender.com/users/${user.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Could not remove account')
      }

      localStorage.removeItem('user')
      navigate('/login')
    } catch {
      setError('Could not remove your account. Start JSON Server first.')
    }
  }

  if (!user) {
    return (
      <div className="text-center mt-5 mb-5">
        <h2>Please login first</h2>
        <button className="btn btn-info" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    )
  }

  return (
    <div className="container mt-5 overflow-hidden">
      <div className="text-center">
        <h1>Welcome {user.username}</h1>
        <p>Email: {user.email}</p>

        <button className="btn btn-danger mb-4" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h2 className="text-center mb-3">Users List</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      {!error && users.length === 0 && (
        <p className="text-center">No users registered yet.</p>
      )}

      {users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
            
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.id === user.id && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={handleRemoveAccount}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Users
