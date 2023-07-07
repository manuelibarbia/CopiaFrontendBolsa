import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { getStudentOffers, deleteStudentFromOffer } from "../../api";
import { format } from "date-fns";
import { Card, Button, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom"
const OfferStudent = () => {
  const { user } = useContext(UserContext);
  const [studentOffers, setStudentOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [offerId, setOfferId] = useState(null);

  useEffect(() => {
    getStudentOffers(user.userId, user.token)
      .then((data) => {
        setStudentOffers(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      })
      ;
  }, []);

  const handleRemoveStudentFromOffer = (offerId) => {
    deleteStudentFromOffer(user.token, user.userId, offerId)
      .then(() => {
        setSuccess("Fuiste eliminado de la oferta correctamente.");
        setError("");
        setOfferId(offerId);

        setTimeout(() => {
          const updatedOffers = studentOffers.filter(
            (offer) => offer.offerId !== offerId
          );
          setStudentOffers(updatedOffers);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        setError("Error al eliminar la postulación.");
        setSuccess("");
        setOfferId(offerId);
      });
  };

  return (
    <div style={{ marginBlock: "20px" }}>
      <Button to="/student-offer-history">
        Historial
      </Button>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status" className="spinner" />
        </div>
      ) : (
        <>
          {studentOffers.length === 0 ? (
          <h2>No estás registrado en ninguna oferta. Si querés buscar ofertas, accedé a la pestaña "Últimos empleos" o...
            <Link to="/Offers" className="highlight-link">
              <Button>Hacé click acá</Button>
            </Link>
          </h2>
          ) : (
            studentOffers.map((studentOffer, index) => (
              <Card
                key={studentOffer.offer.offerId}
                className={index % 2 === 0 ? "even-card" : "odd-card"}
              >
                <Card.Body>
                  <Card.Title>{studentOffer.offer.company.companyName}</Card.Title>
                  <Card.Title>Busca {studentOffer.offer.offerTitle}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Con conocimiento excluyente en: {studentOffer.offer.offerSpecialty}
                  </Card.Subtitle>
                  <Card.Text>{studentOffer.offer.offerDescription}</Card.Text>
                  <Card.Text>
                    Fecha de publicación:{" "}
                    {format(new Date(studentOffer.offer.createdDate), "dd/MM/yyyy")}
                  </Card.Text>
                  <Card.Text>Rubro: {studentOffer.offer.company.companyLine}</Card.Text>
                  <Card.Text>Ciudad: {studentOffer.offer.company.companyLocation}</Card.Text>
                  <Card.Text>
                    Fecha de postulación:{" "}
                    {format(new Date(studentOffer.applicationDate), "dd/MM/yyyy")}
                  </Card.Text>
                  <Button
                    onClick={() => handleRemoveStudentFromOffer(studentOffer.offer.offerId)}
                    variant="danger"
                  >
                    Eliminar postulación
                  </Button>
                </Card.Body>
                {success && studentOffer.offer.offerId === offerId && (
                  <Alert
                    variant="success"
                    dismissible
                    onClose={() => setSuccess("")}
                  >
                    {success}
                  </Alert>
                )}
                {error && studentOffer.offer.offerId === offerId && (
                  <Alert variant="danger" dismissible onClose={() => setError("")}>
                    {error}
                  </Alert>
                )}
              </Card>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default OfferStudent;