import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

const UserDashboardGuard = ({ children }) => {
  const navigate = useNavigate();
  // const authState = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  let userData = null;

  if (token) {
    try {
      userData = jwt_decode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/login?message=Invalid token");
    }
  }

  useEffect(() => {
    // Cek peran dan arahkan pengguna ke dashboard yang sesuai
    try {
      // if (
      //   #!authState ||
      //   #!authState.user ||
      //   #!authState.user.role ||
      //   authState.user.role !== "user" ||
      //   authState.isLogin === false
      // ) {
      //   throw new Error("Unauthorized");
      // }
      if (!userData || !userData.role || userData.role !== "user") {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      navigate("/login?message=Unauthorized");
    }
  }, [navigate, userData, token]);

  return <>{children}</>;
};

export default UserDashboardGuard;
