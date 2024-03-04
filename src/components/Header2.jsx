import React, { useState, useEffect } from "react";
import LogoRumahCinta from "../image/logo-hori2.png";

export default function Header2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const navLinks = document.querySelector(".nav-links");
    navLinks.style.top = isMenuOpen ? "9%" : "-100%";
  }, [isMenuOpen]);

  const handleToggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div>
      <header className="bg-white">
        <nav className="flex justify-between items-center w-[92%]  mx-auto">
          <div>
            <img
              className="w-16 cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/512/5968/5968204.png"
              alt="..."
            />
          </div>
          <div className="nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5">
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
              <li>
                <a className="hover:text-gray-500" href="#">
                  Products
                </a>
              </li>
              <li>
                <a className="hover:text-gray-500" href="#">
                  Solution
                </a>
              </li>
              <li>
                <a className="hover:text-gray-500" href="#">
                  Resource
                </a>
              </li>
              <li>
                <a className="hover:text-gray-500" href="#">
                  Developers
                </a>
              </li>
              <li>
                <a className="hover:text-gray-500" href="#">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-6">
            <button
              className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
              onClick={handleToggleMenu}
            >
              Sign in
            </button>
            <ion-icon
              onClick={handleToggleMenu}
              name={isMenuOpen ? "close" : "menu"}
              className="text-3xl cursor-pointer md:hidden"
            ></ion-icon>
          </div>
        </nav>
      </header>
    </div>
  );
}
