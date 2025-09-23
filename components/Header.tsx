
import React from 'react';
import { Icon, SvgIcon } from './Icon';
import { NavLink, Link } from 'react-router-dom';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="bg-gray-100 text-xs text-gray-600">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-8 items-center">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-900">Certified Organic</a>
            <a href="#" className="hover:text-gray-900">Our Process</a>
            <a href="#" className="hover:text-gray-900">Sustainable Sourcing</a>
            <a href="#" className="hover:text-gray-900">Herbal Journal</a>
          </div>
          <div className="flex items-center space-x-2">
            <Icon icon="ngFlag" className="w-5 h-auto border border-gray-200"/>
            <span>NG</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              supplentia<span className="text-green-600">rx</span>
            </Link>
          </div>
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SvgIcon icon="search" className="w-5 h-5 text-gray-400" />
              </span>
              <input 
                type="text"
                placeholder="What are you looking for?"
                className="w-full bg-gray-100 rounded-md py-2.5 pl-10 pr-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={onSearchChange}
              />
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm font-semibold">
            <a href="#" className="border border-gray-800 rounded-md px-4 py-2 hover:bg-gray-100 transition-colors flex items-center gap-2">
              <SvgIcon icon="tradeIn" className="w-5 h-5" />
              <span>Subscribe</span>
            </a>
            <a href="#" className="hover:text-green-600">Need help?</a>
            <a href="#" className="p-2 hover:bg-gray-100 rounded-full"><SvgIcon icon="user" className="w-6 h-6" /></a>
            <a href="#" className="p-2 hover:bg-gray-100 rounded-full"><SvgIcon icon="cart" className="w-6 h-6" /></a>
          </div>
        </div>
      </div>
      
      <div className="border-t">
        <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-8 h-12 text-sm font-semibold">
          <NavLink to="/good-deals" className={({ isActive }) => isActive ? 'text-green-600 border-b-2 border-green-600 h-full flex items-center' : 'text-gray-600 hover:text-gray-900 h-full flex items-center'}>Good deals</NavLink>
          <NavLink to="/ancient-remedies" className={({ isActive }) => isActive ? 'text-green-600 border-b-2 border-green-600 h-full flex items-center' : 'text-gray-600 hover:text-gray-900 h-full flex items-center'}>Ancient Remedies</NavLink>
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-green-600 border-b-2 border-green-600 h-full flex items-center' : 'text-gray-600 hover:text-gray-900 h-full flex items-center'}>Tinctures</NavLink>
          <NavLink to="/supplements" className={({ isActive }) => isActive ? 'text-green-600 border-b-2 border-green-600 h-full flex items-center' : 'text-gray-600 hover:text-gray-900 h-full flex items-center'}>Supplements</NavLink>
          <a href="#" className="text-gray-600 hover:text-gray-900">Teas</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Body Care</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Bundles</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">More</a>
        </nav>
      </div>
    </header>
  );
};
