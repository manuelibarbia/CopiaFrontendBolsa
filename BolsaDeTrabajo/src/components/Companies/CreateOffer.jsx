import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useContext } from "react";
import { createOffer } from "../../api";
import { UserContext } from "../../context/UserContext";

const CreateOffer = () => {
  const [title, setTitle] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useContext(UserContext);
  const [success, setSuccess] = useState("");
  const [frontError, setFrontError] = useState("");
  const [apiError, setApiError] = useState("");

  const handleClickCreateOffer = async (e) => {
    e.preventDefault();
    if (!title || !specialty || !description) {
      setFrontError("Por favor, complete todos los campos");
      return;
    }
    try {
      setSuccess("");
      setFrontError("");
      const data = await createOffer({
        token: user.token,
        offerData: {
          title: title,
          specialty: specialty,
          description: description,
          companyId: user.userId,
        },
      });

      if (data) {
        setSuccess("Oferta Creada con éxito");
        setTitle("");
        setSpecialty("");
        setDescription("");
      }
    } catch (error) {
      setApiError(error.message);
    }
  };

  useEffect(() => {
    setApiError("");
    setFrontError("");
  }, [title, specialty, description]);

  return (
    <Form onSubmit={handleClickCreateOffer}>
      <Form.Group controlId="formTitle">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          placeholder="Introduzca el título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formSpecialty">
        <Form.Label>Especialidad</Form.Label>
        <Form.Control
          type="text"
          placeholder="Introduzca la especialidad"
          value={specialty}
          onChange={(event) => setSpecialty(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Introduzca la especialidad"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Crear Oferta
      </Button>

      {frontError && (
        <Alert variant="danger" dismissible onClose={() => setFrontError("")}>
          {frontError}
        </Alert>
      )}

      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      {apiError && (
        <Alert variant="danger" dismissible onClose={() => setApiError("")}>
          {apiError}
        </Alert>
      )}
    </Form>
  );
};

export default CreateOffer;