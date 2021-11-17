import React from "react";
import { IUserDetails } from "../../../utils/Typescript";
import UserBlogs from "../UserDetails/UserBlogs";

type IProps = {
  user: IUserDetails;
};

const OtherUserDetails: React.FC<IProps> = ({ user }: IProps) => {
  const { name, avatar, blogCount, _id } = user;

  return (
    <div className="row">
      <div className="col-md-3 g-2">
        <div className="card rounded shadow-sm p-4 d-flex justify-content-center align-items-center">
          <img
            src={`data:image/jpeg;base64,${avatar}`}
            alt="ävatar"
            className="avatar-lg"
          />
          <h3 className="mt-3 fw-bold">{name}</h3>
         
          <h4>
            Total Blogs: <span className="fw-bold">{blogCount}</span>
          </h4>
        </div>
      </div>
      <div className="col-md-9 g-2">
        <UserBlogs id={_id} />
      </div>
    </div>
  );
};

export default OtherUserDetails;
