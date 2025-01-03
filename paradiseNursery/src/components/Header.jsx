import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ cartCount }) => {
  return (
    <header className="header-container">
      <h1>Plant Shop</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/cart">
              Cart {cartCount > 0 && <span>({cartCount})</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
