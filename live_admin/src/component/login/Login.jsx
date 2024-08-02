import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [state, setState] = useState({
    email_id: "",
    pass: "",
  });
  const _useNavigate = useNavigate();

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const loginData = (event) => {
    event.preventDefault();
    console.log(state);
    axios.post("http://localhost:4004/login", state).then((res) => {
      // console.log(res);
      if (res.data.success) {
        localStorage.setItem("_token", res.data.token);
        _useNavigate("/");
      } else {
        console.log("username or password is worng");
      }
    });
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="text-center display-4 fw-bold">Login</div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <form
              action=""
              method="post"
              onSubmit={loginData}
              encType="multipart/form-data"
            >
              <div class="mb-3">
                <label for="formGroupExampleInput" class="form-label">
                  Email id
                </label>
                <input
                  type="text"
                  name="email_id"
                  onChange={handler}
                  class="form-control"
                  id="formGroupExampleInput"
                />
              </div>

              <div class="mb-3">
                <label for="formGroupExampleInput" class="form-label">
                  Password
                </label>
                <input
                  type="text"
                  name="pass"
                  onChange={handler}
                  class="form-control"
                  id="formGroupExampleInput"
                />
              </div>

              <div class="mb-3">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-success"
                />
              </div>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  );
};
