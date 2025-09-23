import { NavLink } from 'react-router-dom';
import { products } from '../constants';
import { ProductGrid } from './ProductGrid';

export const GoodDeals = () => {
    const goodDealsProducts = products.filter(p =>
        p.originalPrice && ((p.originalPrice - p.price) / p.originalPrice) >= 0.20
    );

    return (
        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-sm breadcrumbs mb-4">
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><a className="font-semibold">Good deals</a></li>
                </ul>
            </div>
            <h1 className="text-3xl font-bold mb-6">Good Deals</h1>
            <p className="text-lg text-gray-600 mb-8">Check out our products with a discount of 20% or more!</p>

            <ProductGrid products={goodDealsProducts} />
        </main>
    );
}