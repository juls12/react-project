import React, { useState } from 'react';
import '../css/index.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import {Link} from 'react-router-dom';


const MyNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" light expand="md">
      <Link to ="/">Code.Hub Dashboard</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="nav-style" navbar>
            <NavItem>
              <Link to="/courses">Courses</Link>
            </NavItem>
            <NavItem>
              <Link to="/addcourse">Add Courses</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>

  );
}

export default MyNav;