import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useContext } from "react";
import { changePassword } from "../../api";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [apiError, setApiError] = useState("");
  const [frontError, setFrontError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    setSuccess("");
    setApiError("");
    setFrontError("");
  }, [currentPassword, newPassword, confirmNewPassword])
  

  const handleClickChangePassword = async (event) => {
    event.preventDefault();
    if (
      !currentPassword ||
      !newPassword ||
      !confirmNewPassword
    ) {
      setSuccess("");
      setFrontError("Por favor, complete todos los campos.");
      return;
    }

    try {
      const data = await changePassword({
        token: user.token,
        userId: user.userId,
        userData: {
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        },
      });

      if (data) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
      setApiError("");
      setSuccess("Contraseña cambiada exitosamente");
    } catch (error) {
      setSuccess("");
      setApiError(error.message);
    }
  };

  return (
    <Form onSubmit={handleClickChangePassword}>
      <Form.Group controlId="currentPassword">
        <Form.Label>Contraseña actual</Form.Label>
        <Form.Control
          type="password"
          placeholder="Introducir contraseña actual"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="newPassword">
        <Form.Label>Nueva contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Introducir nueva contraseña"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="confirmNewPassword">
        <Form.Label>Confirmar nueva contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Introducir nueva contraseña otra vez"
          value={confirmNewPassword}
          onChange={(event) => setConfirmNewPassword(event.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Cambiar contraseña
      </Button>
      {frontError && <Alert variant="danger">{frontError}</Alert>}
      {apiError && <Alert variant="danger">{apiError}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
    </Form>
  );
};

export default ChangePassword;
