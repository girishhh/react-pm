import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { getUser } from "../../utils/helpers/AuthHelper";
import secureDomain from "../hoc/SecureDomain";
import "./Header.scss";

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="light" expand="lg" className="header">
          <Navbar.Brand href="/">Food Delivery</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="singout-collapse">
            <Nav>
              <NavDropdown title={getUser()?.firstName} id="basic-nav-dropdown">
                <NavDropdown.Item href="/signOut">Sign Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default secureDomain(Header);
