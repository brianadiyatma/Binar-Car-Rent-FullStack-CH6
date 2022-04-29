import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import authSlice, { SignIn } from "../../features/authSlice";
import GoogleIcon from "./GoogleIcon";

function Login() {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, isError, isSuccess, isLoading } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(SignIn(auth));
  };

  useEffect(() => {
    if (userData && isSuccess) {
      navigate("/");
    }
  }, [userData, isSuccess, navigate]);

  function handleChange(evt) {
    setAuth({
      ...auth,
      [evt.target.name]: evt.target.value,
    });
  }

  const googleFailure = () => {
    console.log("GAGAL");
    console.log("googleFailure");
    navigate("/signup");
  };

  const googleSuccess = async (res) => {
    dispatch(authSlice.actions.googleAuth(res.tokenId));
  };
  return (
    <div className="wrap row m-0">
      <div className="col-md-8 img p-0">
        <div className="layer "></div>
      </div>

      <div className="col-md-4 form my-auto">
        <div className="container">
          <h3 className="mb-3">Binar Car Rental</h3>
          <h2 className="mb-3">Welcome, Admin/Pengguna BCR</h2>
          {isError && (
            <div className="alert alert-danger" role="alert">
              {isError}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              placeholder="Contoh: johndee@gmail.com"
              value={auth.email}
              onChange={handleChange}
            />

            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control mb-4"
              aria-describedby="passwordHelpBlock"
              placeholder="6+ karakter"
              value={auth.password}
              onChange={handleChange}
            />
            <p>
              Belum Memiliki Akun ? <Link to="/signup">Klik Disini</Link>
            </p>
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              </div>
            ) : (
              <div>
                <button
                  type="submit"
                  className="btn btn-primary w-100  mb-4"
                  id="liveAlertBtn"
                >
                  Sign In
                </button>
                <GoogleLogin
                  clientId={process.env.REACT_APP_OAUTH_CLIENTID}
                  render={(renderProps) => (
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      id="liveAlertBtn"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="me-2">
                          <GoogleIcon />
                        </div>
                        Sign In With Google
                      </div>
                    </button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy={"single_host_origin"}
                ></GoogleLogin>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
