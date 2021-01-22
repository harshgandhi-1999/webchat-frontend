import React, { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import "./searchbar.css";

const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search-bar">
      <InputGroup className="mb-1">
        <FormControl
          placeholder="Search here..."
          style={{
            background: "var(--primary-light)",
            height: "2rem",
            color: "#fff",
            outline: "none",
          }}
          value={searchValue}
          onChange={handleChange}
        />
      </InputGroup>
    </div>
  );
};

export default SearchComponent;
