import React, { useRef, useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faPlusCircle,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import AddContactModal from "../AddContactModal.js/AddContactModal";
import Backdrop from "../Backdrop/Backdrop";

const SidebarHeader = () => {

  const [showMenu,setShowMenu] = useState(false);
  const dropdownContainerRef = useRef();

  const toggleMenu = ()=>{
    setShowMenu((prevshow)=>!prevshow);
  }

  const handleClickOutside = event => {
    if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown',handleClickOutside);

    return ()=>{
      document.removeEventListener("mouseup",handleClickOutside);
    }
  }, [])

  return (
    <React.Fragment>
      <div className="sidebar-header d-flex flex-row justify-content-between mb-2">
        {/* <Backdrop/> */}
        {/* <AddContactModal/> */}
        <div className="user-profile">
          <FontAwesomeIcon
            icon={faUserCircle}
            color="white"
            style={{ fontSize: "2rem" }}
          />
        </div>
        <div className="user-actions d-flex flex-row align-items-center">
          <div className="new-chat-btn mr-4">
            <button className="focus:outline-none">
              <FontAwesomeIcon
                icon={faPlusCircle}
                color="white"
                style={{ fontSize: "1.5rem" }}
              />
            </button>
          </div>
          <div className="dropdown inline-block relative" ref={dropdownContainerRef}>
            <button className="focus:outline-none">
              <FontAwesomeIcon
                icon={faEllipsisV}
                color="white"
                style={{ fontSize: "1.5rem" }}
                onClick={toggleMenu}
              />
            </button>
            {showMenu && <DropdownMenu/>}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SidebarHeader;
