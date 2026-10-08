import React, { useState } from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    setError('')

    if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
      alert('All fields are required')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{6,}$/

    if (!strongPassword.test(password)) {
      setError('Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character')
      return
    }

    try {
      const checkResponse = await fetch(
        `http://localhost:3000/users?username=${encodeURIComponent(username)}`
      )
      const existingUsers = await checkResponse.json()

      if (existingUsers.length > 0) {
        setError('Username already exists')
        return
      }

      await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password
        })
      })

      alert('Registration successful')
      navigate('/login')
    } catch {
      setError('Backend is not running. Start JSON Server first.')
    }
  }

  return (
    <div  className='overflow-hidden'>
      <div className="row">
        <div className="col"><img src="https://cdni.iconscout.com/illustration/premium/thumb/new-user-registration-illustration-svg-download-png-3723269.png" alt="" /></div>

        <div className="col ">
          <h2 style={{fontSize:'2.5rem',fontWeight:'bold',textAlign:'center',marginTop:'50px'}}>User Registration</h2>

          <div style={{width:'100%',maxWidth:'650px'}}>
            <MDBInput
              label="UserName"
              id="form1"
              type="text"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <MDBInput
              label="Email"
              id="form1"
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <MDBInput
              label="Password"
              id="form1"
              type="password"
              autoComplete="new-password"
              name="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-danger text-center mt-3">{error}</p>}

          <div className="d-flex justify-content-center " style={{marginTop:'20px'}}>
            <button className='btn btn-info' onClick={handleRegister}> Register</button>
          </div>
          <div className="d-flex justify-content-center ">Already a user?  <Link to='/login' className='ms-1'>Login Now</Link> </div>
        </div>
      </div>
    </div>
  )
}

export default Register
