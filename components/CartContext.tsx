import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Product, CartItem } from '../types';

/**
 * Defines the shape of the cart context, including the cart items
 * and the function to add a product to the cart.
 */
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
}

// Create the context with an undefined initial value.
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Provides the cart context to its children. It manages the cart's state
 * and provides the `addToCart` function.
 */
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // If item already exists, increment its quantity
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Otherwise, add the new item with a quantity of 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  return <CartContext.Provider value={{ cartItems, addToCart }}>{children}</CartContext.Provider>;
};

/**
 * Custom hook to use the cart context.
 * Throws an error if used outside of a CartProvider.
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};