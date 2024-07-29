import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const OwnerDashboardGuard = ({ children }) => {
  const navigate = useNavigate();
  // ! versi 1
  // const token = localStorage.getItem("token");
  // let userData = null;

  // if (token) {
  //   try {
  //     userData = jwt_decode(token);
  //   } catch (error) {
  //     console.error("Error decoding token:", error);
  //     navigate("/login?message=Invalid token");
  //   }
  // }

  // useEffect(() => {
  //   // Cek peran dan arahkan pengguna ke dashboard yang sesuai
  //   try {
  //     if (!userData || !userData.role || userData.role !== "admin") {
  //       throw new Error("Unauthorized");
  //     }
  //   } catch (error) {
  //     navigate("/login?message=Unauthorized");
  //   }
  // }, [navigate, userData]);
// ! versi 2
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationTime");

    if (token && expirationTime) {
      const currentTime = Date.now();

      if (currentTime > expirationTime) {
        // Token sudah kedaluwarsa, hapus token dari local storage
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        navigate("/login?message=Token expired");
      } else {
        // Token masih valid, lanjutkan pengecekan peran
        try {
          const decodedToken = jwt_decode(token);
          if (!decodedToken.role || decodedToken.role !== "owner") {
            throw new Error("Unauthorized");
          }
        } catch (error) {
          navigate("/login?message=Unauthorized");
        }
      }
    } else {
      // Token tidak ada, arahkan ke halaman login
      navigate("/login?message=Unauthorized");
    }
  }, [navigate]);
  return <>{children}</>;
};

export default OwnerDashboardGuard;
