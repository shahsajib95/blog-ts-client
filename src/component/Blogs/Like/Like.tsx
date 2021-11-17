import React, { useCallback, useContext, useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { DataContext, token } from "../../../store/GlobalState";
import { deleteAPI, getAPI, postAPI } from "../../../utils/FetchData";
type Iprops = {
  id: string;
  love: number;
};
const Like: React.FC<Iprops> = ({ id, love }: Iprops) => {
  const { state, dispatch } = useContext(DataContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [likeValue, setLikeValue] = useState<number>(love);
  const [like, setLike] = useState<any>(null);
  const [likeId, setLikeId] = useState<any>({} as any);

  const get = useCallback(async () => {
    if (state.user._id) {
      const res = await getAPI(
        `blog/like/${state.user._id}`,
        JSON.parse(token!)
      );
      const liked = res.data.find((item: any) => item.blogId === id);
      setLike(liked);
      setLikeId(liked);
      setLoading(false)
    }
  }, [state.user._id]);
  useEffect(() => {
    get();
  }, [get]);

  const handleLike = async () => {
    setLike(true);
    setLikeValue(likeValue + 1);

    const res = await postAPI(
      `blog/like`,
      { blogId: id, likedUser: state.user._id },
      JSON.parse(token!)
    );
    get();
    if (res.data.err) {
      dispatch({ type: "NOTIFY", payload: { error: "An error occurred." } });
      setLikeValue(likeValue - 1);
    }
  };
  const handleUnLike = async (deletedId: number) => {
    setLike(false);
    setLikeValue(likeValue - 1);

    const res = await deleteAPI(
      `blog/like/${deletedId}/${id}`,
      JSON.parse(token!)
    );
    get();
    if (res.data.err) {
      dispatch({ type: "NOTIFY", payload: { error: "An error occurred." } });
      setLikeValue(likeValue + 1);
    }
  };

  if (loading) return <small>..</small>;
  return (
    <span style={{ cursor: "pointer" }}>
      {likeValue}
      {like ? (
        <FaHeart
          className="m-2"
          style={{ color: "#7452f0" }}
          onClick={() => handleUnLike(likeId._id)}
        />
      ) : (
        <FaRegHeart className="m-2" onClick={handleLike} />
      )}
    </span>
  );
};

export default Like;
