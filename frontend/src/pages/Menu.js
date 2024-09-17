import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import Layout from '../components/Layout/Layout';
import '../styles/Menu.css';

const Menu = () => {
  const { addToCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState('Salad');
  const [menuItems, setMenuItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch food list from the backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/food/list');
        const data = await response.json();
        if (data.success) {
          // Grouping menu items by category
          const groupedItems = data.data.reduce((acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
          }, {});
          setMenuItems(groupedItems);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Error fetching menu items');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddToCart = (item) => {
    addToCart({
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className="menu-page">
        <div className="menu-categories">
          {Object.keys(menuItems).map((category) => (
            <button 
              key={category} 
              className={`category-button ${selectedCategory === category ? 'active' : ''}`} 
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="menu-content">
          {Object.keys(menuItems).map((category) => (
            selectedCategory === category && (
              <div key={category} className="menu-section">
                <h2>{category}</h2>
                <div className="menu-items">
                  {menuItems[category].length ? (
                    menuItems[category].map((item) => (
                      <div key={item._id} className="menu-item">
                        <img 
                          src={`http://localhost:4000/images/${item.image}`} 
                          alt={item.name} 
                          className="menu-item-image" 
                        />
                        <div className="menu-item-details">
                          <h3>{item.name}</h3>
                          <p>{item.description}</p>
                          <p className="menu-item-price">$.{item.price.toFixed(2)}</p>
                          <button onClick={() => handleAddToCart(item)} className="order-button">Order now</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No items available in this category.</p>
                  )}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Menu;