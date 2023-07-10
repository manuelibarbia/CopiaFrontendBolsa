import { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { recoverPassword } from "../../api";
import "./Login.css";

export default function RecoverPassword() {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const handleRecoverPassword = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await recoverPassword({ username: userName });
      setApiSuccess(response);
      setApiError("");
    } catch (error) {
      console.error(error);
      setApiError(error.message);
      setApiSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-card">
      <Form onSubmit={handleRecoverPassword}>
        <Form.Group controlId="email">
          <Form.Label>
            Para recuperar la contraseña te enviaremos un email
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu usuario para recuperar tu contraseña"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>
            {isLoading ? (
            <Spinner></Spinner>
          ) : (
            <p>Recuperar contraseña</p>
          )}
        </Button>

        {apiError && <Alert variant="danger">{apiError}</Alert>}
        {apiSuccess && <Alert variant="success">{apiSuccess}</Alert>}
      </Form>
    </div>
  );
}
