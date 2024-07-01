import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Home.css";
import Cookies from 'universal-cookie';

function Home() {
  const [users, setUsers] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://login-registration-system-backend4.onrender.com/api/auth/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (response.status === 200) {
          setUsers(response.data); // Update state with user data
          console.log("all users:-", response.data); // Log user data received
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  return (
   <div className="home_maincontainer">
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{new Date(user.dob).toLocaleDateString()}</td>
              <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div> 
  );
}

export default Home;
