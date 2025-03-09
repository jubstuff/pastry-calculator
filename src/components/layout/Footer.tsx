// app/components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">About us</h3>
            <p className="text-gray-600 mb-4">
              We provide easy-to-use tools for home bakers, with a focus on
              accessibility and usability for all age groups.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="text-gray-600 hover:text-primary transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-600 hover:text-primary transition-colors">
                  Join community
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <p className="text-gray-600 mb-2">
              Email: hello@pastrycalculator.com
            </p>
            <p className="text-gray-600 mb-4">
              Join our mailing list for new recipes and features.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="border-gray-300"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm mt-12">
          © {new Date().getFullYear()} Pastry Calculator. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
