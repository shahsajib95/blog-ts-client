import React, { useContext } from "react";
import { DataContext } from "../../../store/GlobalState";
import { deleteAPI } from "../../../utils/FetchData";
import { IBlog } from "../../../utils/Typescript";

type IModal = {
  type: string;
  cat: string;
  id: string;
  title: string;
  setBlog: any;
  blog: IBlog[];
};
const Modal = ({ type, cat, id, title, setBlog, blog }: IModal) => {
  const { dispatch } = useContext(DataContext);
  const handleModal = async () => {
    if (type === "delete" && cat === "blog") {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      const res = await deleteAPI(`blog/delete/${id}`);
      if (res.data.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.data.err } });
      dispatch({ type: "NOTIFY", payload: { loading: false } });
      setBlog(blog.filter((item) => item._id !== id));
    }
  };
  return (
    <div
      className="modal fade"
      id="modal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Are You sure you want to delete this {cat}?
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center">
            <h2>{title}</h2>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleModal}
              data-bs-dismiss="modal"
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
