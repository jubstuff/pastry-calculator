import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pastry Recipe Calculator',
  description: 'Scale your pastry recipes with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Skip link for keyboard navigation */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        <header className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div>
              <a href="/" aria-label="Home">
                <h1 className="text-2xl font-bold">Pastry Calculator</h1>
              </a>
            </div>
            
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="/" className="px-4 py-2 rounded hover:bg-gray-100">Home</a>
                </li>
                <li>
                  <a href="#recipes" className="px-4 py-2 rounded hover:bg-gray-100">Recipes</a>
                </li>
                <li>
                  <a href="#about" className="px-4 py-2 rounded hover:bg-gray-100">About</a>
                </li>
                <li>
                  <a href="#community" className="px-4 py-2 border rounded px-4 py-2">Join community</a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main id="main-content">
          {children}
        </main>
        
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
                    <a href="/" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#recipes" className="hover:underline">
                      Recipes
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="hover:underline">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#community" className="hover:underline">
                      Join community
                    </a>
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
      </body>
    </html>
  )
}