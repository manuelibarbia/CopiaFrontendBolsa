//NUEVO ARCHIVO

import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { getStudentOfferHistory} from "../../api";
import { format } from "date-fns";
import { Card, Button, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom"
const OfferStudentHistory = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [studentOfferHistory, setStudentOfferHistory] = useState([]);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    getStudentOfferHistory(user.userId, user.token)
      .then((data) => {
        setStudentOfferHistory(data);
      })
      .catch((error) => {
        setApiError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div style={{ marginBlock: "20px" }}>
        {isLoading ? (
          <div className="spinner-container">
            <Spinner animation="border" role="status" className="spinner" />
          </div>
        ) : (
            <>
                <h1 style={{textAlign: 'center'}}>Mi historial de postulaciones</h1>
                {studentOfferHistory.length === 0 ? (
                        <h2>Tu historial de ofertas está vacío. Si querés buscar ofertas, accedé a la pestaña "Últimos empleos" o...
                        <Link to="/Offers" className="highlight-link">
                            <Button>Hacé click acá</Button>
                        </Link>
                        </h2>
                ) : (
                        studentOfferHistory.map((studentOffer, index) => (
                            <Card key={studentOffer.offer.offerId} className={index % 2 === 0 ? "even-card" : "odd-card"}>
                                <Card.Body>
                                <Card.Title>{studentOffer.offer.company.companyName}</Card.Title>
                                <Card.Title>Título: {studentOffer.offer.offerTitle}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Especialidad: {studentOffer.offer.offerSpecialty}
                                </Card.Subtitle>
                                <Card.Text>
                                    Fecha de publicación{" "}
                                    {format(new Date(studentOffer.offer.createdDate), "dd/MM/yyyy")}
                                </Card.Text>
                                <Card.Text>Ciudad: {studentOffer.offer.company.companyLocation}</Card.Text>
                                <Card.Text>
                                    Fecha de postulación{" "}
                                    {format(new Date(studentOffer.applicationDate), "dd/MM/yyyy")}
                                </Card.Text>
                                <Card.Title style={{textDecoration: 'underline'}}>Estado de la oferta</Card.Title>
                                {studentOffer.offer.offerIsActive ? 
                                  (<Card.Text style={{color: 'green'}}>Oferta vigente</Card.Text>) :
                                  (<Card.Text style={{color: 'red'}}>Oferta borrada</Card.Text>)}
                                {studentOffer.studentOfferIsActive && studentOffer.offer.offerIsActive ? 
                                  (<Card.Text style={{color: 'green'}}>Postulado</Card.Text>) : 
                                  (<Card.Text style={{color: 'red'}}>No postulado</Card.Text>
                                )}
                                </Card.Body>
                            </Card>
                        ))
                )}
                    {apiError && <Alert variant="danger" >{apiError}</Alert>}
            </>
        )}
    </div>
  );
};

export default OfferStudentHistory;