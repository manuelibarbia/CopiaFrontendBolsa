import React, { useState, useContext } from "react";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  Alert,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api";
import { UserContext } from "../../context/UserContext";
import "./Login.css";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, user } = useContext(UserContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await loginUser({ username: userName, password: password });
      setUser(data);
      setError("");
      navigate("/Offers");
    } catch (error) {
      setError(error.message || "Error del servidor.");
    }

    setIsLoading(false);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  return (
    <div className="login-card">
      <Form onSubmit={handleClickLogin}>
        <Form.Group controlId="tetx">
          <Form.Label>Ingresa tu usuario:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu usuario"
            value={userName}
            onChange={handleUserNameChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Ingresa tu contraseña:</Form.Label>
          <InputGroup>
            <FormControl
              type={showPassword ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <Button variant="outline-secondary" onClick={handleShowPassword}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </Button>
          </InputGroup>
          {error && <Alert variant="danger">{error}</Alert>}
        </Form.Group>

        <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Cargando...</span>
            </Spinner>
          ) : (
            "Iniciar sesión"
          )}
        </Button>

        <Link to="/recover-password">
          <Button variant="outline-dark" style={{ marginTop: "10px" }}>
            ¿Olvidaste tu contraseña?
          </Button>
        </Link>
      </Form>
    </div>
  );
}
