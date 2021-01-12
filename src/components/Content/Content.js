import React from "react";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import ChatComponent from "../ChatComponent.js/ChatComponent";
import ContactInfo from "../ContactInfoComponent.js/ContactInfo";

const Content = () => {
  return (
    <div className="flex flex-col flex-auto h-full">
      <div className="bg-blue-500 text-xl text-white font-bold text-center rounded-t-3xl p-1.5 shadow">
        WebChat
      </div>
      <div className="flex flex-row flex-auto">
        <SidebarComponent />
        <ChatComponent />
        <ContactInfo />
      </div>
    </div>
  );
};

export default Content;
