import React, { useState } from "react";

const OnSubmitSearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center overflow-hidden rounded-lg bg-white">
      <input
        type="text"
        className="flex-1 px-4 py-2 outline-none"
        placeholder="Cari video..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button
        className="rounded-r-lg bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={handleSearch}
      >
        Cari
      </button>
    </div>
  );
};

export default OnSubmitSearchBar;
