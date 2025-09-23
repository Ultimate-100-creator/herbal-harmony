import { NavLink } from "react-router-dom";

export const AncientRemedies = () => {
    return (
        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-sm breadcrumbs mb-4">
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><a className="font-semibold">Ancient Remedies</a></li>
                </ul>
            </div>
            <h1 className="text-3xl font-bold mb-6">Ancient Remedies</h1>
            <p>Explore our ancient remedies...</p>
        </main>
    );
}