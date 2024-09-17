import React, { useContext } from 'react';
import { Button, Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Layout from '../components/Layout/Layout';

const Cart = () => {
  const { cartItems, removeFromCart, calculateTotal, itemsOver100 } = useContext(CartContext);

  return (
    <Layout>
      <Grid container spacing={3}>
        {/* Cart Items Section */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Your Shopping Cart
              </Typography>
              {cartItems.length === 0 ? (
                <Typography variant="body1">Your cart is empty</Typography>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <img 
                              src={`http://localhost:4000/images/${item.image}`} 
                              alt={item.name} 
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                            />
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell align="right">${item.price}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                          <TableCell align="right">
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Typography variant="body1">
                Total: Rs.{calculateTotal().toFixed(2)}
              </Typography>
              {itemsOver100.length > 0 && (
                <>
                  <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Items costing more than $100:
                  </Typography>
                  <ul>
                    {itemsOver100.map(item => (
                      <li key={item.id}>{item.name} - ${item.price}</li>
                    ))}
                  </ul>
                </>
              )}
              <Divider sx={{ my: 2 }} />
              
              {/* Go to Home Button */}
              <Button 
                component={Link} 
                to="/" 
                variant="contained" 
                sx={{ mt: 2, bgcolor: 'goldenrod', color: 'black', width: '100%' }}
              >
                Go to Home
              </Button>
              
              {/* Checkout Button */}
              <Button 
                component={Link} 
                to="/checkout" 
                variant="contained" 
                sx={{ mt: 2, bgcolor: 'green', color: 'white', width: '100%' }}
              >
                Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Cart;