import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../../context/ContactProvider";
import { useConversations } from "../../context/ConversationProvider";
import { toast } from "react-toastify";
import Label from "../FormLabel/Label";
import axiosInstance from "../../utils/axios";
import { useAuth } from "../../context/AuthProvider";

function Capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const AddContactModal = ({ show, handleClose, title, addName, number }) => {
  const [validated, setValidated] = useState(false);
  const { contacts, createContact } = useContacts();
  const { user, logout } = useAuth();
  const {
    setSelectedConversation,
    updateNameInConversation,
  } = useConversations();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      event.stopPropagation();
    } else {
      const name = Capitalize(event.target.name.value.trim());
      let contactNo;
      if (addName === true) {
        contactNo = number;
      } else {
        contactNo = event.target.contactNo.value.trim();
      }

      //check if already there
      // const alreadyThere = contacts.some(
      //   (el) => el.contactNo === contactNo || el.name === name
      // );

      //if already there in contacts
      if (contactNo in contacts) {
        toast.error("This contact already exists");
      } else {
        addContactRequest(event, contactNo, name);
      }

      setValidated(false);
    }
  };

  const addContactRequest = (event, contactNo, name) => {
    const requestBody = {
      contactNo,
      name,
    };
    axiosInstance
      .post(`/contact/add/${user.userId}`, requestBody, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        createContact(contactNo, name);
        toast.success("Contact Added");
        event.target.name.value = "";

        //if we have to add only name
        if (addName === true) {
          let updatedMessages = [];
          setSelectedConversation((prevSelected) => {
            updatedMessages = prevSelected.messages.map((item) => {
              if (item.recipient.recipientNo === number) {
                return {
                  ...item,
                  recipient: {
                    ...item.recipient,
                    recipientName: name,
                  },
                };
              }
              return item;
            });
            return {
              ...prevSelected,
              recipient: { ...prevSelected.recipient, recipientName: name },
              messages: updatedMessages,
            };
          });
          updateNameInConversation(number, name, updatedMessages);
        } else {
          event.target.contactNo.value = "";
        }
        handleClose();
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
  };

  return (
    <>
      <Modal
        backdrop="static"
        keyboard={false}
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {addName === false && (
              <Form.Group controlId="contactNo">
                <Label text="Contact No" />
                <Form.Control
                  type="text"
                  placeholder="Enter contact no."
                  required
                  pattern="^[6-9][0-9]{9}"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid contactNo.
                </Form.Control.Feedback>
              </Form.Group>
            )}
            {addName === true && (
              <span className="font-italic">Contact No: {number}</span>
            )}
            <Form.Group controlId="name">
              <Label text="Name" />
              <Form.Control type="text" placeholder="Enter name" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid name
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              variant="success"
              style={{ float: "right", marginLeft: "0.5rem" }}
            >
              ADD
            </Button>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ float: "right" }}
            >
              CANCEL
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddContactModal;
