import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Cars from "./Pages/Cars/Cars";
import Navigation from "./Components/Nav/Navigation";
import SignUp from "./Pages/SignUp/signup";
import authSlice from "./features/authSlice";
import User from "./Pages/User/User";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  let decoded;

  if (user) {
    decoded = jwt_decode(user);
  }
  // console.log(decodedPrivilege);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(authSlice.actions.retrieveLocalToken());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/signin"
          element={
            user ? (
              decoded.privilege === "admin" ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route path="/" element={user ? <User /> : <Navigate to="/signin" />} />
        <Route
          path="/signup"
          element={
            user ? (
              decoded.privilege === "admin" ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <SignUp />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              decoded.privilege === "admin" ? (
                <Navigation />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Navigate to="/signin" />
            )
          }
        >
          <Route path="" element={<Dashboard />} />
          <Route path="cars" element={<Cars />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
