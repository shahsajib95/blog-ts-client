import React from "react";

const LoadingCom = () => {
  return (
    <h2
      className="text-center d-flex justify-content-center align-items-center my-5"
      style={{ height: "30vh" }}
    >
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </h2>
  );
};

export default LoadingCom;
