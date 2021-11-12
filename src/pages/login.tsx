import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { DataContext } from "../store/GlobalState";
import { postAPI } from "../utils/FetchData";
import { InputChange } from "../utils/Typescript";

const Login = () => {
  const { state, dispatch } = useContext(DataContext);
  const initialState = { email: "", password: "" };
  const [user, setUser] = useState(initialState);
  const handleInput = (e: InputChange) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const history = useHistory();

  useEffect(() => {
    if(state.user.email) {
      let url = history.location.search.replace('?', '/')
      return history.push(url)
    }
  },[state.user, history])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    try {
      const res = await postAPI("login", user);
      if (res.data.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.data.err } });
      localStorage.setItem("token", JSON.stringify(res.data.token));
      dispatch({ type: "NOTIFY", payload: { loading: false } });
    } catch (e: any) {
      console.log(e.message);
      dispatch({ type: "NOTIFY", payload: { loading: false } });
    }
  };
  return (
    <section className="login container">
      <div className="container">
        <form className="mx-auto my-5" style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="btn bg-dark text-white form-control">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
