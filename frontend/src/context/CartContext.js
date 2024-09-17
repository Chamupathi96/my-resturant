import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const url = "http://localhost:4000";

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  const addToCart = async (item) => {
    try {
      await axios.post(`${url}/api/cart/add`, { itemId: item.id }, {
        headers: {
          token: token
        }
      });

      setCartItems((prevItems) => {
        const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          return prevItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          return [...prevItems, { ...item, quantity: 1 }];
        }
      });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.post(`${url}/api/cart/remove`, { itemId: id }, {
        headers: {
          token: token
        }
      });

          setCartItems((prevItems) => {
        const existingItem = prevItems.find((cartItem) => cartItem.id === id);
        if (existingItem.quantity > 1) {
          return prevItems.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
        } else {
          return prevItems.filter((cartItem) => cartItem.id !== id);
        }
      });
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const itemsOver100 = cartItems.filter(item => item.price > 100);

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, calculateTotal, clearCart, itemsOver100, url, token, setToken, logout }}>
      {children}
    </CartContext.Provider>
  );
};