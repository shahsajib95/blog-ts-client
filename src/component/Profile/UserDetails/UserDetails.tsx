import React, { useContext } from "react";
import { BiEdit } from "react-icons/bi";
import UserBlogs from "./UserBlogs";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { DataContext } from "../../../store/GlobalState";
import { AiFillCamera } from "react-icons/ai";
import EditImage from "../EditProfileModal/EditImage";
import { FiLogOut } from "react-icons/fi";

type IblogCount = {
  blogCount: number;
};
const UserDetails: React.FC<IblogCount> = ({ blogCount }: IblogCount) => {
  const { state } = useContext(DataContext);
  const { name, avatar, _id, email } = state.user;
  const userImageData = { avatar, _id };

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="row">
      <div className="col-md-3 g-2">
        <div className="card shadow-sm rounded p-4 d-flex justify-content-center align-items-center">
          <BiEdit
            className="d-flex align-self-end"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            style={{ cursor: "pointer" }}
          />
          <div
            className="user-details-img"
            data-bs-toggle="modal"
            data-bs-target="#editImageModal"
          >
            <img
              src={`data:image/jpeg;base64,${avatar}`}
              alt="ävatar"
              className="avatar-lg"
            />
            <div className="overlay">
              <a className="icon">
                <AiFillCamera />
              </a>
            </div>
          </div>
          <h3 className="mt-3 fw-bold">{name}</h3>
          <p>{email}</p>
          <h4>
            Total Blogs: <span className="fw-bold">{blogCount}</span>
          </h4>
          <button className="btn bg-color mb-3" onClick={logOut}>
            <FiLogOut />
            <span className="mx-3">Log Out</span>
          </button>
        </div>
      </div>
      <EditProfileModal user={state.user} />
      <EditImage userImageData={userImageData} />
      <div className="col-md-9 g-2">
        <UserBlogs id={_id} />
      </div>
    </div>
  );
};

export default UserDetails;
