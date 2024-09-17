import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Layout from '../components/Layout/Layout';
import { assets } from '../data/data';
import "../styles/Profile.css";

const Profile = ({ setIsLoggedIn }) => {
  const { setToken } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Ensure the token key matches the one used in login
    setIsLoggedIn(false); // Update the login state
    navigate('/login');
  };

  // Handler for navigating to My Orders page
  const handleNavigateToOrders = () => {
    navigate('/myorders');
  };

  return (
    <Layout>
      <div className="profile-container">
        <header className="profile-header">
          <div className="icon-container">
            <img
              src={assets.bag_icon}
              alt="Bag Icon"
              className="bag-icon"
              onClick={handleNavigateToOrders}
            />
            <span>Orders</span>
          </div>
          <h2>Welcome to your Profile</h2>
          <img src={assets.profile_icon} alt="Profile Icon" className="profile-icon" />
        </header>
        <main>
          <div className="actions">
            <button onClick={handleLogout} className="logout-button">
              Log Out
            </button>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Profile;
