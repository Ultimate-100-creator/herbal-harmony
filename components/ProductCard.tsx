import React from 'react';
import type { Product } from '../types';
import { StarRating } from './StarRating';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg p-4 transition-transform transform hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col justify-between">
      <div className="flex-grow">
        <img 
          src={product.imageUrl}
          alt={product.name} 
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="font-bold text-gray-900">{product.name} • {product.type}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.details}</p>
      </div>
      <div className="mt-4">
        <div className="flex items-center space-x-1">
          <StarRating rating={product.rating} />
          <span className="text-sm text-gray-600 font-medium">{product.rating}/5</span>
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
        </div>
        <div className="flex items-baseline space-x-2 mt-2">
          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)} new</p>
        </div>
      </div>
    </div>
  );
};
