import React from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import "./menuStyle.css";

const DropdownToggler = ({ color, tooltipText, size }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="menu-tooltip">{tooltipText}</Tooltip>}
    >
      <Dropdown.Toggle variant="toggle" style={{ padding: "0" }}>
        <FontAwesomeIcon
          icon={faEllipsisV}
          color={color}
          style={{ fontSize: `${size}`, cursor: "pointer" }}
        />
      </Dropdown.Toggle>
    </OverlayTrigger>
  );
};

export default DropdownToggler;
