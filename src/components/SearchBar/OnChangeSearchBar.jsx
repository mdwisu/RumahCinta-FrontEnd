import React, { useState } from 'react';

const OnChangeSearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center bg-white rounded-lg overflow-hidden">
      <input
        type="text"
        className="flex-1 px-4 py-2 outline-none"
        placeholder="Cari video..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default OnChangeSearchBar;