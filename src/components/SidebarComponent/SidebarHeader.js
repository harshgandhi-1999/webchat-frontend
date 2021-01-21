import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faPlusCircle,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

const SidebarHeader = () => {

  return (
    <React.Fragment>
      <div className="sidebar-header d-flex flex-row justify-content-between mb-2">
        <div className="user-profile">
          <FontAwesomeIcon
            icon={faUserCircle}
            color="white"
            style={{fontSize: "2rem" }}
          />
        </div>
        <div className="user-actions d-flex flex-row align-items-center">
          <div className="new-chat-btn mr-4">
            <FontAwesomeIcon
                icon={faPlusCircle}
                color="white"
                style={{ fontSize: "1.5rem",cursor:'pointer' }}
            />
          </div>
            <DropdownMenu/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SidebarHeader;
