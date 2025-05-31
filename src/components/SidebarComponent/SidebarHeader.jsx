import React, { useState } from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import AddContactModal from "../AddContactModal/AddContactModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Button, Tooltip, OverlayTrigger, Dropdown } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider";

const SidebarHeader = ({ openDrawer }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const { logout } = useAuth();

  const handleClose = () => setShowContactModal(false);
  const handleOpen = () => setShowContactModal(true);

  return (
    <React.Fragment>
      <AddContactModal
        show={showContactModal}
        handleClose={handleClose}
        title="ADD CONTACT"
        addName={false}
      />

      <div className="sidebar-header d-flex flex-row justify-content-between mb-2">
        <div className="user-profile-btn">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="profile-tooltip">Profile</Tooltip>}
          >
            <Button
              variant="none"
              style={{ padding: "0" }}
              onClick={() => openDrawer("USER_PROFILE")}
            >
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
                onClick={() => openDrawer("ALL_CONTACTS")}
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
          <DropdownMenu color="white" size="1.5rem" tooltipText="Menu">
            <Dropdown.Item onClick={handleOpen}>Add New Contact</Dropdown.Item>
            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          </DropdownMenu>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SidebarHeader;
