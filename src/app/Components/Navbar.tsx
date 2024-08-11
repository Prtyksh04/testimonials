"use client"
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-50 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className='flex items-center justify-between'>
              <img src="./next.svg" alt="nextjs logo" height={50} width={50}  className='mr-2'/>
              <h1 className="text-2xl font-bold">Pulse</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-60 flex items-baseline space-x-12">
                <a href="#" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-md font-medium">Home</a>
                <a href="#" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-md font-medium">Documentation</a>
                <a href="#" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-md font-medium">Services</a>
                <a href="#" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-md font-medium">Contact</a>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" xmlns="../../public/preview.png" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="C:\Users\PRTYKSH\Documents\PROJECTS\AUTH\Client\my-app\public\preview.png" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#" className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">About</a>
            <a href="#" className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Services</a>
            <a href="#" className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
