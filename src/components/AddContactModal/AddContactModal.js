import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../../context/ContactProvider";
import { useConversations } from "../../context/ConversationProvider";
import { toast } from "react-toastify";
import Label from "../FormLabel/Label";

function Capitalize(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const AddContactModal = ({ show, handleClose, title, addName, number }) => {
  const [validated, setValidated] = useState(false);
  const { contacts, createContact } = useContacts();
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
      const contactNo = event.target.contactNo.value.trim();
      const name = Capitalize(event.target.name.value.trim());
      let alreadyThere = contacts.some((el) => el.contactNo === contactNo);
      if (alreadyThere === true) {
        alert("This contact no. already exist");
      } else {
        handleClose();
        createContact(contactNo, name);
        toast.success("Contact Added");
        setValidated(false);
      }
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      event.stopPropagation();
    } else {
      const name = Capitalize(event.target.name.value.trim());
      createContact(number, name);
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
      handleClose();
      toast.success("Contact Added");
      setValidated(false);
    }
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
          <Form
            noValidate
            validated={validated}
            onSubmit={addName === false ? handleSubmit : handleUpdate}
          >
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
