import React from "react";
import { AiFillExclamationCircle } from "react-icons/ai";

const Nothings = () => {
  return (
    <div
      style={{ height: "30vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="text-center">
        <AiFillExclamationCircle style={{ fontSize: "5rem" }} />
        <h3>Nothing to show</h3>
      </div>
    </div>
  );
};

export default Nothings;
