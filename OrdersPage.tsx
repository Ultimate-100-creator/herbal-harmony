import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, Link } from 'react-router-dom';
import type { OrderProduct } from './types';

export interface Order {
  id: number;
  date: string;
  total: number;
  products: OrderProduct[];
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

const ORDERS_PER_PAGE = 5;

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  // Get unique years for the filter dropdown
  const availableYears = useMemo(() => {
    const years = new Set(orders.map(order => new Date(order.date).getFullYear().toString()));
    return ['all', ...Array.from(years).sort((a, b) => Number(b) - Number(a))];
  }, [orders]);

  // Filtering logic
  const filteredOrders = useMemo(() => {
    let tempOrders = orders;
    if (filterYear !== 'all') {
      tempOrders = tempOrders.filter(order => new Date(order.date).getFullYear().toString() === filterYear);
    }
    if (searchQuery) {
      tempOrders = tempOrders.filter(order =>
        order.products.some(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    return tempOrders;
  }, [orders, filterYear, searchQuery]);

  // Sorting logic
  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [filteredOrders, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(sortedOrders.length / ORDERS_PER_PAGE);
  const indexOfLastOrder = currentPage * ORDERS_PER_PAGE;
  const indexOfFirstOrder = indexOfLastOrder - ORDERS_PER_PAGE;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'desc' ? 'asc' : 'desc'));
    setCurrentPage(1); // Reset to first page on sort
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterYear(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  if (orders.length === 0) {
    return (
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">No Orders Yet</h1>
        <p>You haven't placed any orders yet.</p>
        <NavLink to="/" className="text-green-600 hover:underline mt-4 inline-block">
          Continue Shopping
        </NavLink>
      </main>
    );
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <label htmlFor="search-filter" className="sr-only">Search in orders</label>
            <input
              type="text"
              id="search-filter"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search in orders..."
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div>
            <label htmlFor="year-filter" className="text-sm font-medium text-gray-700 mr-2">Filter by Year:</label>
            <select
              id="year-filter"
              value={filterYear}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>
                  {year === 'all' ? 'All Years' : year}
                </option>
              ))}
            </select>
          </div>
          <button onClick={toggleSortOrder} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold hover:bg-gray-100 transition-colors">
            Sort: {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentOrders.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-no-wrap font-medium text-gray-900">#{order.id}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{order.date}</td><td className="px-6 py-4 whitespace-no-wrap">{order.products.length}</td>
                <td className="px-6 py-4 whitespace-no-wrap font-semibold">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(order.total)}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-right text-sm font-medium"><Link to={`/orders/${order.id}`} className="text-green-600 hover:text-green-900">View Details</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 my-8">
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
              className={`px-4 py-2 rounded-md text-sm font-semibold ${currentPage === i + 1 ? 'bg-gray-900 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
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
    </main>
  );
};