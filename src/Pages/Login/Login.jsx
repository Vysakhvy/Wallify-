import React, { useState } from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError('')

    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter username and password')
      return
    }

    try {
      // Get the registered users from the JSON backend
      const response = await fetch('http://localhost:3000/users')

      if (!response.ok) {
        throw new Error('Could not connect to the backend')
      }

      const users = await response.json()

      // Allow the user to login with either username or email
      const loginUser = users.find(
        (user) =>
          (user.username.toLowerCase() === username.trim().toLowerCase() ||
            user.email.toLowerCase() === username.trim().toLowerCase()) &&
          user.password === password
      )

      if (!loginUser) {
        setError('Invalid username/email or password')
        return
      }

      // Save the complete user, including the JSON Server id.
      localStorage.setItem('user', JSON.stringify({
        id: loginUser.id,
        username: loginUser.username,
        email: loginUser.email
      }))
      navigate('/gallery')
    } catch {
      setError('Backend is not running. Start JSON Server first.')
    }
  }

  return (
    <div className='overflow-hidden' >
      <div>
        <div className="row">
          <div className="col text-center"><img src="https://www.pngkey.com/png/detail/73-730394_admin-approved-user-registration-user-registration-icon-png.png" alt="" style={{width:'80%',maxWidth:'400px',height:'auto'}}/></div>

          <div className="col ">
            <h2 style={{fontSize:'2.5rem',fontWeight:'bold',textAlign:'center',marginTop:'50px'}}>Welcome </h2>
            <h4 style={{textAlign:'center',marginTop:'10px'}}>To your account</h4>

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
              <button className='btn btn-info' onClick={handleLogin}> Login</button>
            </div>

            <div className="d-flex justify-content-center ">New to here?  <Link to='/register' className='ms-1'>Register Now</Link> </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
