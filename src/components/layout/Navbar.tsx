"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold">
            Pastry Calculator
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/recipes" className="text-gray-700 hover:text-primary transition-colors">
              Recipes
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
          </nav>
        </div>
        
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
          Join community
        </Button>
      </div>
      
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white focus:z-50">
        Skip to main content
      </a>
    </header>
  );
}
