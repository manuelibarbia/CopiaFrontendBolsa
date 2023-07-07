import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { getStudentOffers, deleteStudentToOffer } from "../../api";
import { format } from "date-fns";
import { Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom"
const OfferStudent = () => {
  const { user } = useContext(UserContext);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [offerId, setOfferId] = useState(null);

  useEffect(() => {
    getStudentOffers(user.userId, user.token)
      .then((data) => {
        setOffers(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleRemoveStudentFromOffer = (offerId) => {
    deleteStudentToOffer(user.token, user.userId, offerId)
      .then(() => {
        setSuccess("Fuiste eliminado de la oferta correctamente.");
        setError("");
        setOfferId(offerId);

        setTimeout(() => {
          const updatedOffers = offers.filter(
            (offer) => offer.offerId !== offerId
          );
          setOffers(updatedOffers);
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
      {offers.length === 0 ? (
          <h2>No estás registrado en ninguna oferta. Si querés buscar ofertas, accedé a la pestaña "Últimos empleos" o...
            <Link to="/Offers" className="highlight-link">
              <Button>Hacé click acá</Button>
            </Link>
          </h2>
      ) : (
        offers.map((offer, index) => (
          <Card
            key={offer.offerId}
            className={index % 2 === 0 ? "even-card" : "odd-card"}
          >
            <Card.Body>
              <Card.Title>{offer.company.companyName}</Card.Title>
              <Card.Title>Busca {offer.offerTitle}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Con conocimiento excluyente en: {offer.offerSpecialty}
              </Card.Subtitle>
              <Card.Text>{offer.offerDescription}</Card.Text>
              <Card.Text>
                Fecha de publicación{" "}
                {format(new Date(offer.createdDate), "dd/MM/yyyy")}
              </Card.Text>
              <Card.Text>Rubro: {offer.company.companyLine}</Card.Text>
              <Card.Text>Ciudad: {offer.company.companyLocation}</Card.Text>
              <Button
                onClick={() => handleRemoveStudentFromOffer(offer.offerId)}
                variant="danger"
              >
                Eliminar postulación
              </Button>
            </Card.Body>
            {success && offer.offerId === offerId && (
              <Alert
                variant="success"
                dismissible
                onClose={() => setSuccess("")}
              >
                {success}
              </Alert>
            )}
            {error && offer.offerId === offerId && (
              <Alert variant="danger" dismissible onClose={() => setError("")}>
                {error}
              </Alert>
            )}
          </Card>
        ))
      )}
    </div>
  );
};

export default OfferStudent;