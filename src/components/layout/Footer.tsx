// app/components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">About us</h2>
            <p className="mb-4">
              We provide easy-to-use tools for home bakers, with a focus on 
              accessibility and usability for all age groups.
            </p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#recipes" className="hover:underline">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="#community" className="hover:underline">
                  Join community
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <p>Email: hello@pastrycalculator.com</p>
            <p>Join our mailing list for new recipes and features.</p>
            <form className="mt-4">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="flex">
                <input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  className="flex-grow rounded-l border border-gray-300 px-4 py-2"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r"
                  aria-label="Subscribe"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Pastry Calculator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};