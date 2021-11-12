import React, { useContext, useState } from "react";
import NotFound from "../component/global/NotFound";
import Tag from "../component/PostBlog/Tag";
import { DataContext } from "../store/GlobalState";
import { postAPI } from "../utils/FetchData";
import { InputChange } from "../utils/Typescript";
import { validPostBlog } from "../utils/Valid";
import  { createEditorStateWithText } from "@draft-js-plugins/editor";
import "draft-js/dist/Draft.css";
import { convertToHTML } from "draft-convert";
import PostEditor from "../component/PostBlog/PostEditor";
import { useHistory } from "react-router";


const PostBlog = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(DataContext);
  const initialState = { title: "" };
  const [file, setFile] = useState<File>({} as File);
  const [blog, setBlog] = useState(initialState);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = e.target.files;
    if (!fileData) return;
    setFile(fileData[0]);
  };

  const handleInput = (e: InputChange) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const [body, setBody] = useState<any>();
  const [editor, setEditor] = useState<any>({
    editorState: createEditorStateWithText(''),
  });
  const handleBody = (editorState: any) => {
    setEditor({
      editorState,
    });
    setBody(convertToHTML(editor.editorState.getCurrentContent()));
  };
  console.log(typeof body)

  const checkKeyDown = (e: any) => {
    if (e.keyCode === 13) e.preventDefault();
  };

  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const check = validPostBlog({ ...blog, body: editor, file: file });
    if (check.errLength > 0)
      return dispatch({ type: "NOTIFY", payload: { error: check.errMsg } });
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("body", body);
    formData.append("tags", tags.toString());
    formData.append("user", state.user._id);
    formData.append("file", file);
    try {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      const res = await postAPI("blog/post", formData);
      if (res.data.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.data.err } });
      dispatch({ type: "NOTIFY", payload: { loading: false } });
      history.push(`/blog/${res.data._id}`)
      console.log(res.data);
    } catch (e: any) {
      console.log(e.message);
      dispatch({ type: "NOTIFY", payload: { loading: false } });
    }
  };
  console.log(editor);
  if (!state.user.email) return <NotFound />;
  return (
    <section className="container my-5">
      <form
        className="mx-auto my-5"
        style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
        onKeyDown={(e) => checkKeyDown(e)}
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="titleHelp"
            name="title"
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Body
          </label>
          <PostEditor handleBody={handleBody} editor={editor}/>
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            Upload Thumbnail
          </label>
          <div className="form-group">
            <input
              type="file"
              className="form-control-file"
              accept="image/*"
              onChange={handleFile}
              name="file"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            Tags
          </label>
          <Tag tags={tags} setTags={setTags} />
        </div>
        <button type="submit" className="btn bg-dark text-white form-control">
          Post
        </button>
      </form>
    </section>
  );
};

export default PostBlog;
