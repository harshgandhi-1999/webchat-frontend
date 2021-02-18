import React from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthProvider";
import "./menuStyle.css";

const DropdownMenu = ({ handleOpen }) => {
  const { logout } = useAuth();
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
          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default DropdownMenu;
