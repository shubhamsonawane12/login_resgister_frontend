import "./css/Main.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get('token');

function Main() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://login-registration-system-backend4.onrender.com/api/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading....</div>; // Replace with your preferred loading indicator
  }

  console.log("userdata from main:", userData);

  return (
    <div className='Main'>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route 
            path="/Home" 
            element={ userData ? <Home /> : <Navigate to="/" replace />} 
          />
                 
        </Routes>
      </Router> 
    </div>
  );
}

export default Main;
