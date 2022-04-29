import React from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../../features/authSlice";
const User = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let userName;

  try {
    if (user.googleAuth) {
      userName = jwt_decode(user.userData).given_name;
    } else {
      userName = jwt_decode(user.userData).firstName;
    }
  } catch (err) {
    dispatch(authSlice.actions.logout());
    console.log("TOKEN SPOOOFED");
  }

  return (
    <div>
      <h1>Halaman Penyewaan</h1>
      <h2>Selamat Datang, {userName}</h2>
      <h3>Anda Login dengan {user.googleAuth ? "GOOGLE" : "JWT"}</h3>
      <button onClick={() => dispatch(authSlice.actions.logout())}>
        Logout
      </button>
    </div>
  );
};

export default User;
