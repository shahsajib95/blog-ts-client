import React from "react";
import { InputChange } from "../../../utils/Typescript";

type IInputUser = {
  name: string;
  email: string;
  
};

type IProps = {
  user: IInputUser;
  handleInput: (e: InputChange)=> void
};

const EditProfileForm: React.FC<IProps> = ({ user, handleInput }: IProps) => {


  return (
    <section className="register container">
      <div className="container">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={handleInput}
          />
        </div>
      </div>
    </section>
  );
};

export default EditProfileForm;
