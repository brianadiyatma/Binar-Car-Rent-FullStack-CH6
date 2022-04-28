import React from "react";
import "./style.css";
import { useLocation } from "react-router-dom";

import truck from "./img/fi_truck.svg";
import home from "./img/home.svg";
import logo from "./img/logo2.png";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  const location = useLocation();


  const { pathname } = location;




  return (
    <div className="sideNav fixed-top">
      <div className="mt-2">
        <img src={logo} alt="" className="mx-auto d-block" />

        <NavLink to="/dashboard">
          <div
            className={
              pathname === "/dashboard" ? "menu mb-4 active" : "menu mb-4"
            }
          >
            <img src={home} alt="" className="d-block m-auto pb-1" />
            Dashboard
          </div>
        </NavLink>

        <NavLink to="/dashboard/cars">
          <div
            className={
              pathname === "/dashboard/cars" ? "menu mb-4 active" : "menu mb-4"
            }
          >
            <img src={truck} alt="" className="d-block m-auto pb-1" />
            Cars
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default SideNav;
