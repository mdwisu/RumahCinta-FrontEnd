import axios from "axios";
import React, { useState } from "react";

export default function AutoCompletePatient({ onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    console.log("inivalue seracth patient", value);

    if (value.trim() !== "") {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `http://localhost:5000/user/search/${value}`,
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`,
        },
      };
      try {
        const response = await axios.request(config);
        setSuggestions(response.data);
        console.log("patient", response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    onSelect(suggestion._id);
    setSuggestions([]);
  };
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Cari pasien..."
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
      />
      {suggestions.length > 0 && (
        <ul className="mt-2 max-h-48 overflow-y-auto rounded-md bg-white py-1 shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {suggestion.name} - {suggestion.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
