import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="mx-3">Techdot</Navbar.Brand>
        <Nav style={{ display: "flex", justifyContent: "flex-end" }}>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
