import React,{useContext, useState} from 'react';

const ContactsContext = React.createContext({
    contacts: [],
    createContact: (id,name)=>{}
});

export function useContacts(){
    return useContext(ContactsContext);
}

export function ContactsProvider({children}){

    const [contacts, setContacts] = useState([]);

    const createContact = (id,name) => {
        setContacts(prevContacts=>{
            return [...prevContacts,{id,name}]
        })
    }


    return <ContactsContext.Provider value={{contacts:contacts,createContact:createContact}}>
        {children}
    </ContactsContext.Provider>
}