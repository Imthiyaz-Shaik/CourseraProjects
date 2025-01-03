import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductListingPage.css';

const ProductListingPage = ({ addToCart, cartItems }) => {
  const navigate = useNavigate();
  const products = [
    { id: 1, name: 'Fiddle Leaf Fig', price: 25.99, image: '/assets/fiddle-leaf.webp' },
    { id: 2, name: 'Snake Plant', price: 19.99, image: '/assets/snakePlant.jpeg' },
    { id: 3, name: 'Peace Lily', price: 15.99, image: '/assets/peaceLily.jpeg' },
    { id: 4, name: 'Aloe Vera', price: 10.99, image: '/assets/aloevera.jpeg' },
    { id: 5, name: 'Spider Plant', price: 12.99, image: '/assets/spiderplant.jpeg' },
    { id: 6, name: 'Rubber Plant', price: 18.99, image: '/assets/rubberplant.jpeg' },
    { id: 7, name: 'Boston Fern', price: 14.99, image: '/assets/bostonfern.jpeg' },
    { id: 8, name: 'Areca Palm', price: 22.99, image: '/assets/arecapalm.jpeg' },
    { id: 9, name: 'Monstera', price: 24.99, image: '/assets/monstera.jpeg' },
    { id: 10, name: 'Jade Plant', price: 9.99, image: '/assets/jadeplant.jpeg' },
  ];
  

  const isInCart = (productId) => cartItems.some((item) => item.id === productId);

  return (
    <div className="product-listing-container">
      <h1>Product Listing</h1>
      <div className="cart-summary">
        <p>Items in Cart: {cartItems.length}</p>
      </div>
      <div className="product-listing-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
            {isInCart(product.id) ? (
              <button onClick={() => navigate('/cart')}>Go to Cart</button>
            ) : (
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;
