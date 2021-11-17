import React, { useCallback, useEffect, useState } from "react";
import { getAPI } from "../../utils/FetchData";
import { Id } from "../../utils/Typescript";
import Loading from "../global/Alert/Loading";
import UserDetails from "./UserDetails/UserDetails";


const UserProfile = ({ id }: Id) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [blogCount, setBlogCount] = useState<number>(0);

  const getUser = useCallback(async () => {
    setLoading(true);
    const res = await getAPI(`user/${id}`);
    setBlogCount(res.data.blogCount);
    setLoading(false);
  }, [id]);
  useEffect(() => {
    getUser();
  }, [getUser]);

  if (loading) return <Loading />;
  return (
    <div className="container my-5" style={{minHeight: '100vh'}}>
      <UserDetails blogCount={blogCount} />
    </div>
  );
};

export default UserProfile;
