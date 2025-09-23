import React from 'react';
import { useCart } from './components/CartContext';
import { NavLink, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { CartItem } from './types';

export const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (item: CartItem) => {
    removeFromCart(item.id);
    toast.error(`${item.name} removed from cart`);
  };

  if (cartItems.length === 0) {
    return (
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <NavLink to="/" className="text-green-600 hover:underline mt-4 inline-block">
          Continue Shopping
        </NavLink>
      </main>
    );
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <img src={item.imageUrls[0]} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
              <div>
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-600">
                  {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.price)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1.5 text-lg hover:bg-gray-100 rounded-l-md"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  className="w-12 text-center border-l border-r focus:outline-none"
                  min="1"
                />
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1.5 text-lg hover:bg-gray-100 rounded-r-md"
                >
                  +
                </button>
              </div>
              <p className="font-semibold w-24 text-right">
                {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.price * item.quantity)}
              </p>
              <button
                onClick={() => handleRemove(item)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <h2 className="text-2xl font-bold">
          Total: {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(total)}
        </h2>
        <Link to="/checkout" className="mt-4 inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors">
          Checkout
        </Link>
      </div>
    </main>
  );
};