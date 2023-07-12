import React, { useState } from "react";
import {
  Form,
  Button,
  Alert,
  InputGroup,
  FormControl,
  Card,
} from "react-bootstrap";
import { useContext } from "react";
import { changePassword } from "../../api";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [apiError, setApiError] = useState("");
  const [frontError, setFrontError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordNewConfirm, setShowPasswordNewConfirm] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowPasswordNew = () => {
    setShowPasswordNew(!showPasswordNew);
  };
  const handleShowPasswordNewConfirm = () => {
    setShowPasswordNewConfirm(!showPasswordNewConfirm);
  };

  useEffect(() => {
    setSuccess("");
    setApiError("");
    setFrontError("");
  }, [currentPassword, newPassword, confirmNewPassword]);

  const handleClickChangePassword = async (event) => {
    event.preventDefault();
    if (!currentPassword || !newPassword || !confirmNewPassword) {
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
    <Card className="my-4 mx-auto p-4" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Cambiar contraseña</h2>
      <Form onSubmit={handleClickChangePassword}>
        <Form.Group controlId="currentPassword">
          <Form.Label>Contraseña actual</Form.Label>
          <InputGroup>
            <FormControl
              type={showPassword ? "text" : "password"}
              placeholder="Introducir contraseña actual"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
            />
            <Button variant="outline-secondary" onClick={handleShowPassword}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="newPassword">
          <Form.Label>Nueva contraseña</Form.Label>
          <InputGroup>
            <FormControl
              type={showPasswordNew ? "text" : "password"}
              placeholder="Introducir nueva contraseña"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <Button variant="outline-secondary" onClick={handleShowPasswordNew}>
              <FontAwesomeIcon icon={showPasswordNew ? faEyeSlash : faEye} />
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="confirmNewPassword">
          <Form.Label>Confirmar nueva contraseña</Form.Label>
          <InputGroup>
            <FormControl
              type={showPasswordNewConfirm ? "text" : "password"}
              placeholder="Introducir nueva contraseña otra vez"
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
            />
            <Button
              variant="outline-secondary"
              onClick={handleShowPasswordNewConfirm}
            >
              <FontAwesomeIcon
                icon={showPasswordNewConfirm ? faEyeSlash : faEye}
              />
            </Button>
          </InputGroup>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Cambiar contraseña
        </Button>

        {frontError && (
          <Alert variant="danger" className="mt-4">
            {frontError}
          </Alert>
        )}
        {apiError && (
          <Alert variant="danger" className="mt-4">
            {apiError}
          </Alert>
        )}
        {success && (
          <Alert variant="success" className="mt-4">
            {success}
          </Alert>
        )}
      </Form>
    </Card>
  );
};

export default ChangePassword;
