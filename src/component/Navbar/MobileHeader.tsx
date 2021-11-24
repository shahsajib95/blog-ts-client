import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../store/GlobalState";
import { BiSearchAlt } from "react-icons/bi";

const MobileHeader = ({ openNav }: any) => {
  const { state } = useContext(DataContext);
  const { user } = state;
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center position-fixed"
        onClick={openNav}
        style={{
          height: "100%",
          width: "100%",
          zIndex: 10,
          overflowY: "hidden",
          overflowX: "hidden",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <span
          className="mb-nav text-white"
          onClick={openNav}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            fontSize: "2rem",
          }}
        >
          X
        </span>
        <div
          className="mb-nav text-white"
          style={{ listStyle: "none", fontSize: "20px", textAlign: "center" }}
          onClick={openNav}
        >
          <Link to="/">
            <li className="p-3">Home</li>
          </Link>
          {state.user.email ? (
            <>
              {" "}
              <Link to="/post-blog">
                <li className="p-3">Post Blog</li>
              </Link>
              <Link to="/search">
                <li className="p-3">
                <BiSearchAlt style={{ fontSize: "1.5rem" }} /> <span className="mx-2">Search</span>
                </li>
              </Link>
              <Link to={`/profile/${user._id}`}>
                <li className="p-3">
                  <img
                    src={`data:image/jpeg;base64,${user.avatar}`}
                    alt="userAvatar"
                    className="avatar"
                  />{" "}
                  <span className="ml-3">{user.name}</span>
                </li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/search">
                <li className="p-3">
                  <BiSearchAlt style={{ fontSize: "1.5rem" }} /> <span className="mx-2">Search</span>
                </li>
              </Link>
              <Link to="/login">
                <li className="p-3">Login</li>
              </Link>
              <Link to="/register">
                <li className="p-3">Register</li>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
