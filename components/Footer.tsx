
import React from 'react';

const FooterLink: React.FC<{ href?: string; children: React.ReactNode; }> = ({ href = '#', children }) => (
    <li><a href={href} className="text-gray-500 hover:text-gray-900 transition-colors">{children}</a></li>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-100 rounded-lg p-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">Get $15 off your first order.</h3>
              <p className="text-gray-600">On orders of $250 or more, when you sign up for emails.</p>
            </div>
            <form className="mt-4 md:mt-0 flex w-full max-w-md">
              <input type="email" placeholder="Email" className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
              <button type="submit" className="bg-gray-800 text-white font-semibold px-6 py-2 rounded-r-md hover:bg-gray-900">Sign up</button>
            </form>
          </div>
          <a href="#" className="text-sm text-gray-600 mt-2 inline-block">Learn more</a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 py-12">
            <div>
                <h4 className="font-bold mb-4">About</h4>
                <ul className="space-y-2">
                    <FooterLink>About us</FooterLink>
                    <FooterLink>Press</FooterLink>
                    <FooterLink>Our impact</FooterLink>
                    <FooterLink>Accessibility</FooterLink>
                    <FooterLink>Trustpilot</FooterLink>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4">Help</h4>
                <ul className="space-y-2">
                    <FooterLink>Contact us</FooterLink>
                    <FooterLink>Help Center</FooterLink>
                    <FooterLink>Shipping</FooterLink>
                    <FooterLink>Returns</FooterLink>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4">Services</h4>
                <ul className="space-y-2">
                    <FooterLink>1-year warranty</FooterLink>
                    <FooterLink>Protection plan</FooterLink>
                    <FooterLink>Student offer</FooterLink>
                    <FooterLink>Military program</FooterLink>
                    <FooterLink>Sellers Portal</FooterLink>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4">Resources</h4>
                <ul className="space-y-2">
                    <FooterLink>Herbal Journal</FooterLink>
                    <FooterLink>Compare remedies</FooterLink>
                    <FooterLink>Gift ideas</FooterLink>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4">Law and order</h4>
                <ul className="space-y-2">
                    <FooterLink>Terms of service</FooterLink>
                    <FooterLink>Cookies</FooterLink>
                    <FooterLink>Privacy Policy</FooterLink>
                    <FooterLink>Report</FooterLink>
                </ul>
            </div>
            <div className="flex flex-col items-center">
              {/* Certification Badges would go here */}
            </div>
        </div>

        <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2025 Herbal Harmony</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {/* App store links would go here */}
            <a href="#"><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-10"/></a>
            <a href="#"><img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="h-14"/></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
