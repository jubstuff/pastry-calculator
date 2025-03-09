// app/components/layout/Header.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <Link href="/" aria-label="Home">
            <h1 className="text-2xl font-bold">Pastry Calculator</h1>
          </Link>
        </div>
        
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" aria-current="page">
                <Button variant="ghost">Home</Button>
              </Link>
            </li>
            <li>
              <Link href="#recipes">
                <Button variant="ghost">Recipes</Button>
              </Link>
            </li>
            <li>
              <Link href="#about">
                <Button variant="ghost">About</Button>
              </Link>
            </li>
            <li>
              <Link href="#community">
                <Button variant="outline">Join community</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};