import React, { useState } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { Footer } from './components/Footer';
import { ReviewSection } from './components/ReviewSection';
import { products, reviews } from './constants';
import { CartProvider } from './components/CartContext';
import { ProductCard } from './components/ProductCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { Product } from './types';
import {
  HashRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { GoodDeals } from './components/GoodDeals';
import { AncientRemedies } from './components/AncientRemedies';
import { Supplements } from './components/Supplements';
import { ProductDetailPage } from './ProductDetailPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const productsPerPage = 8;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <HashRouter>
      <CartProvider>
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
        <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <Routes>
          <Route path="/" element={
            <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-sm breadcrumbs mb-4">
                <ul>
                  <li><NavLink to="/">Home</NavLink></li>
                  <li><NavLink to="/supplements">Supplements</NavLink></li>
                  <li><span className="font-semibold">Tinctures</span></li>
                </ul>
              </div>
              <h1 className="text-3xl font-bold mb-6">Herbal Tinctures</h1>
              <FilterBar />

              <div className="bg-purple-100 border border-purple-200 rounded-lg p-6 flex items-center gap-6 my-8">
                <img src="https://picsum.photos/seed/herbs/120/80" alt="Herbal products" className="rounded-md w-32 h-20 object-cover hidden sm:block" />
                <div>
                  <p className="font-semibold text-purple-800">Herbal Remedies</p>
                  <h2 className="text-xl font-bold my-1">How much do our herbal tinctures cost?</h2>
                  <p className="text-gray-600">In 2024, our herbal tinctures start at $12.00, but prices vary based on ingredients, size, and formulation.</p>
                </div>
                <button className="ml-auto bg-white border border-gray-300 rounded-md px-6 py-2 font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                  See more
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 my-12">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    aria-label="Go to previous page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-4 py-2 rounded-md text-sm font-semibold ${currentPage === i + 1 ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-100'}`}
                      aria-current={currentPage === i + 1 ? 'page' : undefined}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    aria-label="Go to next page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                  </button>
                </div>
              )}

              <hr className="my-12" />

              <ReviewSection reviews={reviews} />

            </main>
          } />
          <Route path="/good-deals" element={<GoodDeals />} />
          <Route path="/ancient-remedies" element={<AncientRemedies />} />
          <Route path="/supplements" element={<Supplements />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
          <Footer />
          <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
        </div>
      </CartProvider>
    </HashRouter>
  );
};

export default App;