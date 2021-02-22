import React, { useContext, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import useLocalStorage from "../hooks/useLocalStorage";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";

const ContactsContext = React.createContext({
  contacts: [],
  createContact: (id, name) => {},
});

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const { user, logout } = useAuth();

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
      Object.keys(user).length !== 0 &&
      user !== null &&
      user.token !== null
    ) {
      axiosInstance
        .get(`/allContacts/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setContacts(res.data.contactList);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 401) {
              logout();
            } else {
              toast.error(`${err.response.data.message}`);
            }
          } else {
            toast.error(`${err.message}`, {
              className: "some_error_toast",
            });
          }
        });
    } else {
      setContacts([]);
    }
  }, [user, setContacts]);

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
