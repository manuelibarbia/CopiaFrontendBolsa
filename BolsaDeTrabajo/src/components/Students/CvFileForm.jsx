import React, { useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { uploadCV } from "../../api";

const CvFileForm = () => {
  const [cvFile, setCvFile] = useState(null);
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cvFile) {
      setError("Debe cargar un archivo");
      return;
    }

    if (cvFile.type !== "application/pdf") {
      setError("El archivo debe ser de tipo PDF");
      return;
    }

    try {
      const response = await uploadCV(user.token, cvFile);

      setSuccess(response.message.message);
      setError(null);
    } catch (error) {
      setError("Error del servidor.");
      setSuccess(null);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="cvFile">
            <Form.Label>Archivo CV (PDF)</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf"
              onChange={(e) => setCvFile(e.target.files[0])}
            />
            <Button type="submit">Cargar CV</Button>
          </Form.Group>
        </Form>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
      </Card.Body>
    </Card>
  );
};

export default CvFileForm;
