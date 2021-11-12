import React from "react";
import { IBlog } from "../../utils/Typescript";
import parse from "html-react-parser";
import moment from "moment";
import { Link } from "react-router-dom";

interface IProps {
  blog: IBlog;
}
const Details: React.FC<IProps> = ({ blog }: IProps) => {
  const { title, user, thumbnail, createdAt, body } = blog;

  return (
    <div>
      <h1>
        <strong>{title}</strong>
      </h1>
      <Link to={`/profile/${user._id}`}>
        <div className="d-flex align-items-center my-5">
          <img
            src="https://c.tadst.com/gfx/750x500/authors-day-fun.jpg"
            alt="authorImage"
            className="avatar"
          />
          <h6 className="mx-3 fw-bold">{user.name}</h6>
        </div>
      </Link>
      <p className="ms-auto">Date: {moment(createdAt).fromNow()}</p>
      <img
        src={`data:image/jpeg;base64,${thumbnail}`}
        alt="blogImage"
        className="w-100 my-3"
      />
      {parse(body)}
    </div>
  );
};

export default Details;
