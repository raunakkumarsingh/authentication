import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router";

function Navbar() {
  let history = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    history("/login", { replace: true });
    window.location.reload();
  };
  return (
    <nav className="nav navbar-expand-lg bg-body-tertiary ">
      <div className="container-fluid d-flex">
        <Link className="navbar-brand mt-3 text-dark " href="#">
          Authentication
        </Link>

        <div
          className="collapse navbar-collapse d-flex justify-content-end"
          id="navbarSupportedContent"
        >
          {!localStorage.getItem("token") ? (
            <ul className="d-flex justify-content-end my-2">
              <li>
                <Link
                  className="btn btn-outline-success mx-2"
                  to="/login"
                  type="submit"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="btn btn-outline-success mx-2"
                  to="/signup"
                  type="submit"
                >
                  Signup
                </Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-success my-2"
                  to="/login"
                  type="submit"
                >
                  logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
