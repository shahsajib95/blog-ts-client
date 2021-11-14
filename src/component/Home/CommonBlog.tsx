import React from "react";
import { FaRegHeart, FaShareAlt, FaRegBookmark } from "react-icons/fa";
import moment from "moment";
import { IBlog } from "../../utils/Typescript";
import { Link } from "react-router-dom";

interface IProps {
  blog: IBlog;
}
const CommonBlog: React.FC<IProps> = ({ blog }: IProps) => {
  const { _id, title, user, thumbnail, createdAt } = blog;
  return (
    <div className="col-md-4 p-2">
      <div className="blog-details m-3">
        <Link to={`/profile/${user._id}`}>
          <div className="d-flex align-items-center">
            <img  src={`data:image/jpeg;base64,${user.avatar}`} alt="authorImage" className="avatar" />
            <h6 className="mx-5 fw-bold">{user.name}</h6>
          </div>
        </Link>
        <img
          src={`data:image/jpeg;base64,${thumbnail}`}
          alt="blogImage"
          className="my-3 blog-img"
        />
        <Link to={"/blog/" + _id}>
          <h5 className="fw-bold">{title}</h5>
        </Link>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <FaRegHeart className="m-2" />
            <FaShareAlt className="m-2" />
            <FaRegBookmark className="m-2" />
          </div>
          <p className="text-muted">{moment(createdAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

export default CommonBlog;
