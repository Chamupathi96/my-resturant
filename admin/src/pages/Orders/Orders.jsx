// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from './../../assets/assets';

// eslint-disable-next-line react/prop-types
const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const DELIVERY_CHARGE = 2;

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, { orderId, status: newStatus });
      if (response.data.success) {
        toast.success("Order status updated");
        fetchAllOrders(); // Refresh the order list after update
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className='orders-container'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order, index) => {
            const totalQuantity = order.items.reduce((acc, item) => acc + item.quantity, 0);
            const totalAmount = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0 + DELIVERY_CHARGE  );
            
            return (
              <div key={index} className='order-item'>
                <img src={assets.parcel_icon} alt="Parcel Icon" className='order-item-icon' />
                <div className="order-details">
                  <p className="order-item-name">
                    {order.address.name}
                  </p>

                  <div className='order-item-address'>
                    <p>{order.address.address}</p>
                    <p>{order.address.city}, {order.address.zip}</p>
                    <p>Phone: {order.address.phoneNumber}</p>
                  </div>

                  <p className='order-item-food'>
                    {order.items.map((item, itemIndex) => (
                      <span key={itemIndex}>
                        {item.name} x {item.quantity}{itemIndex < order.items.length - 1 && ', '}
                      </span>
                    ))}
                  </p>

                  <div className='order-summary'>
                    <p>Total Quantity: {totalQuantity}</p>
                    <p>Total Amount: ${totalAmount.toFixed(2)}</p>

                    {/* Add the select tag after total amount */}
                    <select 
                      className='order-status-select'
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Orders;