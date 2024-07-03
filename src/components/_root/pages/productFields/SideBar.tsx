import { FaLaptop, FaMobileAlt } from "react-icons/fa";
import { LiaTvSolid } from "react-icons/lia";
import { MdCardTravel } from "react-icons/md";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-white">
      <div className="flex bg-gray-100 overflow-x-hidden">
        <div className="bg-white lg:flex md:flex-col">
          <div className="flex-col pt-5 flex overflow-y-auto">
            <div className="h-full justify-between px-4 flex">
              <div className="space-y-4">
                <div className="space-y-1">
                  <NavLink
                    to="/laptops"
                    className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                  >
                    <span className="justify-center items-center flex gap-2">
                      <FaLaptop size={20} />
                      <span>Laptops</span>
                    </span>
                  </NavLink>
                  <NavLink
                    to="/tvs"
                    className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                  >
                    <span className="justify-center items-center flex gap-2">
                      <LiaTvSolid size={20} />

                      <span>Telivision</span>
                    </span>
                  </NavLink>

                  <NavLink
                    to="/phones"
                    className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                  >
                    <span className="justify-center items-center flex gap-2">
                      <FaMobileAlt size={20} />

                      <span>Mobile Phones</span>
                    </span>
                  </NavLink>
                  <NavLink
                    to="/accessories"
                    className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                  >
                    <span className="justify-center items-center flex gap-2">
                      <MdCardTravel size={20} />

                      <span>Accessories</span>
                    </span>
                  </NavLink>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
