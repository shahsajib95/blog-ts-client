import React, { useContext } from "react";
import { DataContext } from "../../store/GlobalState";

interface ITags {
  tags: string[];
}
interface ISetTags {
  setTags: any;
}

const Tag = ({ tags, setTags }: ITags & ISetTags) => {
  const { dispatch } = useContext(DataContext);
  const filterTag = (removeIndex: ITags) => {
    const existingTags = tags.filter(
      (_: string, index: any) => index !== removeIndex
    );
    setTags(existingTags);
  };
  const addTags = (e: any) => {
    if (tags.length + 1 <= 6) {
      if (e.nativeEvent.data === " ") {
        if (!/^\s*$/.test(e.target.value.trim())) {
          setTags([...tags, e.target.value.trim()]);
          e.target.value = "";
        }
      }
    } else {
      dispatch({ type: "NOTIFY", payload: { error: 'Only six tags can be added.' } });
    }
  };
  return (
    <div className="form-group">
      <div className="bootstrap-tagsinput">
        {tags.map((tags: string, index: any) => (
          <span key={index} className="tag-label">
            {tags}
            <span style={{ cursor: "pointer" }} data-role="remove">
              <b onClick={() => filterTag(index)}>X</b>
            </span>
          </span>
        ))}
      </div>
      <input
        type="text"
        className="form-control mt-2"
        onChange={addTags}
        name="file"
      />
    </div>
  );
};

export default Tag;
