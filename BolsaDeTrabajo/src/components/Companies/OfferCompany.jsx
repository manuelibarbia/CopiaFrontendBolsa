import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { getCompanyOffers, deleteOffer } from "../../api";
import { format } from "date-fns";
import { Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OfferCompany = () => {
  const { user } = useContext(UserContext);
  const [offers, setOffers] = useState([]);

  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getCompanyOffers(user.userId, user.token)
      .then((data) => {
        setOffers(data);
      })
      .catch((error) => {
        setApiError(error);
      });
  }, []);

  const handleRemoveOffer = (offerId) => {
    deleteOffer(offerId, user.token)
      .then(() => {
        const updatedOffers = offers.filter(
          (offer) => offer.offerId !== offerId
        );
        setOffers(updatedOffers);
        setApiSuccess("Oferta borrada exitosamente");
        setTimeout(() => {
          setApiSuccess("");
        }, 2000);

        setApiError("");
      })
      .catch((error) => {
        console.error(error);
        setApiError(error);
        setApiSuccess("");
      });
  };

  return (
    <div style={{ marginBlock: "20px" }}>
      {offers.length === 0 && <p>La empresa no tiene ofertas disponibles.</p>}

      {offers.map((offer, index) => (
        <Card
          key={offer.offerId}
          className={index % 2 === 0 ? "even-card" : "odd-card"}
        >
          <Card.Body>
            <Card.Title>{offer.offerTitle}</Card.Title>

            <Card.Subtitle className="mb-2 text-muted">
              Con conocimiento excluyente en: {offer.offerSpecialty}
            </Card.Subtitle>

            <Card.Text>{offer.offerDescription}</Card.Text>
            <Card.Text>
              Fecha de publicación{" "}
              {format(new Date(offer.createdDate), "dd/MM/yyyy")}
            </Card.Text>
            <Button onClick={() => navigate(`/studentsInOffer/${offer.offerTitle}/${offer.offerId}`)} style={{marginRight: '10px'}}>
              Ver estudiantes inscriptos
            </Button>

            <Button
              onClick={() => handleRemoveOffer(offer.offerId)}
              variant="danger"
            >
              Eliminar Oferta
            </Button>
          </Card.Body>
        </Card>
      ))}
      {apiError && <Alert variant="danger">{apiError}</Alert>}
      {apiSuccess && <Alert variant="success">{apiSuccess}</Alert>}
    </div>
  );// ENVIAR NOMBRE DE LA OFERTA PARA MOSTRARLO, OPCIONAL
};

export default OfferCompany;