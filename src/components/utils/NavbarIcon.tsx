import React from "react";
import { IconType } from "react-icons";

type NavbarIconProps = {
  Icon: IconType;
  onClick?: () => void; // Optional onClick handler that takes no parameters and returns void
};

const NavbarIcon: React.FC<NavbarIconProps> = ({ Icon, onClick }) => {
  return (
    <Icon
      className="text-gray-700 cursor-pointer"
      size={25}
      onClick={onClick} // Assign the onClick handler to the onClick event of the icon
    />
  );
};

export default NavbarIcon;
