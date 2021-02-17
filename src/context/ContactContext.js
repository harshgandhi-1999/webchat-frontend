import React, { useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
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

  const createContact = (contactNo, name) => {
    setContacts((prevContacts) => {
      return [...prevContacts, { contactNo, name }];
    });
  };
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn === false) {
      setContacts([]);
    }
  }, [isLoggedIn, setContacts]);

  // console.log(contacts);
  return (
    <ContactsContext.Provider
      value={{
        contacts: contacts,
        createContact: createContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
