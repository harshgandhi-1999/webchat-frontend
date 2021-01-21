import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import "./menuStyle.css";
import AddContactModal from "../AddContactModal.js/AddContactModal";

const DropdownMenu = ({ handleOpen }) => {
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="toggle">
          <FontAwesomeIcon
            icon={faEllipsisV}
            color="white"
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu align="right">
          <Dropdown.Item onClick={handleOpen}>Add Contact</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default DropdownMenu;
