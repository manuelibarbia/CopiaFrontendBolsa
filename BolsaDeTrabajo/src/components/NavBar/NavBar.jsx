import React, { useContext } from "react";
import { Navbar, Nav, Button, Row, Col } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import "./NavBar.css";
import { FaUser } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import StudentMenu from "./StudentMenu";
import CompanyMenu from "./CompanyMenu";
import AdminMenu from "./AdminMenu";

const NavBar = () => {
  const { user } = useContext(UserContext);

  let content;
  if (!user) {
    content = (
      <Button as={Link} to="/login" variant="primary" size="lg">
        <FaUser size={20} />
      </Button>
    );
  } else {
    if (user.userType === "Student") {
      content = <StudentMenu />;
    } else if (user.userType === "Company") {
      content = <CompanyMenu />;
    } else if (user.userType === "Admin") {
      content = <AdminMenu />;
    }
  }

  return (
    <>
      <Navbar id="navbar" expand="lg" fixed="top" className="custom-gradient">
        <Row className="w-100">
          <Col xs={3}>
            <Link to="/">
              <img src="/logo.png" alt="Logo de la Empresa" />
            </Link>
          </Col>
          <Col
            xs={6}
            className="d-flex align-items-center justify-content-center"
          >
            <Nav className="mr-auto">
              {!user && (
                <Link to="/sign-in-option" className="nav-link">
                  Unite a la bolsa
                </Link>
              )}
              <Link to="/Offers" className="nav-link">
                Ultimos empleos
              </Link>
            </Nav>
          </Col>
          <Col xs={3} className="text-right">
            {content}
          </Col>
        </Row>
      </Navbar>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default NavBar;