import React from "react";

const SearchComponent = () => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="bg-blue-400 w-full h-8 rounded-sm p-2 text-white placeholder-white outline-none"
        placeholder="Search Here..."
      />
    </div>
  );
};

export default SearchComponent;
