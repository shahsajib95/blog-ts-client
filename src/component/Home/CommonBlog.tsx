import React from "react";

import moment from "moment";
import { IBlog } from "../../utils/Typescript";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

interface IProps {
  blog: IBlog;
}
const CommonBlog: React.FC<IProps> = ({ blog }: IProps) => {
  const { _id, title, user, thumbnail, love, createdAt } = blog;
  return (
    <div className="col-md-4 p-2">
      <div className="blog-details shadow-sm rounded p-3 m-3">
        <Link to={`/profile/${user._id}`}>
          <div className="d-flex align-items-center">
            <img
              src={`data:image/jpeg;base64,${user.avatar}`}
              alt="authorImage"
              className="avatar"
            />
            <h6 className="mx-3 fw-bold">{user.name}</h6>
          </div>
        </Link>
        <Link to={"/blog/" + _id}>
          <img
            src={`data:image/jpeg;base64,${thumbnail}`}
            alt="blogImage"
            className="my-3 blog-img rounded"
          />

          <h6 className="fw-bold">{title}</h6>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              {love}
              <FaHeart className="m-2" />
            </div>
            <h6>{moment(createdAt).fromNow()}</h6>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CommonBlog;
