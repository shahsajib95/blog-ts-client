import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DataContext } from "../../store/GlobalState";
import LoggedInNav from "./LoggedInNav";
import MobileHeader from "./MobileHeader";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSearchAlt } from "react-icons/bi";

const Navbar = () => {
  const { state } = useContext(DataContext);
  const { user } = state;

  const location = useLocation();

  const isActive = (r: any) => {
    if (r === location.pathname) {
      return " active";
    } else {
      return "";
    }
  };

  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const openNav = () => {
    setMobileNav(!mobileNav);
  };

  return (
    <>
      {mobileNav && <MobileHeader openNav={openNav} />}
      <nav className="navbar navbar-expand-lg py-3 shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={require("../../img/logo.png").default}
              alt="logo"
              style={{ maxWidth: "50px" }}
            />
            <span className="mx-3">Backpacker Lite</span>
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
            <GiHamburgerMenu onClick={openNav} />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              <li className="nav-item">
                <Link className={"nav-link" + isActive("/")} to="/">
                  Home
                </Link>
              </li>
              {user.email ? (
                <LoggedInNav user={user} isActive={isActive} />
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className={"nav-link" + isActive("/search")}
                      to="/search"
                    >
                      <BiSearchAlt style={{ fontSize: "1.5rem" }} />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={"nav-link" + isActive("/login")}
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={"nav-link" + isActive("/register")}
                      to="/register"
                    >
                      <button className="btn bg-color rounded-pill px-4">
                        Register
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
