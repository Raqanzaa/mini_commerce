// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/cartContext';

const Header = () => {
  const { user, logout } = useAuth(); // <-- 'user' now contains role info
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <Link to="/" className="logo">E-Commerce</Link>
      <nav>
        <Link to="/">Home</Link>
        {/* 👇 Conditionally render admin link */}
        {user && user.role === 'admin' && (
          <Link to="/add-product">Add Product</Link>
        )}
        {user ? (
          <>
            <Link to="/cart">Cart ({itemCount})</Link>
            <button onClick={handleLogout} className="nav-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;