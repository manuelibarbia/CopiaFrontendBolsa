import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavStudent = () => {
  return (
    <Navbar
      id="navbar"
      bg="light"
      expand="lg"
      fixed="button"
      className="bg-dark text-light py-3 mt-auto"
    >
      <Nav.Item>
        <Nav.Link as={Link} to="/addressStudent">
          Dirección
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/form2">
          Formulario 2
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/form3">
          Formulario 3
        </Nav.Link>
      </Nav.Item>
    </Navbar>
  );
};

export default NavStudent;
