import React from "react";
import { useDispatch } from "react-redux";
import authSlice from "../../features/authSlice";
const User = () => {
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Halaman Penyewaan</h1>
      <button onClick={() => dispatch(authSlice.actions.logout())}>
        Logout
      </button>
    </div>
  );
};

export default User;
