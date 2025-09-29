// src/api/apiService.js

const API_URL = 'http://localhost:4000'; // Your backend URL

// Helper to handle API requests
const request = async (endpoint, method = 'GET', body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // Get token from localStorage and add it to the header
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};

// --- AUTH ---
export const login = (credentials) => request('/api/auth/login', 'POST', credentials);
export const register = (userData) => request('/api/auth/register', 'POST', userData);

// --- PRODUCTS ---
export const getProducts = () => request('/api/products');
export const getProductById = (id) => request(`/api/products/${id}`);

// 👇 ADD THIS NEW FUNCTION
export const addProduct = async (formData) => {
  const response = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add product');
  }
  return response.json();
};

export const getCart = () => request('/api/cart');
export const addToCart = (productId, quantity) => request('/api/cart/add', 'POST', { productId, quantity });
// FIX: Remove by cart item ID, use DELETE
export const removeFromCart = (cartItemId) => request(`/api/cart/${cartItemId}`, 'DELETE');

// --- CHECKOUT ---
export const checkout = () => request('/api/checkout', 'POST');