import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideBar from "../_root/pages/productFields/SideBar";
import Breadcrumbs from "./Breadcrumbs";

const MainLayout = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex pt-8">
        <SideBar />
        <div className="flex flex-grow flex-col pt-8 ">
          <Breadcrumbs />
          <div className="flex-grow">
            <Outlet />
        </div>
          </div>
      </div>
    </div>
  );
};

export default MainLayout;
