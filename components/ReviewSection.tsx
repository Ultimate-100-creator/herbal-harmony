import React from 'react';
import type { Review } from '../types';
import { StarRating } from './StarRating';
import { ReviewCard } from './ReviewCard';

interface ReviewSectionProps {
  reviews: Review[];
}

const RatingFilter: React.FC = () => {
    const filters = [
        { label: 'All', value: 100 },
        { label: '4-5', value: 89 },
        { label: '3-4', value: 5 },
        { label: '2-3', value: 2 },
        { label: '1-2', value: 4 },
    ];

    return (
        <div className="w-full md:w-1/4 pr-8">
            <h3 className="font-semibold mb-4">Filter by stars</h3>
            <div className="space-y-3">
                {filters.map((filter, index) => (
                    <div key={filter.label} className="flex items-center">
                        <input type="radio" id={`filter-${filter.label}`} name="ratingFilter" defaultChecked={index === 0} className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"/>
                        <label htmlFor={`filter-${filter.label}`} className="ml-3 min-w-0 flex-1 text-gray-500 flex items-center justify-between">
                            <span>{filter.label}</span>
                            <div className="w-1/2 bg-gray-200 rounded-full h-1.5 ml-4">
                                <div className="bg-gray-800 h-1.5 rounded-full" style={{ width: `${filter.value}%` }}></div>
                            </div>
                            <span className="ml-4 text-right w-10">{filter.value}%</span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};


export const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Refurbished Tinctures customer reviews</h2>
      <div className="flex items-center space-x-2 text-gray-600 mb-8">
        <StarRating rating={4.6} />
        <span className="font-bold text-gray-800">4.6/5</span>
        <span>945 verified reviews in the last 10 years.</span>
      </div>
      
      {/* Top reviews section would go here, simplified for brevity */}

      <div className="flex flex-col md:flex-row mt-12">
        <RatingFilter />
        <div className="w-full md:w-3/4 mt-8 md:mt-0">
          {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
        </div>
      </div>
    </section>
  );
};
