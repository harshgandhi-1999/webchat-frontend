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
      return {
        ...prevContacts,
        [contactNo]: { contactNo: contactNo, name: name },
      };
    });
  };

  useEffect(() => {
    if (
      Object.keys(user).length !== 0 &&
      user !== null &&
      user.token !== null
    ) {
      axiosInstance
        .get(`/contact/all/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          //converting array into object of key value
          let result = res.data.contactList.reduce(
            (obj, item) => ({ ...obj, [item.contactNo]: item }),
            {}
          );
          // _id of document is also coming in contact list in res
          setContacts(result);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            logout();
          } else {
            toast.error("Some error occured. Please reload..");
          }
        });
    } else {
      setContacts({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, setContacts]);

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
