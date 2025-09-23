
import React from 'react';
import { SvgIcon } from './Icon';

const FilterButton: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium flex items-center justify-between hover:bg-gray-50 w-full sm:w-auto">
    {children}
    <SvgIcon icon="chevronDown" className="w-4 h-4 ml-2 text-gray-500" />
  </button>
);

export const FilterBar: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex flex-wrap gap-2">
        <FilterButton>Price</FilterButton>
        <FilterButton>Size (ml)</FilterButton>
        <FilterButton>Ingredient</FilterButton>
        <FilterButton>Benefit</FilterButton>
        <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium flex items-center hover:bg-gray-50">
          <SvgIcon icon="filter" className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>
      <div className="w-full sm:w-auto">
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none w-full">
            <option>Sort: Bestsellers</option>
            <option>Sort: Price Low to High</option>
            <option>Sort: Price High to Low</option>
            <option>Sort: Highest Rating</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <SvgIcon icon="chevronDown" className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
