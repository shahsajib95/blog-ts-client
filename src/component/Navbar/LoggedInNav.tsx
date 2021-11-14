import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { IUser } from "../../utils/Typescript";

type IProps = {
    user: IUser
}

const LoggedInNav: React.FC<IProps> = ({user}: IProps) => {

    const logOut = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
      };
  return (
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
            src={`data:image/jpeg;base64,${user.avatar}`}
            alt="userAvatar"
            className="avatar"
          />{" "}
          <span className="ml-3">{user.name}</span>
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
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
  );
};

export default LoggedInNav;
