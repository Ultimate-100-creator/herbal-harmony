import React, { useState } from 'react';

interface ProductImageGalleryProps {
  imageUrls: string[];
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ imageUrls }) => {
  const [mainImage, setMainImage] = useState(imageUrls[0]);

  if (!imageUrls || imageUrls.length === 0) {
    return <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">No Image</div>;
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-hidden">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Thumbnail ${index + 1}`}
            className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${mainImage === url ? 'border-green-500' : 'border-transparent'}`}
            onClick={() => setMainImage(url)}
            onMouseEnter={() => setMainImage(url)}
          />
        ))}
      </div>
      <div className="flex-1">
        <img src={mainImage} alt="Main product" className="w-full h-auto max-h-[500px] object-contain rounded-lg" />
      </div>
    </div>
  );
};