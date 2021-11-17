import React, { useContext } from "react";
import { IBlog } from "../../utils/Typescript";
import parse from "html-react-parser";
import moment from "moment";
import { Link } from "react-router-dom";
import Like from "./Like/Like";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { DataContext } from "../../store/GlobalState";

interface IProps {
  blog: IBlog;
}
const Details: React.FC<IProps> = ({ blog }: IProps) => {
  const { state } = useContext(DataContext);
  const { _id, title, user, thumbnail, createdAt, body, tags, love } = blog;

  return (
    <>
      <div className="bg-color p-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Blog
            </li>
          </ol>
        </nav>
        <h2>{title}</h2>
      </div>
      <div className="container">
        <div className="d-flex my-4">
          <img
            src={`data:image/jpeg;base64,${user.avatar}`}
            alt="authorImage"
            className="avatar"
          />
          <Link to={`/profile/${user._id}`}>
            <h5 className="mx-3 fw-bold">{user.name}</h5>
          </Link>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="d-flex justify-content-between align-items-center">
            <BsFillCalendarCheckFill style={{ fontSize: "1.5rem" }} />{" "}
            <span className="mx-2">{moment(createdAt).format("LL")}</span>
          </p>
          {state.user._id && (
            <div className="bg-white card p-2 px-4 rounded">
              <Like id={_id} love={love} />
            </div>
          )}
        </div>
        <img
          src={`data:image/jpeg;base64,${thumbnail}`}
          alt="blogImage"
          className="w-100 my-3 rounded"
        />
        <div className="p-3">{parse(body)}</div>
        <div className="mb-5">
          {tags.split(",").map((t) => (
            <button className="btn btn-sm rounded-pill btn-dark m-2">
              #{t}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Details;
