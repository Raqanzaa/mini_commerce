import { useEffect } from 'react';
import { useCart } from '../context/cartContext';
import { useAuth } from '../context/authContext';
import { checkout } from '../api/apiService';

const API_URL = 'http://localhost:4000';

const CartPage = () => {
  const { cartItems, fetchCart, removeFromCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user, fetchCart]);
  
  const handleCheckout = async () => {
    try {
      const result = await checkout();
      alert(result.message);
      fetchCart(); // Refresh the cart (it should be empty now)
    } catch (error) {
      alert(`Checkout failed: ${error.message}`);
    }
  };

  if (!user) return <p>Please log in to view your cart.</p>;
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  const totalPrice = cartItems.reduce((total, item) => {
    const price = Number(item?.product?.price) || 0;
    const quantity = Number(item?.quantity) || 0;
    return total + price * quantity;
  }, 0);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={`${API_URL}${item.product.image}`} alt={item.product.name} />
          <div>
            <h3>{item.product.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.product.price}</p>
          </div>
          <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
        </div>
      ))}
      <div className="cart-summary">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;