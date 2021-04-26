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
    selectConversationIndex,
    createConversation,
  } = useConversations();

  const handleSelect = (contactNo, contactName) => {
    //checking if selected contact is already present in conversations list
    const clickedItemIndex = conversations.findIndex(
      (el) => el.recipient.recipientNo === contactNo
    );

    const recipient = {
      recipientNo: contactNo,
      recipientName: contactName,
    };

    if (clickedItemIndex !== -1) {
      //means that it is already present in conversation list then select that index
      selectConversationIndex(clickedItemIndex, recipient);
    } else {
      //means not present, so create new conversation on select with no messages
      createConversation(recipient, () =>
        selectConversationIndex(conversations.length, recipient)
      );
    }
  };

  return (
    <SideDrawer title="All Contacts" show={show} closeDrawer={closeDrawer}>
      <div className="search-contacts p-2">
        <SearchComponent />
      </div>
      <div className="all-contacts-list flex-grow-1 overflow-auto">
        <ListGroup style={{ background: "transparent" }}>
          {contacts.map((contact) => {
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
