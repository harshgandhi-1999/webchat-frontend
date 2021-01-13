import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faPlusCircle,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

const SidebarHeader = () => {
  return (
    <div className="sidebar-header flex flex-row justify-between mb-2">
      <div className="user-profile">
        <FontAwesomeIcon
          icon={faUserCircle}
          color="white"
          style={{ fontSize: "2rem" }}
        />
      </div>
      <div className="user-actions flex flex-row items-center">
        <div className="new-chat-btn mr-4">
          <button className="focus:outline-none">
            <FontAwesomeIcon
              icon={faPlusCircle}
              color="white"
              style={{ fontSize: "1.5rem" }}
            />
          </button>
        </div>
        <div className="options-btn">
          <button className="focus:outline-none">
            <FontAwesomeIcon
              icon={faEllipsisV}
              color="white"
              style={{ fontSize: "1.5rem" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
