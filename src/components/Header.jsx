import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import LogoHori from "../image/logo-hori2.png";
import LogoMandeh from "../image/logo-mandeh.png";
import LogoRumahCinta from "../image/LogoRumahCinta.png";
import LogoTulisanMandeh from "../image/logo-tulisan-lentera2.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { RiAdminLine, RiLogoutBoxLine, RiProfileLine } from "react-icons/ri";
import ContactAndLocation from "../components/contactAndLocation";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // !theme
  // State untuk menyimpan status tema
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "system");
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  console.log(darkQuery, "darkQuery");

  const options = [
    { icon: "sunny", text: "light" },
    { icon: "moon", text: "dark" },
  ];
  // !end

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/");
  };
  // !theme
  function onWindowMatch() {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && darkQuery.matches)) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }
  onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

  darkQuery.addEventListener("change", (e) => {
    if ((!"theme") in localStorage) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });
  // !end

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  let linkTo = "";
  // const role = authState?.user?.role || "N/A";

  if (user?.role === "admin") {
    linkTo = "/admin/dashboard";
  } else if (user?.role === "psikolog") {
    linkTo = "/psikolog/dashboard";
  } else if (user?.role === "user") {
    linkTo = "/user/dashboard";
  } else {
    // Jika role tidak sesuai, Anda bisa mengatur linkTo ke halaman lain yang sesuai.
    linkTo = "/psikolog/dashboard";
  }
  console.log(user?.role);

  return (
    <nav className={`dark:text-bold z-10 w-full bg-bgSec text-textPri shadow-xl dark:bg-purple-dark dark:text-white`}>
      <div className="my-3 flex flex-col items-center justify-between lg:flex-row">
        <div className="flex items-center justify-between lg:border-b-0">
          <div className="w-full p-2">
            {/* <button onClick={toggleMenu} className="bgOpt block font-bold focus:outline lg:hidden"> */}
            <div className="block font-bold focus:outline lg:hidden">
              <div className="flex w-[470px] flex-wrap items-center justify-around p-2 md:justify-between">
                <div className="">
                  <Link to={"/"}>
                    <div>
                      <img className="h-[30px]" src={LogoRumahCinta} alt="LogoMandeh" />
                    </div>
                  </Link>
                </div>
                <div className="hidden lg:block">
                  <Link to={"/"}>
                    <div>
                      <img className="h-[30px]" src={LogoHori} alt="LogoTulisanMandeh" />
                    </div>
                  </Link>
                </div>
                {/* Tombol untuk mengubah tema */}
                <div
                  className={`${isOpen ? "block" : "hidden"} rounded bg-gray-100 duration-100 dark:bg-slate-800 lg:hidden`}
                >
                  {options?.map((opt) => (
                    <button
                      key={opt.text}
                      onClick={() => setTheme(opt.text)}
                      className={`m-1 h-8 w-8 rounded-full text-xl leading-9 ${theme === opt.text && "text-sky-600"}`}
                    >
                      <ion-icon name={opt.icon}></ion-icon>
                    </button>
                  ))}
                </div>
                {/* tombol dropDown */}
                <div className="">
                  <svg
                    className="h-10 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    strokeWidth="2"
                    stroke="currentColor"
                    color="#FFB803"
                    onClick={toggleMenu}
                  >
                    {/* tombol garis 3 */}
                    <path
                      className={!isOpen ? "block" : "hidden"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                    {/* tombol x */}
                    <path
                      className={isOpen ? "block" : "hidden"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                {/* tombol dropDown */}
              </div>
            </div>
            {/* </button> */}
          </div>
        </div>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full flex-col items-center justify-between lg:flex lg:flex-row`}
        >
          <div className="ml-3 flex flex-col items-center gap-4 lg:flex-row">
            <Link to={"/"}>
              <img src={LogoRumahCinta} alt="logoRumahCinta" className="w-8 lg:w-10" />
            </Link>
            <Link to={"/"} className="hover:text-gray-500">
              Home
            </Link>
            <Link to={"/blog"} className="hover:text-gray-500">
              Blog
            </Link>
            <Link to={"/video"} className="hover:text-gray-500">
              Video
            </Link>
            <Link to={"/tes"} className="hover:text-gray-500">
              Tes Psikologi
            </Link>
            <Link to={"/konsultasi"} className="hover:text-gray-500">
              Konsultasi
            </Link>
          </div>
          <div className={!isOpen ? "block" : "hidden"}>
            <img className="h-[30px]" src={LogoHori} alt="LogoHori" />
          </div>
          <div className="my-3 flex items-center lg:flex-row" ref={dropdownRef}>
            {isLogin ? (
              <div className="my-3 mr-8 flex flex-col items-baseline gap-3 lg:flex-row">
                <div className="relative">
                  <div
                    className="flex cursor-pointer items-center gap-2 rounded-2xl text-textSec"
                    onClick={toggleDropdown}
                  >
                    <FaUserCircle className="hover:text-textPrimary text-xl" />
                    {user.name}
                  </div>
                  {dropdownOpen && (
                    <ul className="dropdown-menu dropdown-menu fixed right-5 float-left m-0 mt-2 ml-4 w-48 min-w-max list-none items-center rounded-lg border-none bg-bgPri bg-clip-padding py-2 text-left text-base text-textSec shadow-lg">
                      <li>
                        <Link className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200" to={linkTo}>
                          <RiAdminLine /> Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="flex gap-2 px-4 py-2 hover:bg-gray-200" to="/profile">
                          <RiProfileLine />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          type="button"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200"
                          onClick={handleLogout}
                        >
                          <RiLogoutBoxLine /> Logout
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className="my-3 mr-8 flex flex-col items-center gap-3 lg:flex-row">
                {/* Tombol untuk mengubah tema */}
                <div className=" hidden rounded bg-gray-100 duration-100 dark:bg-slate-800 lg:flex">
                  {options?.map((opt) => (
                    <button
                      key={opt.text}
                      onClick={() => setTheme(opt.text)}
                      className={`m-1 h-8 w-8 rounded-full text-xl leading-9 ${theme === opt.text && "text-sky-600"}`}
                    >
                      <ion-icon name={opt.icon}></ion-icon>
                    </button>
                  ))}
                </div>
                <Link
                  className="rounded-2xl bg-bgOpt2 px-9 py-1 text-white hover:bg-bgOpt dark:bg-gray-800 dark:hover:bg-gray-600"
                  to="/login"
                >
                  Masuk
                </Link>
                <Link
                  className="rounded-2xl bg-bgFunc px-9 py-1 text-white hover:bg-bgFunc3 dark:bg-gray-800 dark:hover:bg-gray-600"
                  to="/register"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
