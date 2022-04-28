import React, { useState } from "react";
import "./style.css";

import menu from "./img/fi_menu.svg";
import logo from "./img/logo.png";
const TopNav = () => {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <nav className="navbar navbar-light bg-white shadow-sm fixed-top">
      <div className="container-fluid">
        <div className="d-flex">
          <img src={logo} alt="" />
          <img src={menu} alt="" />
        </div>
        <div className="d-flex align-items-center">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>

          <div className="dropdown">
            <button
              className="dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setShowDrop(!showDrop)}
            >
              BrianAR
            </button>
            <ul
              className={showDrop ? "dropdown-menu show" : "dropdown-menu"}
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <a className="dropdown-item" href="/logout">
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
