import React, { useContext, useEffect, useState } from "react";
import { DataContext, token } from "../../../store/GlobalState";
import { postAPI } from "../../../utils/FetchData";
import { IComment, InputChange } from "../../../utils/Typescript";

type IProps = {
  blog_id: string;
  blog_user_id: string;
  type: string;
  reply?: any;
  setReply?: any;
};

const FormComment: React.FC<IProps> = ({
  blog_id,
  blog_user_id,
  type,
  reply,
  setReply,
}: IProps) => {
  const { state } = useContext(DataContext);
  const { user, socket } = state;

  const [loading, setLoading] = useState<boolean>(false);
  const [commentData, setCommentData] = useState<string>("");
  const handleSubmit = async () => {
    setLoading(true);
    if (type === "Submit") {
      const res = await postAPI(
        "comment",
        {
          user: { _id: user._id, avatar: user.avatar, name: user.name },
          content: commentData,
          blog_id: blog_id,
          blog_user_id: blog_user_id,
        },
        JSON.parse(token!)
      );
      setCommentData("");
      setLoading(false);
    }
    if (type === "Reply") {
      const res = await postAPI(
        "replyComment",
        {
          user: reply.user,
          content: commentData,
          blog_id: blog_id,
          blog_user_id: blog_user_id,
          comment_root: reply,
          reply_user: { _id: user._id, avatar: user.avatar, name: user.name },
        },
        JSON.parse(token!)
      );
      setCommentData("");
      setReply(null);
      setLoading(false);
    }
  };

  return (
    <div className="my-2">
      <div className="mb-3">
        <label htmlFor="comment" className="form-label">
          {type === "Reply" ? "Reply" : "Comment"}
        </label>
        <textarea
          disabled={socket.connected !== true}
          className="form-control"
          id="comment"
          rows={4}
          onChange={(e: InputChange) => setCommentData(e.target.value)}
          value={commentData}
          placeholder={socket.connected !== true ? '...Connected...' : ''}
        />
      </div>
      {loading ? (
        <button className="btn btn-sm bg-color rounded-pill px-4">
          Loading
        </button>
      ) : (
        <button
          className="btn btn-sm bg-color rounded-pill px-4"
          onClick={handleSubmit}
        >
          {type}
        </button>
      )}
      {type === "Reply" && (
        <button
          className="btn mx-2 btn-sm bg-color rounded-pill px-4"
          onClick={() => setReply(null)}
        >
          Close
        </button>
      )}
    </div>
  );
};

export default FormComment;
