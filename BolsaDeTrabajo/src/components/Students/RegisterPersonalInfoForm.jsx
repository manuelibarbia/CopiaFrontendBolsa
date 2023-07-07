import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Row,
  Col,
  FormCheck,
  FormSelect,
  Alert,
} from "react-bootstrap";
import { differenceInYears } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { createStudent } from "../../api";
import { useNavigate } from "react-router-dom";

import { validateEmail } from "./validateEmail";

export default function PersonalInfoForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [altEmail, setAltEmail] = useState("");
  const [docType, setDocType] = useState("DNI");
  const [docNumber, setDocNumber] = useState("");
  const [cuil, setCuil] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");

  const [frontError, setFrontError] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const validateAltEmail = (altEmail) => {
    const altEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@frro\.utn\.edu\.ar$/;
    if (emailRegex.test(altEmail)) {
      return false;
    }
    return altEmailRegex.test(altEmail);
  };

  const validateDocNumber = (docNumber) => {
    const docNumberRegex = /^\d{8}$/;
    return docNumberRegex.test(docNumber);
  };

  const validateCUIT = (CUIT) => {
    const CUITRegex = /^\d{11}$/;
    return CUITRegex.test(CUIT);
  };

  const validateBirth = (birth) => {
    const currentDate = new Date();
    const age = differenceInYears(currentDate, birth);

    if (age < 18) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    setFrontError("");
    setApiError("");
  }, [
    userName,
    password,
    confirmPassword,
    file,
    lastName,
    firstName,
    email,
    altEmail,
    docType,
    docNumber,
    cuil,
    birthdate,
    gender,
    maritalStatus,
  ]);

  const handleCreateStudent = async (event) => {
    event.preventDefault();
    const formattedBirthdate = birthdate
      ? format(birthdate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
      : null;

    if (
      !userName ||
      !password ||
      !confirmPassword ||
      !file ||
      !lastName ||
      !firstName ||
      !email ||
      !altEmail ||
      !docType ||
      !docNumber ||
      !cuil ||
      !birthdate ||
      !gender ||
      !maritalStatus
    ) {
      setApiSuccess("");
      setFrontError("Todos los campos deben estar completados");
      return;
    }

    const passwordIsValid = validatePassword(password);
    if (!passwordIsValid) {
      setApiSuccess("");
      setFrontError(
        "Contraseña insegura, debe contener al menos una letra mayúscula, una minúscula, un número y un caracter especial. 8 en total"
      );
      return;
    }

    const confirmPasswordIsValid = validateConfirmPassword(
      password,
      confirmPassword
    );
    if (!confirmPasswordIsValid) {
      setApiSuccess("");
      setFrontError("Los campos introducidos de contraseña no coinciden");
      return;
    }

    const emailIsValid = validateEmail(email);
    if (!emailIsValid) {
      setApiSuccess("");
      setFrontError(
        "El Email principal no es válido. Debe ser una dirección de correo que termine en '@frro.utn.edu.ar'."
      );
      return;
    }

    const altEmailIsValid = validateAltEmail(altEmail);
    if (!altEmailIsValid) {
      setApiSuccess("");
      setFrontError(
        "El Email alternativo no es válido. Debe ser una dirección de correo como ejemplo@gmail.com"
      );
      return;
    }

    const isDocNumber = validateDocNumber(docNumber);
    if (!isDocNumber) {
      setApiSuccess("");
      setFrontError("El documento debe ser válido");
      return;
    }

    const isCUIT = validateCUIT(cuil);
    if (!isCUIT) {
      setApiSuccess("");
      setFrontError("El CUIT debe ser un número entero positivo de 11 dígitos");
      return;
    }

    const birthIsValid = validateBirth(birthdate);
    if (!birthIsValid) {
      setApiSuccess("");
      setFrontError(
        "Fecha de nacimiento no válida, debe tener al menos 18 años para registrarse"
      );
      return;
    }

    try {
      const data = await createStudent({
        userName: userName,
        password: password,
        confirmPassword: confirmPassword,
        file: file,
        lastName: lastName,
        firstName: firstName,
        email: email,
        altEmail: altEmail,
        docType: docType,
        docNumber: docNumber,
        cuil: cuil,
        birthdate: formattedBirthdate,
        gender: gender,
        maritalStatus: maritalStatus,
      });
      //navigate("/login"); //VER REDIRECCIÓN AL LOGIN POST REGISTRARSE
      setApiError("");
      setApiSuccess("Usuario creado correctamente");
      console.log(data);
      // Hacer algo con los datos retornados (data) después de crear el estudiante
    } catch (error) {
      setApiSuccess("");
      setApiError(error.message);
    }
  };

  return (
    <Form onSubmit={handleCreateStudent}>
      <Row>
        <Col>
          <FormGroup controlId="userName">
            <FormLabel>Nombre de usuario</FormLabel>
            <FormControl
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ingresa tu nombre de usuario"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup controlId="password">
            <FormLabel>Contraseña</FormLabel>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup controlId="confirmPassword">
            <FormLabel>Confirmar contraseña</FormLabel>
            <FormControl
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ingresa nuevamente tu contraseña"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup controlId="file">
            <FormLabel>Número de Legajo</FormLabel>
            <FormControl
              type="int"
              value={file}
              onChange={(e) => setFile(e.target.value)}
              placeholder="Ingresa tu número de legajo"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup controlId="lastName">
            <FormLabel>Apellido</FormLabel>
            <FormControl
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Ingresa tu apellido"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup controlId="firstName">
            <FormLabel>Nombres</FormLabel>
            <FormControl
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ingresa tus nombres"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup controlId="email">
            <FormLabel>Email principal</FormLabel>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup controlId="altEmail">
            <FormLabel>Email alternativo</FormLabel>
            <FormControl
              type="email"
              value={altEmail}
              onChange={(e) => setAltEmail(e.target.value)}
              placeholder="Ingresa un correo electrónico alternativo"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup controlId="doc">
            <FormLabel>Tipo y número de documento</FormLabel>
            <Row>
              <Col md={4}>
                <Form.Select
                  type="select"
                  placeholder="Tipo de documento"
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                >
                  <option>DNI</option>
                  <option>LE</option>
                </Form.Select>
              </Col>
              <Col md={8}>
                <FormControl
                  type="int"
                  placeholder="Número de documento"
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                />
              </Col>
            </Row>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup controlId="cuil">
            <FormLabel>CUIL o CUIT</FormLabel>
            <FormControl
              type="int"
              value={cuil}
              onChange={(e) => setCuil(e.target.value)}
              placeholder="Ingresa el CUIL o CUIT"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup controlId="birthdate">
            <FormLabel>Fecha de nacimiento</FormLabel>
            <br />
            <DatePicker
              selected={birthdate}
              onChange={(date) => setBirthdate(date)}
              dateFormat="dd/MM/yyyy"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup controlId="gender">
            <FormLabel>Sexo</FormLabel>
            <br />
            <FormCheck
              inline
              label="Masculino"
              type="radio"
              name="gender"
              value="Masculino"
              onChange={(e) => setGender(e.target.value)}
            />
            <FormCheck
              inline
              label="Femenino"
              type="radio"
              name="gender"
              value="Femenino"
              onChange={(e) => setGender(e.target.value)}
            />
            <FormCheck
              inline
              label="Otro"
              type="radio"
              name="gender"
              value="Otro"
              onChange={(e) => setGender(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup controlId="maritalStatus">
            <FormLabel>Estado civil</FormLabel>
            <br />
            <FormCheck
              inline
              label="Soltero/a"
              type="radio"
              name="maritalStatus"
              value="Soltero/a"
              onChange={(e) => setMaritalStatus(e.target.value)}
            />
            <FormCheck
              inline
              label="Casado/a"
              type="radio"
              name="maritalStatus"
              value="Casado/a"
              onChange={(e) => setMaritalStatus(e.target.value)}
            />
            <FormCheck
              inline
              label="Divorciado/a"
              type="radio"
              name="maritalStatus"
              value="Divorciado/a"
              onChange={(e) => setMaritalStatus(e.target.value)}
            />
            <FormCheck
              inline
              label="Viudo/a"
              type="radio"
              name="maritalStatus"
              value="Viudo/a"
              onChange={(e) => setMaritalStatus(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>

      {frontError && <Alert variant="danger">{frontError}</Alert>}
      {apiError && <Alert variant="danger">{apiError}</Alert>}
      {apiSuccess && <Alert variant="success">{apiSuccess}</Alert>}

      <Button variant="primary" type="submit">
        Registrarse
      </Button>
    </Form>
  );
}
