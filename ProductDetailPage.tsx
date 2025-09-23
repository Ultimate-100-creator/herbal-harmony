import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { products, reviews } from './constants';
import { Rating } from './components/Rating';
import { ProductImageGallery } from '@/ProductImageGallery';
import { SvgIcon } from './components/Icon';
import { useCart } from './components/CartContext';
import { toast } from 'react-toastify';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${quantity} x ${product.name} added to cart!`);
    }
  };

  if (!product) {
    return (
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Product not found</h1>
        <p>Sorry, we couldn't find the product you're looking for.</p>
        <NavLink to="/" className="text-green-600 hover:underline mt-4 inline-block">Go back to homepage</NavLink>
      </main>
    );
  }

  const productReviews = reviews.filter(review => review.item.name === product.name);

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/supplements">Supplements</NavLink></li>
          <li><span className="font-semibold">{product.name}</span></li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <ProductImageGallery imageUrls={product.imageUrls} />

        {/* Product Info */}
        <div>
          <p className="text-sm font-semibold text-green-600 uppercase">{product.type}</p>
          <h1 className="text-4xl font-bold my-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <Rating rating={product.rating} />
            <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
          </div>
          <p className="text-3xl font-bold mb-2">
            {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(product.price)}
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through ml-3">
                {new Intl.NumberFormat('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                }).format(product.originalPrice)}
              </span>
            )}
            {discount > 0 && (
                <span className="ml-4 inline-block bg-red-100 text-red-600 text-sm font-semibold px-2 py-1 rounded-md">
                    {discount}% off
                </span>
            )}
          </p>
          <p className="text-gray-600 mb-6">{product.details}</p>

          <div className="flex items-center gap-4 mb-6">
            <label htmlFor="quantity" className="font-semibold">Quantity:</label>
            <div className="flex items-center border rounded-md">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1.5 text-lg hover:bg-gray-100 rounded-l-md">-</button>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-12 text-center border-l border-r focus:outline-none"
                min="1"
              />
              <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1.5 text-lg hover:bg-gray-100 rounded-r-md">+</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-gray-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <SvgIcon icon="cart" className="w-5 h-5" />
              Add to Cart
            </button>
            <button className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
              Subscribe & Save
            </button>
          </div>
        </div>
      </div>

      {/* Long Description */}
      {product.longDescription && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Product Details</h2>
          <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: product.longDescription }} />
        </div>
      )}

      {/* Reviews */}
      {productReviews.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Customer Reviews</h2>
          <div className="space-y-8">
            {productReviews.map(review => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 mr-3">
                    {review.initial}
                  </div>
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <p className="text-xs text-gray-500">{review.reviewDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Rating rating={review.rating} />
                  <p className="font-semibold">{review.item.name}</p>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};