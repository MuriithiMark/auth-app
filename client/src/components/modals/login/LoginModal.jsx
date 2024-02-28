import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";

import ModalBase from "../ModalBase";
import "./login-modal.css";
import "../common-modal-styles.css";
import {
  toggleLoginModal,
  toggleRegisterModal,
} from "../../../features/modal/modalSlice";
import { onLogin } from "../../../features/auth/authSlice";

const cookies = new Cookies()
const LoginModal = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginModalClose = () => {
    dispatch(toggleLoginModal());
  };

  const handleRegisterClick = () => {
    dispatch(toggleRegisterModal());
  };

  const handleSubmit = () => {
    console.log(data)
    // submit data to /auth/login
    fetch("http://localhost:3000/auth/login", {
      method: "post",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (response) => {
      const responseData = await response.json()
      if(responseData.status === "fail") {
        console.error(responseData);
        // handle failure
        return;
      }

      dispatch(onLogin(responseData.user))
      dispatch(toggleLoginModal())
    })
  };

  return (
    <ModalBase onClose={handleLoginModalClose}>
      <form className="login">
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            value={data.username}
            placeholder="@jane.doe"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="secret"
            onChange={handleChange}
          />
        </label>

        <button type="button" onClick={handleSubmit}>
          Login
        </button>
        <span>
          Don't have an account?{" "}
          <span className="alternative-actions" onClick={handleRegisterClick}>
            Register
          </span>
        </span>
      </form>
    </ModalBase>
  );
};

export default LoginModal;
