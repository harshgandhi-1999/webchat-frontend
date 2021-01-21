import React from "react";
import SidebarHeader from "./SidebarHeader";
import SearchComponent from "./SearchComponent";
import ChatList from "./ChatList";
import "./scrollbarStyle.css";
import "./sidebar.css";

const SidebarComponent = ({ openDrawer }) => {
  return (
    <div className="sidebar-style bg-primary w-25 d-flex flex-column">
      <div className="p-4 shadow-sm">
        <SidebarHeader openDrawer={openDrawer} />
        <SearchComponent />
      </div>
      {/* <hr /> */}
      <div className="chat-list overflow-auto flex-grow-1">
        <ChatList />
      </div>
    </div>
  );
};

export default SidebarComponent;
