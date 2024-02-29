import { useEffect } from "react";
import Cookie from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { onLogin } from "./features/auth/authSlice";
import ProfileCard from "./components/profile/ProfileCard";
import "./App.css";

const cookies = new Cookie();

export default function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    fetch("http://localhost:3000/auth/verify-token", {
      credentials: "include",
    }).then(async (response) => {
      const responseData = await response.json();
      console.log('Data: ', responseData)
      if (responseData.status === "fail") {
        return;
      }
      dispatch(onLogin(responseData.user));
    });
  }, []);

  return (
    <>
      <Header />
      <main>{isLoggedIn ? <ProfileCard /> : <h1>Hello World</h1>}</main>
      <Footer />
    </>
  );
}
