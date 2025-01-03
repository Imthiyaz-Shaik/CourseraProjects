import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ProductListingPage from './pages/ProductListingPage';
import ShoppingCartPage from './pages/ShoppingCartPage';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      if (prevItems.some((item) => item.id === product.id)) return prevItems; // Avoid duplicates
      return [...prevItems, product];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <Header cartCount={cartItems.length} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/products"
          element={<ProductListingPage addToCart={addToCart} cartItems={cartItems} />}
        />
        <Route
          path="/cart"
          element={
            <ShoppingCartPage cartItems={cartItems} removeFromCart={removeFromCart} />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
