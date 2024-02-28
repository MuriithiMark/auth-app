import React, { useState } from "react";
import ModalBase from "../ModalBase";
import "./register-modal.css";
import "../common-modal-styles.css";
import { useDispatch } from "react-redux";
import {
  toggleLoginModal,
  toggleRegisterModal,
} from "../../../features/modal/modalSlice";

const RegisterModal = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterModalClose = () => {
    dispatch(toggleRegisterModal());
  };

  const handleLoginClick = () => {
    dispatch(toggleLoginModal());
  };

  const handleSubmit = () => {
    // start loading
    fetch("http://localhost:3000/auth/register", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(async (response) => {
        // set loading to false
        const responseData = await response.json()
        if(responseData.status === "fail") {
          // handle errors
          return;
        }
        dispatch(toggleRegisterModal())
        dispatch(toggleLoginModal())
      })
      .catch((error) => {
        // show an error component
        console.error(error);
      })
  }

  return (
    <ModalBase onClose={handleRegisterModalClose}>
      <form className="register">
        <div className="modal-actions"></div>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="jane.doe@example.com"
            onChange={handleChange}
          />
        </label>
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
            placeholder="sceret"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            placeholder="sceret"
            onChange={handleChange}
          />
        </label>

        <button type="button" onClick={handleSubmit}>
          Register
        </button>
        <span className="text">
          Already have an account?{" "}
          <span className="alternative-actions" onClick={handleLoginClick}>
            Login
          </span>
        </span>
        <br />
      </form>
    </ModalBase>
  );
};

export default RegisterModal;
