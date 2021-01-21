import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import AddContactModal from "../AddContactModal.js/AddContactModal";
import { Button, Form } from "react-bootstrap";
import { useContacts } from "../../context/ContactContext";

const SidebarHeader = () => {
  const [show, setShow] = useState(false);
  const { createContact } = useContacts();

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.formContact.value);
    const id = e.target.formContact.value.trim();
    const name = e.target.formName.value.trim();
    createContact(id, name);
  };

  return (
    <React.Fragment>
      <AddContactModal
        show={show}
        handleClose={handleClose}
        title="ADD CONTACT"
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formContact">
            <Form.Label>Contact No.</Form.Label>
            <Form.Control type="text" placeholder="Enter contact no." />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.Group>
          <Button
            type="submit"
            variant="success"
            onClick={handleClose}
            style={{ float: "right", marginLeft: "0.5rem" }}
          >
            ADD
          </Button>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ float: "right" }}
          >
            Cancel
          </Button>
        </Form>
      </AddContactModal>
      <div className="sidebar-header d-flex flex-row justify-content-between mb-2">
        <div className="user-profile">
          <FontAwesomeIcon
            icon={faUserCircle}
            color="white"
            style={{ fontSize: "2rem" }}
          />
        </div>
        <div className="user-actions d-flex flex-row justify-content-between align-items-center">
          <div className="new-chat-btn mr-2">
            <FontAwesomeIcon
              icon={faPlusCircle}
              color="white"
              style={{ fontSize: "1.5rem", cursor: "pointer" }}
            />
          </div>
          <DropdownMenu handleOpen={handleOpen} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SidebarHeader;
