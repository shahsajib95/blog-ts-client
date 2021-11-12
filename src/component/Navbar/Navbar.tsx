import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../store/GlobalState";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { state } = useContext(DataContext);
  const { user } = state;

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand text-white" to="/">
          Backpacker Lite
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {user.email ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/post-blog">
                    Post Blog
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src={user.avatar}
                      alt="userAvatar"
                      className="avatar"
                    />{" "}
                    <span className="ml-3">{user.name}</span>
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to={`/profile/${user._id}`}>
                      Profile
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="#" onClick={logOut}>
                      <FiLogOut />
                      <span className="ml-3">Log Out</span>
                    </Link>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
