import React, { useContext, useState } from "react";
import { DataContext, token } from "../../../store/GlobalState";
import { getAPI, patchAPI } from "../../../utils/FetchData";
import { validFile } from "../../../utils/Valid";
import { FcAddImage } from "react-icons/fc";

type IProps = {
  userImageData: IInputUser;
};

type IInputUser = {
  _id: string;
  avatar: string;
};

const EditImage: React.FC<IProps> = ({ userImageData }: IProps) => {
  const { _id, avatar } = userImageData;

  const [image, setImage] = useState<string>();
  const [file, setFile] = useState<File>({} as File);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {

    
    const fileData = e.target.files;
    if (!fileData) return;
    const check = validFile({file: fileData[0]})

    if (check.errLength > 0)
    return dispatch({ type: "NOTIFY", payload: { error: check.errMsg } });

    setFile(fileData[0])

    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        setImage(reader.result as string);
      }
    };
    if (fileData) {
      reader.readAsDataURL(fileData[0]);
    }
  };

  const ImageShow = () => {
    if (image) {
      return <img src={image} alt="ävatar" className="avatar-lg" />;
    } else {
      return (
        <img
          src={`data:image/jpeg;base64,${avatar}`}
          alt="ävatar"
          className="avatar-lg"
        />
      );
    }
  };

  const { dispatch } = useContext(DataContext);
  const handleModal = async () => {

    const check = validFile({file: file})

    if (check.errLength > 0)
    return dispatch({ type: "NOTIFY", payload: { error: check.errMsg } });

    
    const formData = new FormData();
    formData.append('file', file)
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await patchAPI(`user/avatar/${_id}`, formData,  JSON.parse(token!));
    if (res.data.modifiedCount > 0) {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await getAPI("accessToken", JSON.parse(token));
        dispatch({ type: "USER", payload: res.data });
        dispatch({ type: "NOTIFY", payload: { loading: false } });
      }
    } else {
      dispatch({ type: "NOTIFY", payload: { error: res.data.err } });
      dispatch({ type: "NOTIFY", payload: { loading: false } });
    }
  };
  return (
    <div
      className="modal fade"
      id="editImageModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-color">
            <h5 className="modal-title" id="exampleModalLabel">
            <FcAddImage style={{fontSize: '2rem'}}/> Upload Profile Picture
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <div className="text-center">
              {ImageShow()}
              <br></br>
              <div className="mx-auto">
                <input
                  type="file"
                  className="form-control-file m-3"
                  accept="image/*"
                  onChange={handleFile}
                  name="file"
                  style={{ width: "200px" }}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleModal}
              data-bs-dismiss="modal"
            >
              Upload
            </button>
            <button
              type="button"
              className="btn btn-danger"
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

export default EditImage;
