import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner text-white d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1>Share your memory with everyone</h1>
        <Link to="register"><button className="btn bg-color px-5 py-2 rounded-pill mt-5">Register Now</button></Link>
      </div>
    </div>
  );
};

export default Banner;
