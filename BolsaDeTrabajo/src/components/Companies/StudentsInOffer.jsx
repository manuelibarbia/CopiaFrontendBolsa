import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getStudentsInOffer, downloadStudentCvForCompany } from "../../api";
import { Alert, Button, Card, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const StudentsInOffer = () => {
  const { user } = useContext(UserContext);
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { offerTitle, offerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getStudentsInOffer(user.token, offerId)
      .then((data) => {
        setRegisteredStudents(data);
        setApiError("");
      })
      .catch((error) => {
        setApiError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [offerId, user.token]);

  const handleDownloadCV = async (student) => {
    try {
      const response = await downloadStudentCvForCompany(
        student.userId,
        user.token
      );
      const blob = await response.blob();

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${student.name}-cv.pdf`;
      downloadLink.click();
    } catch (error) {
      setApiError(error.message);
    }
  };

  return (
    <div style={{ marginBlock: "20px" }}>
      {isLoading ? (
      <div className="spinner-container">
        <Spinner className="spinner"/>
      </div>) : (
        <>
          <h1>Oferta: {offerTitle}</h1>
      {registeredStudents.map((student, index) => (
        <Card
          key={student.userId}
          className={index % 2 === 0 ? "even-card" : "odd-card"}
        >
          <Card.Body>
            <Card.Title>
              Nombre y apellido: {student.name} {student.surname}
            </Card.Title>
            <Card.Text>
              Email de contacto: {student.altEmail}
            </Card.Text>
            <Button id="Button" variant="info" onClick={() => navigate(`/student-in-offer-knowledge/${student.name}/${student.surname}/${student.userId}`)} style={{marginRight: '10px'}}>
              Ver conocimientos
            </Button>
            <Button variant="info" onClick={() => handleDownloadCV(student)}>
              Descargar CV
            </Button>
          </Card.Body>
        </Card>
      ))}
      {apiError && <Alert variant="danger">{apiError}</Alert>}
        </>
      )}
    </div>
  );
};

export default StudentsInOffer;