import React, { useState, useContext } from "react";
import { Form, Button, Col, Row, Card, Alert } from "react-bootstrap";
import { updateStudentUniversityInfo } from "../../api";
import { UserContext } from "../../context/UserContext";

export default function UniversityInfoForm() {
  const [specialty, setSpecialty] = useState("");
  const [approvedSubjectsQuantity, setApprovedSubjectsQuantity] = useState(0);
  const [specialtyPlan, setSpecialtyPlan] = useState("");
  const [currentStudyYear, setCurrentStudyYear] = useState("");
  const [studyTurn, setStudyTurn] = useState("");
  const [averageMarksWithPostponement, setAverageMarksWithPostponement] =
    useState("");
  const [averageMarksWithoutPostponement, setAverageMarksWithoutPostponement] =
    useState("");
  const [collegeDegree, setCollegeDegree] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
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
              Cantidad de Materias aprobadas
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
              Plan de Especialidad
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Ingrese el plan de specialty"
                value={specialtyPlan}
                onChange={(e) => setSpecialtyPlan(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="currentStudyYear">
            <Form.Label column sm={3}>
              Año que Cursa
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
              Turno que Cursa
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
              Promedio con Aplazo
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
              Promedio sin Aplazo
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
              Título Universitario
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
        {success && <Alert variant="success">{success}</Alert>}
      </Card.Body>
    </Card>
  );
}
