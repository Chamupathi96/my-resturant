import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Typography, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const verifyOrder = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/order/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId, success }),
        });
        const data = await response.json();
        if (data.success) {
          console.log('Order verified successfully');
        } else {
          console.log('Order verification failed');
          navigate('/pagenotfound'); // Redirect to Page Not Found if the order was not successful
        }
      } catch (error) {
        console.error('Error verifying order:', error);
        navigate('/pagenotfound'); // Redirect to Page Not Found on error
      }
    };

    if (orderId && success) {
      verifyOrder();
    } else {
      navigate('/pagenotfound'); // Redirect to a 404 page if orderId or success is missing
    }
  }, [orderId, success, navigate]);

  return (
    <Layout>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="h4">Thank You for Your Order!</Typography>
        <Typography variant="h6">Your order has been placed successfully.</Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Back to Home
        </Button>
      </div>
    </Layout>
  );
};

export default Verify;
