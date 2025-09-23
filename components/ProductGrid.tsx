<<<<<<< HEAD
=======

>>>>>>> f662d2a163fad1ffeb124f7467026e00b46cfaa1
import React from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
<<<<<<< HEAD
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
=======
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
>>>>>>> f662d2a163fad1ffeb124f7467026e00b46cfaa1
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> f662d2a163fad1ffeb124f7467026e00b46cfaa1
