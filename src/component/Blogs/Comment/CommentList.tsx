import React, { useCallback, useContext, useEffect, useState } from "react";
import { DataContext } from "../../../store/GlobalState";
import { getAPI } from "../../../utils/FetchData";
import { IComment } from "../../../utils/Typescript";
import LoadingCom from "../../global/LoadinCom/LoadingCom";
import PaginatePage from "../../global/PaginatePage";
import FormComment from "./FormComment";

type IProps = {
  blog_id: string;
  blog_user_id: string;
};

const CommentList: React.FC<IProps> = ({ blog_id, blog_user_id }: IProps) => {
  const { state } = useContext(DataContext);
  const { socket } = state;
  const [comments, setComments] = useState<IComment[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, seTotal] = useState<number>(0);

  useEffect(() => {
    console.log(socket)
    if (!socket) return;
    socket.on("createComment", (data: IComment) => {
      setComments([data, ...comments]);
    });

    return () => {
      socket.off("createComment");
    };
  }, [comments, , socket]);
  useEffect(() => {
    if (!socket) return;

    socket.on("replyComment", (data: IComment) => {
      const reply = comments.map((item) =>
        item._id === data.comment_root
          ? {
              ...item,
              replyCM: [data, ...item.replyCM],
            }
          : item
      );
      setComments(reply);
    });

    return () => {
      socket.off("replyComment");
    };
  }, [comments, socket]);

  const [loading, setLoading] = useState<boolean>(false);

  const changePage = () => {
    setPage(page + 1);
  };

  const get = useCallback(
    async (page) => {
      setLoading(true);
      const res = await getAPI(`comment/${blog_id}?page=${page}&limit=3`);
      setComments([...comments, ...res.data.comments]);
      seTotal(res.data.total);
      setLoading(false);
    },
    [page]
  );
  useEffect(() => {
    get(page);
  }, [get]);

  const [reply, setReply] = useState<any>(null);

  return (
    <>
      {comments?.map((cm) => (
        <div className="card mt-5 rounded" key={cm._id}>
          <div className="d-flex">
            <img
              src={`data:image/jpeg;base64,${cm.user.avatar}`}
              alt="imgComment"
              className="rounded-pill avatar"
            />
            <p className="mx-3 fw-bold">{cm.user.name}</p>
          </div>
          <p className="mx-5 text-muted bg-light p-4 rounded-pill">
            {cm.content}
          </p>
          {state.user._id && (
            <p onClick={() => setReply(cm)} style={{ cursor: "pointer" }}>
              <u className="color mx-5">Reply</u>
            </p>
          )}

          {/* Reply */}
          {reply?._id === cm._id && (
            <div className="px-5 pb-5">
              <FormComment
                blog_user_id={blog_user_id}
                blog_id={blog_id}
                type="Reply"
                reply={reply}
                setReply={setReply}
              />
            </div>
          )}
          {cm?.replyCM?.map((rp) => (
            <div className="card mx-5 rounded" key={rp._id}>
              <div className="d-flex">
                <img
                  src={`data:image/jpeg;base64,${rp.reply_user?.avatar}`}
                  alt="imgComment"
                  className="rounded-pill avatar"
                />
                <p className="mx-3 fw-bold">{rp.reply_user?.name}</p>
              </div>
              <p className="mx-5 text-muted bg-light p-4 rounded-pill">
                {rp.content}
              </p>
            </div>
          ))}
        </div>
      ))}
      {total > 0 && (
        <>
          {loading ? (
            <LoadingCom />
          ) : (
            <p
              className="text-center my-3"
              style={{ cursor: "pointer" }}
              onClick={changePage}
            >
              Load More
            </p>
          )}
        </>
      )}
    </>
  );
};

export default CommentList;
