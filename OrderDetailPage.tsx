import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Order } from './OrdersPage';
import { useCart } from './components/CartContext';
import { toast } from 'react-toastify';

export const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Order not found');
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error(error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Loading Order...</h1>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Order Not Found</h1>
        <p>Sorry, we couldn't find the order you're looking for.</p>
        <Link to="/orders" className="text-green-600 hover:underline mt-4 inline-block">
          Back to My Orders
        </Link>
      </main>
    );
  }

  const handleReorder = () => {
    // In a real app, you might need to fetch full product details if not all are in the order object
    order.products.forEach(item => {
      addToCart(item, item.quantity);
    });
    toast.success('Previous order items have been added to your cart!');
    navigate('/cart');
  };

  const handleCancelOrder = async () => {
    try {
      const response = await fetch(`/api/cancel-order/${orderId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel order on the server.');
      }

      const result = await response.json();
      setOrder((prev) => (prev ? { ...prev, status: 'Cancelled' } : null));
      toast.warn(result.message);
    } catch (error) {
      console.error('Cancellation failed:', error);
      toast.error('Could not cancel the order. Please try again.');
    }
  };

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/orders">My Orders</Link></li>
          <li><span className="font-semibold">Order #{order.id}</span></li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-6 border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold">Order #{order.id}</h1>
            <p className="text-gray-500">Placed on {order.date}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-lg font-bold">
              {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(order.total)}
            </p>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium mt-1 ${
                order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}
            >
              {order.status}
            </span>
            <button
              onClick={handleReorder}
              className="mt-4 w-full bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={order.status === 'Cancelled'}
            >
              Re-order
            </button>
            {order.status === 'Processing' && (
              <button
                onClick={handleCancelOrder}
                className="mt-2 w-full bg-red-100 text-red-800 font-bold py-2 px-4 rounded-lg hover:bg-red-200 transition-colors text-sm"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Items in this order ({order.products.length})</h2>
            <div className="space-y-4">
              {order.products.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img src={item.imageUrls[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
            <div className="space-y-2 text-gray-700">
              <p className="font-semibold">Paul Ade</p>
              <p>123 Herbal Lane</p>
              <p>Lekki, Lagos, 105102</p>
              <p>Nigeria</p>
              <p className="mt-2 pt-2 border-t">paul.ade@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};