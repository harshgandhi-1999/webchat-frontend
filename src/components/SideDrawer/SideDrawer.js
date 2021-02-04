import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import SearchComponent from "../SearchComponent/SearchComponent";
import { useContacts } from "../../context/ContactContext";
import { useConversations } from "../../context/ConversationContext";
import "./sidedrawer.css";

const variants = {
  open: { x: "0%" },
  closed: { x: "-100%" },
};

const SideDrawer = ({ show, title, closeDrawer }) => {
  const { contacts } = useContacts();
  const {
    conversations,
    selectConversationIndex,
    createConversation,
  } = useConversations();

  const handleSelect = (contactNo, contactName, index) => {
    //checking if selected contact is already present in conversations list
    const clickedItemIndex = conversations.findIndex(
      (el) => el.recipient.recipientNo === contactNo
    );

    if (clickedItemIndex !== -1) {
      //means that it is already present in conversation list then select that index
      selectConversationIndex(clickedItemIndex);
    } else {
      //means not present, so create new conversation on select with no messages
      const recipient = {
        recipientNo: contactNo,
        recipientName: contactName,
      };
      createConversation(recipient, () =>
        selectConversationIndex(conversations.length)
      );
    }
  };

  return (
    <motion.div
      className="side-drawer d-flex flex-column shadow-sm"
      initial={{ x: "-100%" }}
      animate={show ? "open" : "closed"}
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
        <div className="search-contacts p-2">
          <SearchComponent />
        </div>
        <div className="all-contacts-list flex-grow-1 overflow-auto">
          <ListGroup style={{ background: "transparent" }}>
            {contacts.map((contact, index) => {
              return (
                <ListGroup.Item
                  className="user-select-none"
                  key={contact.contactNo}
                  onClick={() =>
                    handleSelect(contact.contactNo, contact.name, index)
                  }
                >
                  {contact.name || contact.contactNo}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </div>
    </motion.div>
  );
};

export default SideDrawer;
