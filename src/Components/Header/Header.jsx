import React, { useEffect, useState } from 'react'
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit'
import { RiComputerFill } from 'react-icons/ri'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Header() {
  const [openNavColorSecond, setOpenNavColorSecond] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const loadUser = () => setUser(JSON.parse(localStorage.getItem('user')))
    loadUser()
    window.addEventListener('storage', loadUser)
    return () => window.removeEventListener('storage', loadUser)
  }, [location])

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
    <MDBNavbar expand="lg" dark bgColor="dark">
      <MDBContainer fluid>
        <RiComputerFill size="3em" className="me-2" />
        <MDBNavbarBrand as={Link} to='/'>Wallify</MDBNavbarBrand>

        <MDBNavbarToggler
          type="button"
          onClick={() => setOpenNavColorSecond(!openNavColorSecond)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse open={openNavColorSecond} navbar>
          <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <MDBNavbarItem>
                  <Link to="/"><MDBNavbarLink href="#">Home</MDBNavbarLink></Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <Link to="/gallery"><MDBNavbarLink href="#">Gallery</MDBNavbarLink></Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <Link to="/saved"><MDBNavbarLink href="#">Saved</MDBNavbarLink></Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <Link to="/user"><MDBNavbarLink href="#">Users</MDBNavbarLink></Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="#" onClick={(e) => { e.preventDefault(); logout() }}>
                    Logout
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            ) : (
              <>
                <MDBNavbarItem>
                  <Link to="/"><MDBNavbarLink href="#">Home</MDBNavbarLink></Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <Link to="/login"><MDBNavbarLink href="#">Login</MDBNavbarLink></Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <Link to="/register"><MDBNavbarLink href="#">Register</MDBNavbarLink></Link>
                </MDBNavbarItem>
              </>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Header
