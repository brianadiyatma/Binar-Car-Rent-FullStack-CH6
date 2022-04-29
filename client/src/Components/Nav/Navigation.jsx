import React from "react";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import SideNavSecondary from "./SideNavSecondary";
import { Outlet } from "react-router-dom";

const Navigation = (props) => {
  return (
    <div>
      <TopNav />
      <div className="d-flex">
        <div className="d-flex text-center">
          <SideNav />
          <SideNavSecondary />
        </div>
        <div className="content" style={{ backgroundColor: "FFF" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
