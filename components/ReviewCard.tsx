import React from 'react';
import type { Review } from '../types';
import { StarRating } from './StarRating';
import { SvgIcon } from './Icon';

interface ReviewCardProps {
    review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className="border-b py-8">
            <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold mr-4">
                    {review.initial}
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold">{review.author}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                        <div className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
                            <SvgIcon icon="check" className="w-4 h-4 mr-1"/>
                            Verified purchase
                        </div>
                    </div>
                    <div className="flex items-center my-3">
                        <StarRating rating={review.rating} />
                        <span className="ml-2 font-bold">{review.rating}/5</span>
                    </div>
                    
                    {review.images.length > 0 && (
                        <div className="flex space-x-2 my-4">
                            {review.images.map((img, index) => (
                                <img key={index} src={img} alt={`Review image ${index + 1}`} className="w-32 h-32 object-cover rounded-md" />
                            ))}
                        </div>
                    )}
                    
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>

                    <div className="mt-6 flex items-center space-x-6 text-sm">
                        <div className="flex items-center">
                            <p className="text-gray-500 mr-4">Item</p>
                            <img src={review.item.imageUrl} alt={review.item.name} className="w-10 h-10 object-cover rounded-md mr-2" />
                            <p>{review.item.name} - {review.item.details}</p>
                        </div>
                         <div className="flex items-center">
                            <p className="text-gray-500 mr-2">Condition</p>
                            <span className="font-semibold">{review.condition}</span>
                            <SvgIcon icon="info" className="w-4 h-4 ml-1 text-gray-400" />
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-6">{review.reviewDate}</p>
                </div>
            </div>
        </div>
    );
};
