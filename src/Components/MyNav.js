import React, { useState } from 'react';
import '../css/index.css';
import { ReactSVG } from 'react-svg';
import { BsPlusCircle } from "react-icons/bs";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';


const MyNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" light expand="md">
        <Link to="/"><ReactSVG className="svg" src="codehub.svg" /> </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="nav-style" navbar>
            <NavItem>
              <Link to="/courses">Courses</Link>
            </NavItem>
            <NavItem>
              <Link to="/addcourse"> <BsPlusCircle/> Add Courses</Link>
            </NavItem>
            <NavItem>
              <Link to="/addinstructor">Add Instructors</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>

  );
}

export default MyNav;