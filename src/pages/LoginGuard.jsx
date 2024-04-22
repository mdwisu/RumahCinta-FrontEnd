import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginGuard = ({ children }) => {
  const navigate = useNavigate();
  // const authState = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Cek peran dan arahkan pengguna ke dashboard yang sesuai
    try {
      // if (!authState || authState.isLogin === false) {
      if (token === false) {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      navigate("/login?message=Unauthorized");
    }
  }, [navigate, token]);

  return <>{children}</>;
};

export default LoginGuard;
