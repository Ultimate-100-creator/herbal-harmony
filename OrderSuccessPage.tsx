import React from 'react';
import { Link } from 'react-router-dom';
import { SvgIcon } from './components/Icon';

export const OrderSuccessPage: React.FC = () => {
  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
        <SvgIcon icon="check" className="w-12 h-12 text-green-600" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="text-gray-600 mb-8">
        Your order has been placed successfully. We've sent a confirmation email to you.
      </p>
      <Link
        to="/"
        className="bg-gray-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Continue Shopping
      </Link>
    </main>
  );
};