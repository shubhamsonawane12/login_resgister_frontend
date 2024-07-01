import "../css/Signup.css";
import React, { useState } from "react";
import Cookies from 'universal-cookie';

function Signup() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const cookies = new Cookies();
  const [formData , setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });
   const [LoginData, setLoginData] = useState({
  
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
   const handleLoginChange = (e) => {
    setLoginData({ ...LoginData, [e.target.name]: e.target.value });
  };

  const handleSignUpClick = async (e) => {
    e.preventDefault();
    setIsRightPanelActive(true);

    try {
      const response = await fetch(
        "https://login-registration-system-backend4.onrender.com/api/auth/register ",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("sign_up Successful:", data);
        cookies.set("token", data.token, { path: "/" });
        window.location.href = 'https://login-resgister-frontend1.onrender.com/Home';
      } else {
        console.error("Sign_up error: ", data.message);
      }
    } catch (error) {
      console.error("Sign_up failed: ", error);
    }
  };



   const handleSignInClick = async (e) => { 
    e.preventDefault();
            setIsRightPanelActive(false);

    try {
      const response = await fetch(
        "https://login-registration-system-backend4.onrender.com/api/auth/login ",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(LoginData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Login Successful:", data);
        cookies.set("token", data.token, { path: "/" });
        window.location.href = 'https://login-resgister-frontend1.onrender.com/Home';

      } else {
        console.error("Login error: ", data.message);
      }
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };



  return (
    <>
    <mainContainer>
      <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUpClick}>
            <div className="text_container">
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
            </div>
            <input 
              type="text" 
              name="name" 
              placeholder="Name" 
              required 
              onChange={handleChange} 
              value={formData.name}
            />
            <input 
              type="date" 
              name="dob" 
              placeholder="Date" 
              required 
              onChange={handleChange} 
              value={formData.dob}
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
              onChange={handleChange} 
              value={formData.email}
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              required 
              onChange={handleChange} 
              value={formData.password} 
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" onSubmit={handleSignInClick}>
            <div className="text_container"> 
              <h1>Log in</h1>
              <span>or use your account</span>
            </div>
             <input 
              type="email" 
              name="email" 
              placeholder="Email"  
              required 
              onChange={handleLoginChange} 
              value={LoginData.email}
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              required 
              onChange={handleLoginChange} 
              value={LoginData.password} 
            />
            <a href="#">Forgot your password?</a>
            <button>Login</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={handleSignInClick}>
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Explorer!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      </mainContainer>
    </>
  );
}

export default Signup;
