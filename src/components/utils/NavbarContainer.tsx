import React, { ReactNode } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

type NavbarContainerProps = {
  children: ReactNode;
  isOpen: boolean;
  toggleMenu: () => void;
};

const NavbarContainer: React.FC<NavbarContainerProps> = ({ children, isOpen, toggleMenu }) => {
  return (
    <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl container mx-auto px-4 py-2 flex justify-between">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-dark">
          TechStack
        </span>
        <div className="flex gap-4 items-center">
          {children}
          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarContainer;
