import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';

function Login() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <MDBContainer fluid className="bg-dark min-vh-100">
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12' md='8' lg='6' xl='4'>
          <MDBCard className='bg-light text-dark my-5 mx-auto' style={{ borderRadius: '1rem' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center'>
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-muted mb-5">Please enter your login and password!</p>
              <MDBInput wrapperClass='mb-4 w-100' labelClass='text-dark' label='Email address' id='email' type='email' size="lg" />
              <MDBInput wrapperClass='mb-4 w-100' labelClass='text-dark' label='Password' id='password' type='password' size="lg" />
              <MDBBtn className='w-100 mb-3' outline color='primary' size='lg'>
                Login
              </MDBBtn>
              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-2' style={{ color: '#3b5998' }}>
                  <MDBIcon fab icon='facebook-f' size="lg" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-2' style={{ color: '#1DA1F2' }}>
                  <MDBIcon fab icon='twitter' size="lg" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-2' style={{ color: '#DB4437' }}>
                  <MDBIcon fab icon='google' size="lg" />
                </MDBBtn>
              </div>
              <p className="mb-0">Don't have an account? <a href="#!" className="text-primary fw-bold" onClick={handleSignUpClick}>Sign Up</a></p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
