import React, { useState, useContext } from 'react';
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography, Button } from '@mui/material';
import FastfoodSharpIcon from '@mui/icons-material/FastfoodSharp';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../../context/CartContext';
import "../../styles/HeaderStyles.css";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartItems, isAuthenticated, setToken } = useContext(CartContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    setToken(null); // Clear token and update state
    localStorage.removeItem("token");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography 
        color={"goldenrod"} 
        variant="h6" 
        component={"div"} 
        sx={{ flexGrow: 1, my: 2 }}
      >
        <FastfoodSharpIcon />
        SINGHA Restaurant
      </Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {isAuthenticated ? (
          <li><Link to="/profile">Profile</Link></li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
        <li><Link to="/cart">Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})</Link></li>
      </ul>
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar component={"nav"} sx={{ bgcolor: "black" }}>
          <Toolbar>
            <IconButton 
              color="inherit" 
              aria-label="open drawer" 
              edge="start" 
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              color={"goldenrod"} 
              variant="h6" 
              component={"div"} 
              sx={{ flexGrow: 1 }}
            >
              <FastfoodSharpIcon />
              SINGHA Restaurant
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                {isAuthenticated ? (
                  <>
                    <li><Button component={Link} to="/profile" sx={{ color: 'white' }}>Profile</Button></li>
                    <li><Button onClick={handleLogout} sx={{ color: 'white' }}>Logout</Button></li>
                  </>
                ) : (
                  <li><Button component={Link} to="/login" sx={{ color: 'white' }}>Login</Button></li>
                )}
                <li><Button component={Link} to="/cart" sx={{ color: 'white' }}>
                  <ShoppingCartIcon /> ({cartItems.reduce((total, item) => total + item.quantity, 0)})
                </Button></li>
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer 
            variant="temporary" 
            open={mobileOpen} 
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: 'block', sm: 'none' },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box>
          <Toolbar />
        </Box>
      </Box>
    </>
  );
};

export default Header;