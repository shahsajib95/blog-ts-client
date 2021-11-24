import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { InputChange } from "../../utils/Typescript";

type Iprops = {
  handleInput: (value: InputChange) => void
}

const SearchBox = ({handleInput}: Iprops) => {
  return (
    <div className="d-flex justify-content-center my-5">
      <div className="search">
        <input
          className="form-control rounded-pill p-2"
          placeholder="Search blogs..."
          onChange={handleInput}
        />
        <button className="btn btn-search bg-color px-3 py-2 rounded-pill">
          <BiSearchAlt />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
