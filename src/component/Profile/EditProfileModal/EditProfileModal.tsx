import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../store/GlobalState";
import { getAPI, patchAPI } from "../../../utils/FetchData";
import { InputChange, IUserDetails } from "../../../utils/Typescript";
import EditProfileForm from "./EditProfileForm";

type IProps = {
  user: IUserDetails;
};

type IInputUser = {
  name: string;
  email: string;
};

const EditProfileModal: React.FC<IProps> = ({ user }: IProps) => {
  const { _id, name, email } = user;

  const initialState = { name: "", email: "" };
  const [userData, setUserData] = useState<IInputUser>(initialState);
  const handleInput = (e: InputChange) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    setUserData({ name: name, email: email });
  }, []);

  const { dispatch } = useContext(DataContext);
  const handleModal = async () => {
    const res = await patchAPI(`user/details/${_id}`, userData);
    if (res.data.modifiedCount) {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await getAPI("accessToken", JSON.parse(token));
        console.log(res.data)
        dispatch({ type: "USER", payload: res.data });
      }
    }else{
      dispatch({ type: "NOTIFY", payload: {error: res.data.err} });
    }
    
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Ediit Your Profile
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <EditProfileForm user={userData} handleInput={handleInput} />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleModal}
              data-bs-dismiss="modal"
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
