import React from "react";
import { Dropdown } from "react-bootstrap";
import DropdownToggler from "./DropdownToggler";
import "./menuStyle.css";

const DropdownMenu = (props) => {
  return (
    <>
      <Dropdown>
        <DropdownToggler
          color={props.color}
          tooltipText={props.tooltipText}
          size={props.size}
        />
        <Dropdown.Menu align="right">{props.children}</Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default DropdownMenu;
