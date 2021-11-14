import React, { useCallback, useContext, useEffect, useState } from "react";
import { DataContext } from "../../store/GlobalState";
import { getAPI } from "../../utils/FetchData";
import { Id, IUserDetails } from "../../utils/Typescript";
import Loading from "../global/Alert/Loading";
import OtherUserDetails from "./OtherUserDetails/OtherUserDetails";

const OtherProfile = ({ id }: Id) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUserDetails>({} as IUserDetails);

  const getUser = useCallback(async () => {
    setLoading(true);
    const res = await getAPI(`user/${id}`);
    setUser({ ...res.data.userData[0], blogCount: res.data.blogCount });
    setLoading(false);
  }, []);
  useEffect(() => {
    getUser();
  }, [id]);
  if (loading) return <Loading />;
  return (
    <div className="container my-5">
      <OtherUserDetails user={user} />
    </div>
  );
};

export default OtherProfile;
