import React from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:4000';

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      {/* Corrected the link to be singular 'product' to match routing */}
      <Link to={`/product/${product.id}`}>
        <img src={`${API_URL}${product.image}`} alt={product.name} className="card-img" />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;