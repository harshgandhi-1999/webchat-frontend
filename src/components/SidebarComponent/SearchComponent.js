import React from "react";
import {InputGroup,FormControl} from 'react-bootstrap'
import './sidebar.css'

const SearchComponent = () => {
  return (
    <div className="search-bar">
      <InputGroup className="mb-1">
        <FormControl
          placeholder="Search here..."
          aria-label="search-contacts"
          style={{background: 'var(--primary-light)',height: '2rem',color: '#fff',outline: "none"}}
        />
      </InputGroup>
    </div>
  );
};

export default SearchComponent;
