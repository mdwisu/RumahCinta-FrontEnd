import React, { useEffect } from "react";
import { useState } from "react";
import LogoMandehLogin from "../image/logo-mandeh-login.png";
import LogoMandeh from "../image/logo-hori2.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaAngleDoubleRight } from "react-icons/fa";
import axios from "axios";
import { fetchUser, setToken } from "../features/authSlice";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      email,
      password,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      const token = response.data.token;
      // dispatch(setToken(token));
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);
      const expirationTime = decodedToken.exp * 1000; // Ubah ke milidetik

      localStorage.setItem("token", token);
      localStorage.setItem("expirationTime", expirationTime);

      // dispatch(setToken(payload));

      const actionResult = await dispatch(fetchUser(token));
      const role = actionResult.payload.role;
      const user_id = actionResult.payload._id;
      localStorage.setItem("user", JSON.stringify(actionResult.payload));
      localStorage.setItem("user_id", user_id);
      redirectToRolePage(role);
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.data.message === "Email is not verified, please verify it before logging in") {
          Swal.fire({
            icon: "error",
            title: "Email Not Verified",
            text: "Please verify your email before logging in!",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        } else {
          setError(error.response.data.message);
        }
      }
    }
  };

  const redirectToRolePage = (role) => {
    switch (role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "user":
        navigate("/");
        break;
      case "psikolog":
        navigate("/psikolog/dashboard");
        break;
      default:
        navigate("/");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {/* image logo */}
      <div className="absolute top-0 left-0 z-0 opacity-25">
        <img src={LogoMandehLogin} className="h-1/2 w-1/2" alt="logo mandeh login" />
      </div>
      {/* image logo */}
      {/* image logo lengkap */}
      <div className="absolute top-0 right-0 z-0 m-5">
        <img src={LogoMandeh} className="w-[250px]" alt="logo mandeh" />
      </div>
      {/* image logo lengkap */}
      {/* card */}
      <div className="z-50 flex h-screen flex-col justify-center">
        <div className="relative m-auto w-full max-w-sm rounded-lg border border-gray-200 bg-bgSec p-4 shadow sm:p-6 md:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-center text-[54px] font-semibold text-textPri">Login</h5>
            <p className="text-center text-sm  font-medium text-gray-500">Silahkan masukan email dan password</p>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-bgOpt2 focus:outline-none focus:ring-1 focus:ring-bgOpt2"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && error === "Cannot read properties of null (reading '_id')" && (
                <span className="mt-1 text-xs text-red-500">*Email yang dimasukkan belum terdaftar.</span>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-bgOpt2 focus:outline-none focus:ring-1 focus:ring-bgOpt2"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && error === "Password is not correct" && (
                <span className="mt-1 text-xs text-red-500">*Password yang dimasukkan salah.</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-bgOpt px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-bgOpt2 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Masuk
            </button>
            <div className="text-center text-sm font-medium text-gray-500 ">
              Belum mempunyai akun? daftar{" "}
              <a href={"/register"} className="text-bgOpt2 hover:underline ">
                disini
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* card */}
      {/* tombol back */}
      <div className="float-right mr-10 -mt-8 flex items-center font-medium text-bgFunc hover:text-bgFunc2 ">
        <div>
          <Link to={"/"} className="">
            Kembali{" "}
          </Link>
        </div>
        <div>
          <Link to={"/"}>
            <FaAngleDoubleRight className="" />{" "}
          </Link>
        </div>
      </div>
      {/* tombol back */}
    </div>
  );
};

export default Login;
