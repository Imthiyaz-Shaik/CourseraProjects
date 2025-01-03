import React from 'react';
import '../styles/ShoppingCartPage.css';

const ShoppingCartPage = ({ cartItems, removeFromCart }) => {
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-header">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <p className="cart-item-title">{item.name}</p>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <p className="cart-total">Total: ${calculateTotal().toFixed(2)}</p>
        </>
      )}
    </div>
  );
};

export default ShoppingCartPage;
