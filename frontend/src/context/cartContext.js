// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';
import { getCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart } from '../api/apiService';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  const fetchCart = async () => {
  try {
    const cartData = await getCart();
    setCartItems(cartData); // Backend returns array
    setItemCount(cartData.reduce((sum, item) => sum + item.quantity, 0));
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    setCartItems([]);
    setItemCount(0);
  }
};

const addToCart = async (productId, quantity) => {
  await apiAddToCart(productId, quantity);
  fetchCart();
};

// FIX: Remove by cart item ID
const removeFromCart = async (cartItemId) => {
  await apiRemoveFromCart(cartItemId);
  fetchCart();
};

  return (
    <CartContext.Provider value={{ cartItems, itemCount, fetchCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);