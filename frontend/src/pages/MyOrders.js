import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import Layout from '../components/Layout/Layout';
import "../styles/MyOrders.css";

const MyOrders = () => {
  const { url, token } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  // Wrap fetchOrders in useCallback to ensure it’s stable
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.post(`${url}/api/order/userorders`, {}, {
        headers: { token }
      });
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Failed to fetch orders.');
    }
  }, [url, token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleTrackOrder = async (orderId) => {
    try {
      await fetchOrders(); // Refresh orders to get the updated status
    } catch (error) {
      setError('Failed to refresh order status.');
    }
  };

  return (
    <Layout>
      <div className="my-orders-container">
        <h2>My Orders</h2>
        {error && <p className="error-message">{error}</p>}
        <table className="orders-table">
          <thead>
            <tr>
              <th>Food Item</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Track Order</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.items.map(item => item.name).join(', ')}</td>
                <td>{order.items.reduce((total, item) => total + item.quantity, 0)}</td>
                <td>${order.amount.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => handleTrackOrder(order._id)}>Track Order</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default MyOrders;