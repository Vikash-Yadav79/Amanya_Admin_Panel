import React, { useState, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';
import { UserContext } from '../../context/UserContext'; // Import UserContext
import './Login.css'; // Import CSS for styling

const Login = ({ navigation }) => {
  const { setUser } = useContext(UserContext); // Use the setUser function from context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [user, setUserState] = useState([
    { label: 'Super Admin', value: 1 },
    { label: 'Manager', value: 2 },
    { label: 'Team Lead', value: 3 },
    { label: 'Senior Sales Officer', value: 4 },
    { label: 'Sales Executive', value: 5 },
  ]);

  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
    function (config) {
      console.log('Request New:', JSON.stringify(config, null, 2));
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    function (response) {
      console.log('Response:', JSON.stringify(response, null, 2));
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  const saveCredentialsAndNavigate = async (token, id, status, role, userData) => {
    // Assuming you have a way to store and retrieve data in web
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_id', id.toString());
    localStorage.setItem('role', role.toString());

    console.log("Saved credentials:", { token, id, status, role });

    // Set the user data in the context
    setUser({ ...userData, role });

    if (status === 'success') {
      alert('Login Successful! Redirecting to Attendance Screen.');
      console.log("Login successful. Redirecting to Attendance Screen.");
      navigation.navigate('MarkAttendance');
    } else if (status === 'pending') {
      alert('Login Successful! Redirecting to Waiting Screen.');
      console.log("Login successful. Redirecting to Waiting Screen.");
      navigation.navigate('WaitingScreen', { status });
    } else {
      alert('Error: Unknown status received.');
      console.log("Unknown status received:", status);
    }
  };

  const handleLoginResponse = async (response) => {
    const data = response.data;
    const roles = [
      { key: 'suparadmin', label: 'Super Admin' },
      { key: 'managers', label: 'Manager' },
      { key: 'teamleaders', label: 'Team Lead' },
      { key: 'seniorsalesofficers', label: 'Senior Sales Officer' },
      { key: 'salesexecutives', label: 'Sales Executive' },
    ];

    for (const role of roles) {
      if (data[role.key] && data[role.key].status) {
        console.log(`Handling login response for role: ${role.label}`);
        await saveCredentialsAndNavigate(data.access_token, data[role.key].id, data[role.key].status, role.label, data[role.key]);
        return;
      }
    }
    alert('Error: Login failed. Unknown status.');
    console.log("Login failed. Unknown status.");
  };

  const loginInfo = async () => {
    const loginData = {
      username: username,
      password: password,
      user_type: dropdownValue,
    };

    console.log('Sending login data:', loginData);

    try {
      const response = await axiosInstance.post(
        `${BASE_URL}app-login`,
        loginData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Login response received:', response.data);

      if (response.data.status) {
        await handleLoginResponse(response);
      } else {
        console.error('Login Error 1:', JSON.stringify(response.data.error, null, 2));
        alert('Error:', response.data.message);
        console.log('Error message:', response.data.message);
      }
    } catch (errors) {
      console.error('Login Error 2:', errors);
      alert('Login Error: There was a problem with the login process.');
      console.log('Login process error:', errors);
    }
  };

  return (
    <div className="main-container">
      {/* <img src={require('../assets/AmanyaLogo3.jpg')} alt="Logo" className="logo" /> */}
      <div className="login-container">
        <div className={`info-container ${dropdownOpen ? 'dropdown-open' : ''}`}>
          <select
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.target.value)}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="dropdown"
          >
            <option value="" disabled>Select your Role</option>
            {user.map((role) => (
              <option key={role.value} value={role.value}>{role.label}</option>
            ))}
          </select>
        </div>

        <div className="info-container">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-info"
            placeholder="User Name"
          />
          <span className="icon">👤</span>
        </div>

        <div className="info-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-info"
            placeholder="Password"
          />
          <span className="icon">👁️</span>
        </div>

        <button onClick={loginInfo} className="login-btn">
          Login
        </button>

        <div className="or-container">
          <div className="line"></div>
          <span className="or-text">Or</span>
          <div className="line"></div>
        </div>

        <button
          onClick={() => navigation.navigate('SignUpScreen')}
          className="sign-up-btn"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
