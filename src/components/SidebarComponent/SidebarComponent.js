import React from "react";
import SidebarHeader from "./SidebarHeader";
import SearchComponent from "./SearchComponent";
import ChatList from "./ChatList";
import "./scrollbarStyle.css";

const SidebarComponent = () => {
  return (
    <div className="bg-blue-500 w-1/4 rounded-bl-3xl flex flex-col">
      <div className="p-4 shadow">
        <SidebarHeader />
        <SearchComponent />
      </div>
      {/* <hr /> */}
      <div className="chat-list overflow-y-auto flex-grow rounded-bl-3xl">
        <ChatList />
      </div>
    </div>
  );
};

export default SidebarComponent;
