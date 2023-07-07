import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { updateStudentOtherInfo } from "../../api";

export default function OtherInfoForm() {
  const [secondaryDegree, setSecondaryDegree] = useState("");

  const [observations, setObservations] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await updateStudentOtherInfo({
        secondaryDegree: secondaryDegree,
        observations: observations,
      });
    } catch (e) {
      setError(e);
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="secondaryDegree">
          <Form.Label>Título Secundario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el título secundario"
            value={secondaryDegree}
            onChange={(e) => setSecondaryDegree(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="observations">
          <Form.Label>Observaciones</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingrese observaciones"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Cargar datos</Button>
      </Form>
    </>
  );
}
