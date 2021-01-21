import React from "react";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import ChatComponent from "../ChatComponent.js/ChatComponent";
import ContactInfo from "../ContactInfoComponent.js/ContactInfo";
import './content.css'

const Content = () => {
  return (
    <div className="content-style bg-white d-flex flex-column overflow-hidden">
      <div
        className="chatapp-title bg-primary py-1 text-xl text-white font-bold text-center"
      >
        WebChat
      </div>
      <div className="d-flex flex-row flex-grow-1" style={{ height: "90%" }}>
        <SidebarComponent />
        <ChatComponent />
        <ContactInfo />
      </div>
    </div>
  );
};

export default Content;
