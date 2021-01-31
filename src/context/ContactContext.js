import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = React.createContext({
  contacts: [],
  createContact: (id, name) => {},
});

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  // const [selectedContactIndex, setSelectedContactIndex] = useState(null);

  const createContact = (contactNo, name) => {
    setContacts((prevContacts) => {
      return [...prevContacts, { contactNo, name }];
    });
  };

  // const handleSelectContact = (index) => {
  //   console.log(index);
  //   setSelectedContactIndex(index);
  // };

  // console.log(contacts);
  return (
    <ContactsContext.Provider
      value={{
        contacts: contacts,
        createContact: createContact,
        // selectedContact: contacts[selectedContactIndex],
        // handleSelectContact: handleSelectContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
