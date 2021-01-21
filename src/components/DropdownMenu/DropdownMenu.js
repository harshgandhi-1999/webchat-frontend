import React from 'react'
import {DropdownButton,Dropdown} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";

const DropdownMenu = () => {
    return (
        <DropdownButton>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
    )
}

export default DropdownMenu
