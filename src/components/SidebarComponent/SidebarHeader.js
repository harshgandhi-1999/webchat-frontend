import React, { useState } from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import AddContactModal from "../AddContactModal.js/AddContactModal";
import Label from "../FormLabel/Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useContacts } from "../../context/ContactProvider";

const SidebarHeader = ({ openDrawer }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const { contacts, createContact } = useContacts();
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShowContactModal(false);
  const handleOpen = () => setShowContactModal(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      event.stopPropagation();
    } else {
      const contactNo = event.target.contactNo.value.trim();
      const name = event.target.name.value.trim();
      let alreadyThere = contacts.some((el) => el.contactNo === contactNo);
      if (alreadyThere === true) {
        alert("This contact no. already exist");
      } else {
        handleClose();
        createContact(contactNo, name);
        setValidated(false);
      }
    }
  };

  return (
    <React.Fragment>
      <AddContactModal
        show={showContactModal}
        handleClose={handleClose}
        title="ADD CONTACT"
      >
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
            Cancel
          </Button>
        </Form>
      </AddContactModal>
      <div className="sidebar-header d-flex flex-row justify-content-between mb-2">
        <div className="user-profile-btn">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="profile-tooltip">Profile</Tooltip>}
          >
            <Button variant="none" style={{ padding: "0" }}>
              <FontAwesomeIcon
                icon={faUserCircle}
                color="white"
                style={{ fontSize: "2rem" }}
              />
            </Button>
          </OverlayTrigger>
        </div>
        <div className="user-actions d-flex flex-row justify-content-between align-items-center">
          <div className="new-chat-btn mr-3">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="new-chat-tooltip">New Chat</Tooltip>}
            >
              <Button
                variant="none"
                onClick={openDrawer}
                style={{ padding: "0" }}
              >
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  color="white"
                  style={{ fontSize: "1.5rem", cursor: "pointer" }}
                />
              </Button>
            </OverlayTrigger>
          </div>
          <DropdownMenu handleOpen={handleOpen} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SidebarHeader;
