import React, { useContext, useState } from "react";
import control from "./assets/control.png";
import logo from "./assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import LogoHori from "../../image/logo-tulisan-lentera2.png";
import LogoTulisanRumahCinta from "../../image/logo-tulisan-rumah-cinta.png";
import LogoRumahCinta from "../../image/LogoRumahCinta.png";
import {
  FaBookReader,
  FaComment,
  FaHistory,
  FaHome,
  FaMoneyBill,
  FaSignOutAlt,
  FaUserMd,
  FaUsers,
  FaVideo,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/sidebarSlice";
import { logout } from "../../features/authSlice";

const Sidebar = ({ activePage, setActivePage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { open } = useSelector((state) => state.sidebar);

  const Menus = [
    { title: "Dashboard", icon: <FaHome />, link: "/admin/dashboard" },
    { title: "User", icon: <FaUsers />, link: "/admin/user" },
    // { title: "Psikolog", icon: <FaUserMd />, link: "/admin/psikolog" },
    { title: "Blog", icon: <FaBookReader />, link: "/admin/blog" },
    { title: "Video", icon: <FaVideo />, link: "/admin/video" },
    // { title: "Konsultasi ", icon: <FaComment />, link: "/admin/konsul" },
    // { title: "Pembayaran ", icon: <FaMoneyBill />, link: "/admin/payment" },
    // { title: "Feedback ", icon: <FaComment />, link: "/admin/faq" },
    { title: "Riwayat Kunjungan", icon: <FaHistory />, link: "/admin/history" },
  ];

  const handleMenuClick = (title) => {
    setActivePage(title);
  };

  const handleLogout = () => {
    dispatch(logout()); // Langkah 5: Panggil aksi logout saat tombol logout diklik
    navigate("/");
  };

  return (
    <div className="">
      <div className={`fixed h-screen ${open ? "w-72" : "w-20"} bg-bgTri p-5 pt-8 duration-300`}>
        <img
          src={control}
          alt="control"
          className={`absolute -right-3 top-9 w-7 cursor-pointer rounded-full
          border-2 border-bgOpt2  ${!open && "rotate-180"}`}
          onClick={() => dispatch(setOpen(!open))}
        />
        <Link to={"/"} className="flex items-center gap-x-4">
          <img
            src={LogoRumahCinta}
            alt="LogoMandeh"
            className={`w-[40px] cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          />
          <img
            src={LogoTulisanRumahCinta}
            alt="LogoHori"
            className={`w-[170px] origin-left text-textSec duration-200 ${!open && "scale-0"}`}
          />
        </Link>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link to={Menu.link} key={index}>
              <li
                className={`text-md flex cursor-pointer items-center gap-x-4 rounded-md  p-2 hover:bg-bgOpt hover:text-textOpt
              ${Menu.gap ? "mt-9" : "mt-2"}
                } ${activePage === Menu.title ? "bg-bgOpt text-textOpt" : "text-textSec"} ${!open && "justify-center"}`}
                onClick={() => handleMenuClick(Menu.title)}
              >
                <p className="text-center">{Menu.icon}</p>
                {/* <FaHome style={{ width: "24px", height: "24px" }} /> */}
                <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
              </li>
            </Link>
          ))}
          {/* Tombol Logout */}
          <li
            className={`text-md mt-9 flex cursor-pointer items-center gap-x-4 rounded-md p-2 hover:bg-bgOpt hover:text-textOpt ${
              activePage === "Logout" ? "bg-bgOpt text-textOpt" : "text-textSec"
            } ${!open && "justify-center"}`}
            onClick={() => handleLogout()} // Langkah 6: Panggil handler logout saat tombol logout diklik
          >
            <p className="text-center">
              <FaSignOutAlt />
            </p>
            <span className={`${!open && "hidden"} origin-left duration-200`}>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
