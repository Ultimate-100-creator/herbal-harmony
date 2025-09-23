import React, { useState } from 'react';
import { useCart } from './components/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usePaystackPayment } from 'react-paystack';

const InputField: React.FC<{
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
  label,
  id,
  type = 'text',
  required = true,
  value,
  onChange,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
      />
    </div>
  </div>
);

export const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email,
    amount: total * 100, // Paystack amount is in kobo (smallest currency unit)
    publicKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // IMPORTANT: Replace with your Paystack public key
    metadata: {
      name,
      phone,
      cartItems: cartItems.map(item => ({ id: item.id, name: item.name, quantity: item.quantity })),
    },
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const onSuccess = async (transaction: { reference: string }) => {
    try {
      // Send the reference to your backend for verification
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference: transaction.reference }),
      });

      if (!response.ok) {
        throw new Error('Payment verification failed on the server.');
      }

      const verificationData = await response.json();
      console.log('Server verification success:', verificationData);
      toast.success('Payment successful! Your order is being processed.');
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Verification failed:', error);
      toast.error('There was an issue verifying your payment. Please contact support.');
      setIsProcessing(false);
    }
  };

  const onClose = () => {
    toast.info('Payment modal closed.');
    setIsProcessing(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);
    initializePayment({ onSuccess, onClose });
  };

  if (cartItems.length === 0 && !isProcessing) {
    return (
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
        <p>You need to add items to your cart before you can check out.</p>
      </main>
    );
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4 bg-white p-6 rounded-lg shadow">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img src={item.imageUrls[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">
                  {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.price * item.quantity)}
                </p>
              </div>
            ))}
            <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>
                {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(total)}
              </p>
            </div>
          </div>
        </div>

        {/* Shipping & Payment */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping & Payment</h2>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div className="space-y-4">
              <InputField label="Full Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              <InputField label="Email Address" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <InputField label="Phone Number" id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <InputField label="Shipping Address" id="address" />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="City" id="city" />
                <InputField label="Postal Code" id="postalCode" />
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="text-lg font-semibold">Payment Details</h3>
              <InputField label="Card Number" id="cardNumber" />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Expiration Date (MM/YY)" id="expiry" />
                <InputField label="CVC" id="cvc" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : `Place Order - ${new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(total)}`}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};