import React from "react";
import { useState, useContext } from "react";
import "./Login.css";

import { useNavigate } from "react-router";

function Login() {
  let history = useNavigate();
  const [loader, setLoader] = useState(false);
  const [credentials, setCredentials] = useState({ lemail: "", lpassword: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.lemail,
        password: credentials.lpassword,
      }),
    });

    const json = await response.json();
    setLoader(false);
    if (json.success) {
      localStorage.setItem("token", json.token);
      history("/data");
    } else {
      alert(json.error);
    }
  };
  // document.body.style=props.mode==="light"?"background:white":"background:#0E1C25";
  return (
    <div className="container " id="log" style={{ height: "100%" }}>
      <div
        className={`logincard d-flex justify-content-center aling-item-center`}
      >
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className={`form-control`}
                name="lemail"
                onChange={onChange}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="lpassword"
                onChange={onChange}
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login &nbsp;
              <span
                className="spinner-border spinner-border-sm my-1"
                role="status"
                aria-hidden="true"
                style={{ display: loader ? "flex" : "none" }}
              ></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
