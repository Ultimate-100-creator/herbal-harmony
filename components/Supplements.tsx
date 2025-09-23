import { NavLink } from "react-router-dom";

export const Supplements = () => {
    return (
        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-sm breadcrumbs mb-4">
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><a className="font-semibold">Supplements</a></li>
                </ul>
            </div>
            <h1 className="text-3xl font-bold mb-6">Supplements</h1>
            <p>Browse our wide range of supplements.</p>
        </main>
    );
}