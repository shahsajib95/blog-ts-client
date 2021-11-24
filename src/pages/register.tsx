import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { DataContext } from "../store/GlobalState";
import { postAPI } from "../utils/FetchData";
import { InputChange } from "../utils/Typescript";
import { validRegister } from "../utils/Valid";

const Register = () => {
  const { state, dispatch } = useContext(DataContext);
  const initialState = { name: "", email: "", password: "", cf_password: "" };
  const [user, setUser] = useState(initialState);
  const handleInput = (e: InputChange) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const history = useHistory();
  useEffect(() => {
    if (state.user.email) {
      let url = history.location.search.replace("?", "/");
      return history.push(url);
    }
  }, [state.user, history]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const check = validRegister(user);
    if (check.errLength > 0)
      return dispatch({ type: "NOTIFY", payload: { error: check.errMsg } });
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    try {
      const res = await postAPI("register", user);
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
    <section className="register container my-5" style={{ minHeight: "100vh" }}>
      <h2 className="text-center">
      <img src={require('../img/logo.png').default} alt="logo" style={{maxWidth: "100px" }}/>
      </h2>
      <h2 className="text-center">
        <strong>Register</strong>
      </h2>
      <div className="container">
        <form
          className="mx-auto my-5 shadow-sm p-5"
          style={{ maxWidth: "500px" }}
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
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
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cf_password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="cf_password"
              className="form-control"
              id="cf_password"
              onChange={handleInput}
            />
          </div>
          <button type="submit"  className="btn bg-color text-white form-control rounded-pill">
            Submit
          </button>
          <p className="d-flex justify-content-between my-2">Already have a account? <u style={{cursor: 'pointer'}}><Link to="/login">Login</Link></u></p>
        </form>
      </div>
    </section>
  );
};

export default Register;
