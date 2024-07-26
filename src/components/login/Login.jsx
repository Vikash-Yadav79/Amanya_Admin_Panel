import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBSpinner
} from 'mdb-react-ui-kit';
import './Login.css'; 

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUpClick = (event) => {
    event.preventDefault();
    navigate('/signUp');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('admin-login', {
        username: username,
        password: password
      });
      console.log(response.data);
      navigate('/Dashboard'); // Navigate to the dashboard on successful login
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        setError(error.response.data.message || 'Invalid email or password');
      } else {
        console.error('There was an error!', error.error);
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid className="bg-dark min-vh-100 d-flex align-items-center justify-content-center p-0">
      <MDBRow className="d-flex justify-content-center align-items-center w-100 m-0">
        <MDBCol col="12" md="8" lg="6" xl="4">
          <MDBCard className="bg-light text-dark my-5 mx-auto" style={{ borderRadius: '1rem', width: '100%' }}>
            <MDBCardBody className="p-5 d-flex flex-column align-items-center">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-muted mb-5">Please enter your login and password!</p>
              <form onSubmit={handleLogin} className="w-100">
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  labelClass="text-dark"
                  label="Email address"
                  id="username"
                  type="text"
                  size="lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  labelClass="text-dark"
                  label="Password"
                  id="password"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-danger">{error}</p>}
                <MDBBtn type="submit" className="w-100 mb-3" outline color="primary" size="lg" disabled={loading}>
                  {loading ? <MDBSpinner role="status" tag="span" size="sm" className="me-2" /> : 'Login'}
                </MDBBtn>
              </form>
              <div className="d-flex flex-row mt-3 mb-5">
                <MDBBtn tag="a" color="none" className="m-2" style={{ color: '#3b5998' }}>
                  <MDBIcon fab icon="facebook-f" size="lg" />
                </MDBBtn>
                <MDBBtn tag="a" color="none" className="m-2" style={{ color: '#1DA1F2' }}>
                  <MDBIcon fab icon="twitter" size="lg" />
                </MDBBtn>
                <MDBBtn tag="a" color="none" className="m-2" style={{ color: '#DB4437' }}>
                  <MDBIcon fab icon="google" size="lg" />
                </MDBBtn>
              </div>
              <p className="mb-0">
                Don't have an account? <a href="#signUp" className="text-primary fw-bold" onClick={handleSignUpClick}>Sign Up</a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
