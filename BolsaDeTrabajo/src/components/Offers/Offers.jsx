import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Container, Row, Col, Alert } from "react-bootstrap";
import { getOffers, addStudentToOffer } from "../../api";
import "./Offers.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../../context/UserContext";

function Offers() {
  const [offersData, setOffersData] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [selectedOfferId, setSelectedOfferId] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await getOffers();
      const data = await response?.json();
      setOffersData(data?.value || []);
    } catch (error) {
      setApiError(error.message)
    }
  };

  const handleAddStudentToOffer = async (offerId) => {
    try {
      const response = await addStudentToOffer(
        user.token,
        user.userId,
        offerId
      );
      if (response === true) {
        setMessage(
          "Te inscribiste correctamente. En la sección 'Ver mis ofertas' podrás ver más detalles."
        );
        setError("");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
      setMessage("");
    }
    setSelectedOfferId(offerId);
  };

  return (
    <Container style={{ marginBlock: "20px" }}>
      {user && user.userType === 'Student' ? (
        offersData.length > 0 ? (
          <h1>¡Estas son las ofertas que tenemos para vos!</h1>
        ) : (
          <h1>Actualmente no hay ofertas en el sistema.</h1>
          )
      ) : offersData.length > 0 ? (
        <h1>Listado de ofertas</h1>
      ) : (
        <h1>No hay ofertas actualmente</h1>)}

      {(user && user.userType === "Student" && offersData.length > 0) ? (
        <h3>¡No esperes más y postulate a una oferta ahora mismo!</h3>
      ) : null}

      {!user && (
        <h3>Para postularte a una oferta tenés que iniciar sesión</h3>
      )}

      {!user && (
        <Row>
          <Col>
            <p>
              ¿Aún no estás registrado? Registrate{" "}
              <Link to="/students-form" className="highlight-link">
                <Button variant="primary" className="buttons">Registrarme</Button>
              </Link>
            </p>
          </Col>
        </Row>
      )}

      {!user && (
        <Row>
          <Col>
            <p>
              ¿Ya tenés cuenta? Ingresá{" "}
              <Link
                to={{ pathname: "/login", state: { from: "Offers" } }}
                className="highlight-link"
              >
                <Button variant="secondary" className="buttons">aquí</Button>
              </Link>
            </p>
          </Col>
        </Row>
      )}

      {offersData.map((offer, index) => (
        <Card
          key={offer.offerId}
          className={index % 2 === 0 ? "even-card" : "odd-card"}
        >
          <Card.Body>
            <Card.Title>{offer.company.companyName}</Card.Title>
            <Card.Title>{offer.offerTitle}</Card.Title>
            {user && (
              <Card.Subtitle className="mb-2 text-muted">
                {offer.offerSpecialty}
              </Card.Subtitle>
            )}
            {user && <Card.Text>{offer.offerDescription}</Card.Text>}
            <Card.Text>
              {format(new Date(offer.createdDate), "dd/MM/yyyy")}
            </Card.Text>
            {user && user.userType === "Student" && (
              <Button
                onClick={() => handleAddStudentToOffer(offer.offerId)}
                variant="primary"
              >
                Inscribirse a la oferta
              </Button>
            )}
          </Card.Body>

          {selectedOfferId === offer.offerId && (
            <Card.Footer>
              {message && (
                <Alert
                  variant="success"
                  dismissible
                  onClose={() => setMessage("")}
                >
                  {message}
                </Alert>
              )}
              {error && (
                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => setError("")}
                >
                  {error}
                </Alert>
              )}
            </Card.Footer>
          )}
        </Card>
      ))}
    </Container>
  );
}

export default Offers;
