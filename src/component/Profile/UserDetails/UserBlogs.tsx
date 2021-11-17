import React, { useCallback, useContext, useEffect, useState } from "react";
import { getAPI } from "../../../utils/FetchData";
import { IBlog, Id } from "../../../utils/Typescript";
import { AiFillDelete } from "react-icons/ai";
import LoadingCom from "../../global/LoadinCom/LoadingCom";
import { DataContext } from "../../../store/GlobalState";
import Modal from "../../global/Modal/Modal";
import { Link } from "react-router-dom";

const UserBlogs = ({ id }: Id) => {
  const { state } = useContext(DataContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<IBlog[]>([]);

  const getUserBlogs = useCallback(async () => {
    setLoading(true);
    if (id) {
      const res = await getAPI(`user/blog/${id}`);
      setBlog(res.data);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getUserBlogs();
  }, [getUserBlogs]);

  const [blogData, setBlogData] = useState<IBlog>({} as IBlog);
  return (
    <div className="user-blog shadow-sm rounded p-3">
      <h1 className="ml-3">Blogs:</h1>
      {loading && <LoadingCom />}
      {!loading && blog.length === 0 && (
        <div className="text-center my-5">You have no blogs</div>
      )}
      {blog.map((item) => (
        <div className="user-blog card shadow-sm p-3 m-3">
          <div className="d-flex justify-content-between text-dark">
            <Link to={"/blog/" + item._id}>
              {item.title.substring(0, 60)}...
            </Link>
            {state.user._id === id && (
              <AiFillDelete
                onClick={() => setBlogData(item)}
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#modal"
              />
            )}
          </div>
        </div>
      ))}
      {/* Modal */}
      <Modal
        type="delete"
        cat="blog"
        id={blogData._id}
        title={blogData.title}
        setBlog={setBlog}
        blog={blog}
      />
    </div>
  );
};

export default UserBlogs;
