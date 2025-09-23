import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FooterLink: React.FC<{ to?: string; children: React.ReactNode; }> = ({ to = '#', children }) => (
    <li><Link to={to} className="text-gray-500 hover:text-gray-900 transition-colors">{children}</Link></li>
);
export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with your actual newsletter signup logic
    console.log('Signing up with email:', email);
    alert(`Thank you for signing up with ${email}!`);
    setEmail('');
  };
  return (
    <footer className="bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-100 rounded-lg p-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">Get ₦1,500 off your first order.</h3>
              <p className="text-gray-600">On orders of ₦25,000 or more, when you sign up for emails.</p>
            </div>
            <form onSubmit={handleSignup} className="mt-4 md:mt-0 flex w-full max-w-md">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button type="submit" className="bg-gray-800 text-white font-semibold px-6 py-2 rounded-r-md hover:bg-gray-900">Sign up</button>
            </form>
          </div>
          <Link to="/learn-more" className="text-sm text-gray-600 mt-2 inline-block">Learn more</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 py-12">
            <div>
                <h4 className="font-bold mb-4">About</h4>
                <ul className="space-y-2">
                    <FooterLink to="/about">About us</FooterLink>
                    <FooterLink to="/press">Press</FooterLink>
                    <FooterLink to="/impact">Our impact</FooterLink>
                    <FooterLink to="/accessibility">Accessibility</FooterLink>
                    {/* External link, so we use a standard <a> tag */}
                    <li><a href="https://www.trustpilot.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors">Trustpilot</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4">Help</h4>
                <ul className="space-y-2">
                    <FooterLink to="/contact">Contact us</FooterLink>
                    <FooterLink to="/help">Help Center</FooterLink>
                    <FooterLink to="/shipping">Shipping</FooterLink>
                    <FooterLink to="/returns">Returns</FooterLink>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4">Services</h4>
                <ul className="space-y-2">
                    <FooterLink to="/services/warranty">1-year warranty</FooterLink>
                    <FooterLink to="/services/protection">Protection plan</FooterLink>
                    <FooterLink to="/services/student-offer">Student offer</FooterLink>
                    <FooterLink to="/services/military-program">Military program</FooterLink>
                    <FooterLink to="/sellers">Sellers Portal</FooterLink>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4">Resources</h4>
                <ul className="space-y-2">
                    <FooterLink to="/journal">Herbal Journal</FooterLink>
                    <FooterLink to="/compare">Compare remedies</FooterLink>
                    <FooterLink to="/gifts">Gift ideas</FooterLink>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4">Law and order</h4>
                <ul className="space-y-2">
                    <FooterLink to="/terms">Terms of service</FooterLink>
                    <FooterLink to="/cookies">Cookies</FooterLink>
                    <FooterLink to="/privacy">Privacy Policy</FooterLink>
                    <FooterLink to="/report">Report</FooterLink>
                </ul>
            </div>
            <div className="flex flex-col items-center">
              {/* Certification Badges would go here */}
            </div>
        </div>

        <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2025 supplentiarx</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {/* App store links would go here */}
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer"><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-10"/></a>
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer"><img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="h-14"/></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
