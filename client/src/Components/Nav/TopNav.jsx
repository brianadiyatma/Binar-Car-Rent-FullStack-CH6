import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../../features/authSlice";
import "./style.css";
import jwt_decode from "jwt-decode";

import menu from "./img/fi_menu.svg";
import logo from "./img/logo.png";
const TopNav = () => {
  const [showDrop, setShowDrop] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
  };
  let userName;

  try {
    if (user.userData) {
      if (user.googleAuth) {
        userName = jwt_decode(user.userData).given_name;
        console.log(userName);
      } else {
        userName = jwt_decode(user.userData).firstName;
        console.log(userName);
      }
    }
  } catch (err) {
    dispatch(authSlice.actions.logout());
    console.log("TOKEN SPOOFED");
  }
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
              {userName}
            </button>
            <ul
              className={showDrop ? "dropdown-menu show" : "dropdown-menu"}
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
