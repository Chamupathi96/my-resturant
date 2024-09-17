import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import Layout from '../components/Layout/Layout';
import { Button, Card, CardContent, Typography, Grid, TextField } from '@mui/material';
import axios from 'axios';

const Checkout = () => {
  const { cartItems, calculateTotal, clearCart, token } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    phoneNumber: '',
  });

  const DELIVERY_FEE = 2.00; // Set a fixed delivery fee

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleCheckout = async () => {
    const { name, address, city, zip, phoneNumber } = shippingInfo;
    if (!name || !address || !city || !zip || !phoneNumber) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Send order details to the backend
      const response = await axios.post(
        'http://localhost:4000/api/order/place',
        {
          userId: localStorage.getItem('userId'), // Ensure you have the userId saved in localStorage or another state
          items: cartItems,
          amount: calculateTotal() + DELIVERY_FEE,
          address: {
            name,
            address,
            city,
            zip,
            phoneNumber
          }
        },
        {
          headers: {
            token: token // Include token in the request headers
          }
        }
      );

      if (response.data.success) {
        // Clear the cart after placing the order
        clearCart();
        // Redirect to Stripe checkout session
        window.location.href = response.data.session_url;
      } else {
        alert('Failed to create order. Please try again.');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('There was an error processing your order. Please try again.');
    }
  };

  return (
    <Layout>
      <Grid container spacing={3}>
        {/* Cart Summary Section */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Your Order Summary
              </Typography>
              {cartItems.length === 0 ? (
                <Typography variant="body1">Your cart is empty</Typography>
              ) : (
                <div>
                  <Typography variant="h6">Items:</Typography>
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <Typography variant="body1">
                        {item.name} - $.{item.price} x {item.quantity}
                      </Typography>
                    </div>
                  ))}
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Subtotal: $.{calculateTotal().toFixed(2)}
                  </Typography>
                  <Typography variant="h6">
                    Delivery Fee: $.{DELIVERY_FEE.toFixed(2)}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Total: $.{(calculateTotal() + DELIVERY_FEE).toFixed(2)}
                  </Typography>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Shipping Information Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Shipping Information
              </Typography>
              <TextField
                label="Name"
                name="name"
                fullWidth
                margin="normal"
                value={shippingInfo.name}
                onChange={handleChange}
              />
              <TextField
                label="Address"
                name="address"
                fullWidth
                margin="normal"
                value={shippingInfo.address}
                onChange={handleChange}
              />
              <TextField
                label="City"
                name="city"
                fullWidth
                margin="normal"
                value={shippingInfo.city}
                onChange={handleChange}
              />
              <TextField
                label="ZIP Code"
                name="zip"
                fullWidth
                margin="normal"
                value={shippingInfo.zip}
                onChange={handleChange}
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                fullWidth
                margin="normal"
                value={shippingInfo.phoneNumber}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleCheckout}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Checkout;