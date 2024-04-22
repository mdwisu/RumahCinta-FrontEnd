import React, { useEffect, useState, useRef } from "react";

const DropdownButton = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative block" ref={dropdownRef}>
      <button
        className="flex items-center justify-between px-2 py-2 font-semibold text-black hover:text-gray-500 focus:outline-none dark:text-white"
        onClick={toggleDropdown}
      >
        {title}
        <svg
          className={`ml-2 h-4 w-4 transition-transform ${isOpen ? "rotate-180 transform" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="static z-10 mt-2 rounded-md pl-5 lg:fixed lg:w-48 lg:bg-white lg:pl-0 lg:shadow-lg">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block  border-primary px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:outline-none lg:shadow-none"
                role="menuitem"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
