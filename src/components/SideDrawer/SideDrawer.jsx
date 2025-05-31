import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "./sidedrawer.css";

const variants = {
  open: { x: "0%", opacity: 1 },
  closed: { x: "-100%", opacity: 0 },
};

const SideDrawer = ({ show, title, closeDrawer, children }) => {
  return (
    <motion.div
      className="side-drawer d-flex flex-column shadow-sm"
      initial={{ x: "-100%" }}
      animate={show ? "open" : "closed"}
      transition={{ duration: 0.3, ease: "easeOut" }}
      variants={variants}
    >
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
      <div className="side-drawer-body d-flex flex-column overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

export default SideDrawer;
