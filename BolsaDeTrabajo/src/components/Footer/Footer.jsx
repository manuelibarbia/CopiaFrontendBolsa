import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="custom-gradient text-light py-3 mt-auto">
      <Container fluid>
        <Row>
          <Col>
            <h4>Contacto</h4>
            <p>
              <FaPhone /> Teléfono: +54 341 20232023
            </p>
            <p>
              <FaEnvelope /> Email: info@frro.utn.edu.ar
            </p>
          </Col>
          <Col className="col-6 text-center">
            <h4>Universidad Tecnológica de Rosario</h4>
            <p>
              <a
                href="https://www.frro.utn.edu.ar/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ingresa a la Web de UTN
              </a>
            </p>
            <h4>GitHub</h4>
            <a
              href="https://github.com/manuelibarbia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={30} /> Manuel Ibarbia
            </a>
            <a
              href="https://github.com/Lucianosolari"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={30} /> Luciano Solari
            </a>
          </Col>
          <Col>
            <h4>Creadores</h4>
            <p>Manuel Ibarbia</p>
            <p>Luciano Solari</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
