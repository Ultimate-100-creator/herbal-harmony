import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const TrackOrderPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!orderId.trim()) {
      toast.error('Please enter an Order ID.');
      return;
    }
    // In a real app, you'd verify the email against the order ID here.
    // For now, we'll just navigate to the status page.
    navigate(`/order-status/${orderId}`);
  };

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Track Your Order</h1>
        <p className="text-gray-600 mb-6 text-center">
          Enter your order ID to see the status of your order.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
              Order ID
            </label>
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g., 1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Track Order
          </button>
        </form>
      </div>
    </main>
  );
};