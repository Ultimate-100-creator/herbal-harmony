
export interface Product {
  id: number;
  name: string;
  type: string;
  details: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  imageUrls: string[];
  longDescription?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: number;
  author: string;
  initial: string;
  date: string;
  rating: number;
  comment: string;
  images: string[];
  item: {
    name: string;
    details: string;
    imageUrl: string;
  };
  condition: string;
  reviewDate: string;
}
