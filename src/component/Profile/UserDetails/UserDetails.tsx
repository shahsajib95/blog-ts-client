import React, { useContext } from "react";
import { BiEdit } from "react-icons/bi";
import UserBlogs from "./UserBlogs";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { DataContext } from "../../../store/GlobalState";
import { AiFillCamera } from "react-icons/ai";

type IblogCount = {
  blogCount: number;
};
const UserDetails: React.FC<IblogCount> = ({ blogCount }: IblogCount) => {
  const { state } = useContext(DataContext);
  const { name, avatar, _id, email } = state.user;
  return (
    <div className="row">
      <div className="col-md-3 g-2">
        <div className=" card p-4 d-flex justify-content-center align-items-center">
          <BiEdit
            className="d-flex align-self-end"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            style={{ cursor: "pointer" }}
          />
          <div className="user-details-img">
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
          <h3 className="mt-3">{name}</h3>
          <p>{email}</p>
          <h4>Total Blogs: {blogCount}</h4>
        </div>
      </div>
      <EditProfileModal user={state.user} />
      <div className="col-md-9 g-2">
        <UserBlogs id={_id} />
      </div>
    </div>
  );
};

export default UserDetails;
