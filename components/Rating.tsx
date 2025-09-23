import React from 'react';
import { SvgIcon } from './Icon';

interface RatingProps {
  rating: number;
  maxRating?: number;
}

export const Rating: React.FC<RatingProps> = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex items-center">
      {[...Array(maxRating)].map((_, i) => {
        const starValue = i + 1;
        return (
          <SvgIcon
            key={i}
            icon="star"
            className={`w-5 h-5 ${starValue <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        );
      })}
    </div>
  );
};