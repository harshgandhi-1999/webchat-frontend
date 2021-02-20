import React, { useContext, useEffect } from "react";
import { useAuth } from "./AuthProvider";
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
  const { user } = useAuth();

  const createContact = (contactNo, name) => {
    setContacts((prevContacts) => {
      return [...prevContacts, { contactNo, name }];
    });
  };

  const updateContact = (contactNo, name) => {
    setContacts((prevContacts) => {
      const newContacts = prevContacts.map((contact) => {
        if (contact.contactNo === contactNo) {
          return { ...contact, name: name };
        }
        return contact;
      });
      return newContacts;
    });
  };

  useEffect(() => {
    if (
      Object.keys(user).length === 0 ||
      user === null ||
      user.token === null ||
      user.token === ""
    ) {
      setContacts([]);
    }
  }, [user, setContacts]);

  // console.log(contacts);
  return (
    <ContactsContext.Provider
      value={{
        contacts: contacts,
        createContact: createContact,
        updateContact: updateContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
