// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import AddProductPage from './pages/AddProductPage'; // <-- Import the new page
import AdminRoute from './components/AdminRoute';   // <-- Import the admin route guard
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Admin-Only Routes */}
          <Route path="/add-product" element={<AdminRoute />}>
            <Route path="" element={<AddProductPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;