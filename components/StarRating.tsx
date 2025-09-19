import React, { useId } from 'react';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  className?: string;
}

const Star: React.FC<{ filled: number; uniqueId: string }> = ({ filled, uniqueId }) => {
  const gradientId = `grad-${uniqueId}`;
  const fillPercentage = Math.round(filled * 100);

  return (
    <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg" 
        aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId}>
          <stop offset={`${fillPercentage}%`} stopColor="currentColor" />
          <stop offset={`${fillPercentage}%`} stopColor="currentColor" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path 
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5, className = 'text-gray-800' }) => {
  const baseId = useId();
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    let filled = 0;
    if (i <= rating) {
      filled = 1; // full star
    } else if (i > rating && i - 1 < rating) {
      filled = rating % 1; // partial star
    }
    stars.push(<Star key={i} filled={filled} uniqueId={`${baseId}-${i}`} />);
  }

  return (
    <div className={`flex items-center ${className}`} role="img" aria-label={`Rating: ${rating} out of ${totalStars} stars.`}>
      {stars}
    </div>
  );
};
