import React, { useState, useContext } from "react";
import { Form, Button, Col, Row, Card, Alert } from "react-bootstrap";
import { updateStudentUniversityInfo } from "../../api";
import { UserContext } from "../../context/UserContext";

export default function UniversityInfoForm() {
  const [specialty, setSpecialty] = useState("");
  const [approvedSubjectsQuantity, setApprovedSubjectsQuantity] = useState("");
  const [specialtyPlan, setSpecialtyPlan] = useState("");
  const [currentStudyYear, setCurrentStudyYear] = useState("");
  const [studyTurn, setStudyTurn] = useState("");
  const [averageMarksWithPostponement, setAverageMarksWithPostponement] = useState("");
  const [averageMarksWithoutPostponement, setAverageMarksWithoutPostponement] = useState("");
  const [collegeDegree, setCollegeDegree] = useState("");
  const [frontError, setFrontError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useContext(UserContext);

  const approvedSubjectsRegex = /^\d{1,2}$/;
  const textRegex = /^[a-zA-Z\u00C0-\u017F\s]+$/;
  const positiveNumberRegex = /^\d+$/;
  const averageNumberRegex = /^\d+(\.\d+)?$/;


  const validateText = (text) => {return textRegex.test(text);};

  const validateApprovedSubjects = (approvedSubjectsQuantity) => {return approvedSubjectsRegex.test(approvedSubjectsQuantity);};
  
  const validateSpecialtyPlan = (specialtyPlan) => {
    if (!positiveNumberRegex.test(specialtyPlan)) {
      return false;
    }
    const currentYear = new Date().getFullYear();
    return specialtyPlan >= 2000 && specialtyPlan <= currentYear;
  };

  const validateCurrentStudyYear = () => {
    if (!positiveNumberRegex.test(currentStudyYear)) {
      return false;
    }
    return currentStudyYear == 1 || currentStudyYear == 2 || currentStudyYear == 3 || currentStudyYear == 4 || currentStudyYear == 5 || currentStudyYear == 6;
  }
  
  const validateAverageMarks = (averageMarks) => {return averageNumberRegex.test(averageMarks);};
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFrontError("");
    setError("");
    setSuccess("");

    if (
      !specialty ||
      !approvedSubjectsQuantity ||
      !specialtyPlan ||
      !currentStudyYear ||
      !studyTurn ||
      !averageMarksWithPostponement ||
      !averageMarksWithoutPostponement ||
      !collegeDegree
    ) {
      setError("Por favor, complete todos los campos.");
      setSuccess("");
      return;
    }

    if (!validateText(specialty)) {
      setFrontError("Especialidad no válida, debe contener texto sin números");
      return;
    }

    if (!validateApprovedSubjects(approvedSubjectsQuantity)) {
      setFrontError("Cantidad de materias no válida, tiene que ser un número entero positivo de 1 o 2 dígitos, o 0 si no hay");
      return;
    }

    if (!validateSpecialtyPlan(specialtyPlan)) {
      setFrontError("Plan de especialidad no válido, debe ser un año entre 2000 y el actual");
      return;
    }

    if(!validateCurrentStudyYear(currentStudyYear)) {
      setFrontError("Año que cursa no válido, debe ser entre 1 y 6");
      return;
    }

    if (studyTurn != "manana" || studyTurn != "tarde" || studyTurn != "noche") {
      setFrontError("Turno que cursa no válido, debe ser mañana, tarde o noche");
      return;
    }

    if ( !( validateAverageMarks(averageMarksWithPostponement) && (averageMarksWithPostponement >= 1 && averageMarksWithPostponement <= 10) ) ) {
      setFrontError("Promedio con aplazo no válido, debe ser un número entero o decimal entre 1 y 10");
      return;
    }

    if ( !( validateAverageMarks(averageMarksWithoutPostponement) && (averageMarksWithoutPostponement >= 1 && averageMarksWithoutPostponement <= 10) ) ) {
      setFrontError("Promedio sin aplazo no válido, debe ser un número entero o decimal entre 1 y 10");
      return;
    }

    if (!validateText(collegeDegree)) {
      setFrontError("Título universitario no válido, debe contener texto sin números o NO si no tiene"); //VER
      return;
    }

    try {
      const data = await updateStudentUniversityInfo(user.token, {
        specialty,
        approvedSubjectsQuantity,
        specialtyPlan,
        currentStudyYear,
        studyTurn,
        averageMarksWithPostponement,
        averageMarksWithoutPostponement,
        collegeDegree,
      });
      setSuccess(data.message);
      setError("");
    } catch (error) {
      setError("Error al cargar los datos, complete todos los campos");
      setSuccess("");
    }
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="specialty">
            <Form.Label column sm={3}>
              Especialidad
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Ingrese la especialidad"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="approvedSubjectsQuantity">
            <Form.Label column sm={3}>
              Cantidad de materias aprobadas
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                placeholder="Ingrese la cantidad de materias aprobadas"
                value={approvedSubjectsQuantity}
                onChange={(e) => setApprovedSubjectsQuantity(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="specialtyPlan">
            <Form.Label column sm={3}>
              Plan de especialidad
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                placeholder="Ingrese el plan de especialiad"
                value={specialtyPlan}
                onChange={(e) => setSpecialtyPlan(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="currentStudyYear">
            <Form.Label column sm={3}>
              Año que cursa
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as="select"
                value={currentStudyYear}
                onChange={(e) => setCurrentStudyYear(e.target.value)}
              >
                <option value={0}>Seleccione</option>
                <option value={1}>1° Año</option>
                <option value={2}>2° Año</option>
                <option value={3}>3° Año</option>
                <option value={4}>4° Año</option>
                <option value={5}>5° Año</option>
                <option value={6}>6° Año</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="studyTurn">
            <Form.Label column sm={3}>
              Turno que cursa
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as="select"
                value={studyTurn}
                onChange={(e) => setStudyTurn(e.target.value)}
              >
                <option value="">Seleccione</option>
                <option value="manana">Mañana</option>
                <option value="tarde">Tarde</option>
                <option value="noche">Noche</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="averageMarksWithPostponement">
            <Form.Label column sm={3}>
              Promedio con aplazo
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                placeholder="Ingrese el promedio con aplazo"
                value={averageMarksWithPostponement}
                onChange={(e) =>
                  setAverageMarksWithPostponement(e.target.value)
                }
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="averageMarksWithoutPostponement">
            <Form.Label column sm={3}>
              Promedio sin aplazo
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                placeholder="Ingrese el promedio sin aplazo"
                value={averageMarksWithoutPostponement}
                onChange={(e) =>
                  setAverageMarksWithoutPostponement(e.target.value)
                }
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="collegeDegree">
            <Form.Label column sm={3}>
              Título universitario
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Ingrese el título universitario"
                value={collegeDegree}
                onChange={(e) => setCollegeDegree(e.target.value)}
              />
            </Col>
          </Form.Group>

          <div className="text-center">
            <Button type="submit">Enviar</Button>
          </div>
        </Form>
        {error && <Alert variant="danger">{error}</Alert>}
        {frontError && <Alert variant="danger">{frontError}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
      </Card.Body>
    </Card>
  );
}