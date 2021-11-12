import React, { useCallback, useEffect, useState } from "react";
import { getAPI } from "../../utils/FetchData";
import { Id, IUserDetails } from "../../utils/Typescript";
import Loading from "../global/Alert/Loading";
import UserDetails from "./UserDetails/UserDetails";

const UserProfile = ({ id }: Id) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUserDetails>({} as IUserDetails);

  const getUser = useCallback(async () => {
    setLoading(true);
    const res = await getAPI(`user/${id}`);
    setUser({...res.data.userData[0], blogCount: res.data.blogCount});
    setLoading(false);
  }, [id]);
  useEffect(() => {
    getUser();
  }, [getUser]);

  if(loading) return <Loading/>
  return (
    <div className="container my-5">
        <UserDetails user={user}  />
    </div>
  );
};

export default UserProfile;
