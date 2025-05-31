import React from "react";
import SearchComponent from "../SearchComponent/SearchComponent";
import { useContacts } from "../../context/ContactProvider";
import { useConversations } from "../../context/ConversationProvider";
import SideDrawer from "../SideDrawer/SideDrawer";
import { ListGroup } from "react-bootstrap";
import "./allcontactslist.css";

const AllContactsList = ({ show, closeDrawer }) => {
  const { contacts } = useContacts();
  const {
    conversations,
    selectConversationKey,
    createConversation,
  } = useConversations();

  const handleSelect = (contactNo, contactName) => {
    const recipient = {
      recipientNo: contactNo,
      recipientName: contactName,
    };

    if (contactNo in conversations) {
      //means that it is already present in conversation list then select that index
      //TODO: select conversation if already present
      selectConversationKey(contactNo);
    } else {
      //means not present, so create new conversation on select with no messages
      //first create new conversation and then select that conversation
      createConversation(recipient, () => selectConversationKey(contactNo));
    }
  };

  return (
    <SideDrawer title="All Contacts" show={show} closeDrawer={closeDrawer}>
      <div className="search-contacts p-2">
        <SearchComponent />
      </div>
      <div className="all-contacts-list flex-grow-1 overflow-auto">
        <ListGroup style={{ background: "transparent" }}>
          {Object.keys(contacts).map((key) => {
            const contact = contacts[key];
            return (
              <ListGroup.Item
                className="user-select-none"
                key={contact.contactNo}
                onClick={() => handleSelect(contact.contactNo, contact.name)}
              >
                {contact.name || contact.contactNo}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </SideDrawer>
  );
};

export default AllContactsList;
