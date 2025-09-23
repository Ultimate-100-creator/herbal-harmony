import React from 'react';
import { toast } from 'react-toastify';
import type { Product } from '../types';
import { useCart } from './CartContext';

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

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      <img src={product.imageUrls[0]} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.details}</p>
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <button onClick={handleAddToCart} className="bg-gray-900 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
