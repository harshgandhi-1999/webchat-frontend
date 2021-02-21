import React, { useState } from "react";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import ChatComponent from "../ChatComponent.js/ChatComponent";
import ContactInfo from "../ContactInfoComponent.js/ContactInfo";
import AllContactsList from "../AllContactsList/AllContactsList";
import UserProfile from "../UserProfileComponent/UserProfile";
import { useAuth } from "../../context/AuthProvider";
import { useConversations } from "../../context/ConversationProvider";
import "./content.css";

const Content = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerName, setDrawerName] = useState("");
  const { isLoggedIn } = useAuth();
  const { selectedConversation } = useConversations();

  const closeDrawer = () => setShowDrawer(false);
  const openDrawer = (drawer) => {
    if (typeof drawer === "string") {
      setDrawerName(drawer);
      setShowDrawer(true);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="content-style bg-white d-flex flex-column overflow-hidden">
        <div className="chatapp-title bg-primary py-1 text-xl text-white font-weight-bolder text-center">
          WEBCHAT
        </div>
        <div
          className="d-flex flex-row flex-grow-1"
          style={{ height: "90%", position: "relative" }}
        >
          {drawerName === "ALL_CONTACTS" && (
            <AllContactsList show={showDrawer} closeDrawer={closeDrawer} />
          )}
          {drawerName === "USER_PROFILE" && (
            <UserProfile show={showDrawer} closeDrawer={closeDrawer} />
          )}
          <SidebarComponent openDrawer={openDrawer} />
          <ChatComponent />
          {selectedConversation ? <ContactInfo /> : <></>}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Content;
