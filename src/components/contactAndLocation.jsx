import React from "react";
import WhatsAppIcon from "../image/whatsapp.png";
import LocationIcon from "../image/location.png";
import StarIcon from "../image/star.png";

export default function ContactAndLocation() {
  return (
    <div className="fixed z-50 right-1 top-1/2 transform -translate-y-1/2 justify-end items-center space-x-2">
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 relative group"
      >
        <img src={WhatsAppIcon} alt="WhatsApp" className="h-6 w-6 transition duration-300 transform hover:scale-110" />
        <span className="hidden absolute left-[-120px] top-3 bg-gray-800 text-white py-1 px-2 rounded shadow-lg transform -translate-y-1/2 group-hover:inline-block">
          WhatsApp
        </span>
      </a>
      <a
        href="https://maps.google.com/maps?q=lokasi"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 relative group"
      >
        <img
          src={LocationIcon}
          alt="Location"
          className="h-6 w-6 transition duration-300 transform hover:scale-110 filter hover:brightness-125 hover:filter-none"
        />
        <span className="hidden absolute left-[-120px] top-9 bg-gray-800 text-white py-1 px-2 rounded shadow-lg transform -translate-y-1/2 group-hover:inline-block">
          Location
        </span>
      </a>
      <a href="https://example.com/review" target="_blank" rel="noopener noreferrer" className="relative group">
        <img src={StarIcon} alt="Review" className="h-6 w-6 transition duration-300 transform hover:scale-110" />
        <span className="hidden absolute left-[-120px] top-10 bg-purple-500 text-white py-1 px-2 rounded shadow-lg transform -translate-y-1/2 group-hover:inline-block">
          Review
        </span>
      </a>
    </div>
  );
}
