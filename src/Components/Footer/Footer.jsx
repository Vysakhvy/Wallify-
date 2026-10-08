import React from 'react'
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>


          <MDBFooter className='text-center text-white' style={{ backgroundColor: '#0a4275' }}>
      <MDBContainer className='p-4 pb-0'>
        <section className=''>
          <p className='d-flex justify-content-center align-items-center'>
            <span className='me-3'>Register for free</span>
            <Link to='/register'>
             <MDBBtn type='button' outline color="light" rounded>
              Register Now
            </MDBBtn>
            
            </Link>
            
           
          </p>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2026 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
          demo.com
        </a>
      </div>
    </MDBFooter>
    </div>
  )
}

export default Footer