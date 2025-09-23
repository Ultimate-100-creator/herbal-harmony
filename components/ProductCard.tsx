import React from 'react';
import { toast } from 'react-toastify';
import type { Product } from '../types';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

/**
 * A reusable component to display a single product.
 * It provides an "Add to Cart" button that uses the CartContext
 * to add the product to the cart and shows a toast notification.
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/product/${product.id}`} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col group">
      <div className="overflow-hidden">
        <img src={product.imageUrls[0]} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold group-hover:text-green-600 transition-colors">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 flex-grow">{product.details}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="text-xl font-bold">
            {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(product.price)}
          </div>
          <button onClick={handleAddToCart} className="bg-gray-900 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap z-10 relative">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};
