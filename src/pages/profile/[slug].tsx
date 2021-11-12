import React, { useContext } from "react";
import { useParams } from "react-router";
import OtherProfile from "../../component/Profile/OtherProfile";
import UserProfile from "../../component/Profile/UserProfile";
import { DataContext } from "../../store/GlobalState";
import { IParams } from "../../utils/Typescript";

const ProfileEdit = () => {
  const id = useParams<IParams>().slug;
  const { state } = useContext(DataContext);
  return (
    <div>
      {state.user._id === id ? (
        <UserProfile id={id} />
      ) : (
        <OtherProfile id={id} />
      )}
    </div>
  );
};

export default ProfileEdit;
