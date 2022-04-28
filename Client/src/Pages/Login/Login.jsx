import React, { useState } from "react";
import "./style.css";

function Login() {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);
  const handleSubmit = (event) => {
    setError(null);
    setIsLoading(true);
    event.preventDefault();
    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: auth.email,
        password: auth.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) throw data.error;
        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  function handleChange(evt) {
    setAuth({
      ...auth,
      [evt.target.name]: evt.target.value,
    });
  }

  return (
    <div className="wrap row m-0">
      <div className="col-md-8 img p-0">
        <div className="layer "></div>
      </div>

      <div className="col-md-4 form my-auto">
        <div className="container">
          <h3 className="mb-3">Binar Car Rental</h3>
          <h2 className="mb-3">Welcome, Admin BCR</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
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

            {isLoading ? (
              <div className="d-flex justify-content-center">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              </div>
            ) : (
              <button
                type="submit"
                className="btn btn-primary w-100"
                id="liveAlertBtn"
              >
                Sign In
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
