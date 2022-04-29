import React from "react";
import { useLocation } from "react-router-dom";

const SideNavSecondary = () => {
  const location = useLocation();

  const { pathname } = location;

  return (
    <div className="Dashboard position-fixed">
      <div className="mt-5">
        <h5 className="pt-5 pb-4 text-start ps-4">
          {pathname === "/dashboard/cars" ? "CARS" : "Dashboard"}
        </h5>
        <p className="fw-bold text-start ps-3 mt-4 block_act2 py-3">
          {pathname === "/dashboard/cars" ? "List Car" : "Dashboard"}
        </p>
      </div>
    </div>
  );
};

export default SideNavSecondary;
