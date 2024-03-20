import React from "react";
import { FaWhatsapp, FaMapMarkerAlt, FaStar } from "react-icons/fa";

const FloatingIcons = () => {
  return (
    <div className="fixed bottom-1/4 right-6 z-10 flex flex-col items-end">
      <a
        href="https://wa.me/62812345678"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 animate-bounce rounded-full bg-green-500 p-3 transition-colors duration-300 hover:bg-green-600 dark:bg-purple-500 dark:hover:bg-purple-600"
      >
        <FaWhatsapp className="text-2xl text-white" />
      </a>

      <a
        href="https://goo.gl/maps/abcdefgh"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 animate-bounce rounded-full bg-red-500 p-3 transition-colors duration-300 hover:bg-red-600 dark:bg-purple-500 dark:hover:bg-purple-600"
      >
        <FaMapMarkerAlt className="text-2xl text-white" />
      </a>

      <a
        href="https://g.page/your-business"
        target="_blank"
        rel="noopener noreferrer"
        className="animate-bounce rounded-full bg-yellow-500 p-3 transition-colors duration-300 hover:bg-yellow-600 dark:bg-purple-500 dark:hover:bg-purple-600"
      >
        <FaStar className="text-2xl text-white" />
      </a>
    </div>
  );
};

export default FloatingIcons;
