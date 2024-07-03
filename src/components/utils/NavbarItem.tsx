import React from 'react';
import { Link } from 'react-router-dom';

type NavbarItemProps = {
  to: string;
  label: string;
  onClick: () => void;
};

const NavbarItem: React.FC<NavbarItemProps> = ({ to, label, onClick }) => {
  return (
    <li>
      <Link
        to={to}
        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-dark md:dark:hover:bg-transparent dark:border-gray-700"
        onClick={onClick}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavbarItem;
