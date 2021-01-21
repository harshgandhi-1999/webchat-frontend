import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./sidedrawer.css";

const SideDrawer = ({ show, title, closeDrawer }) => {
  return (
    show && (
      <div className="side-drawer d-flex flex-column shadow-sm">
        <div className="side-drawer-header bg-primary text-white">
          <Button variant="none" onClick={closeDrawer}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              color="white"
              style={{ fontSize: "1.2rem", cursor: "pointer" }}
            />
          </Button>
          <div className="side-drawer-title">
            <h5>{title}</h5>
          </div>
        </div>
        <div className="side-drawer-body"></div>
      </div>
    )
  );
};

export default SideDrawer;
