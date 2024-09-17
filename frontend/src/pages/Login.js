import React, { useContext, useState } from 'react';
import "../styles/Login.css";
import { assets } from '../data/data';
import Layout from '../components/Layout/Layout';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setShowLogin, setIsLoggedIn }) => {
  const { url, setToken } = useContext(CartContext);
  const navigate = useNavigate();

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
    const newUrl = `${url}${endpoint}`;

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setMessage("Account created successfully!");
        setData({ name: "", email: "", password: "" });

        setIsLoggedIn(true); // Update the login state
        navigate('/profile'); // Redirect to profile page after login
      } else {
        setMessage(response.data.message || "An error occurred.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <Layout>
      <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close icon" />
          </div>
          <div className="login-popup-inputs">
            {currState === "Sign Up" && (
              <input 
                name='name' 
                onChange={onChangeHandler} 
                value={data.name} 
                type="text" 
                placeholder='Your name' 
                required 
              />
            )}
            <input 
              name='email' 
              onChange={onChangeHandler} 
              value={data.email} 
              type="email" 
              placeholder='Your email' 
              required 
            />
            <input 
              name='password' 
              onChange={onChangeHandler} 
              value={data.password} 
              type="password" 
              placeholder='Password' 
              required 
            />
          </div>
          <button type='submit'>
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          {currState === "Login" ? (
            <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
          )}
          {message && (
            <div className={`login-popup-message ${message.includes("successfully") ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default Login;