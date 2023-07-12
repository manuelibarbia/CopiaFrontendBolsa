import { useEffect, useState } from "react";
import {
  Form,
  Button,
  Alert,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { createCompany } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const CompanyInfoForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyCUIT, setCompanyCUIT] = useState("");
  const [companyLine, setCompanyLine] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyPostalCode, setCompanyPostalCode] = useState("");
  const [companyPhone, setCompanyPhone] = useState(0);
  const [companyWebPage, setCompanyWebPage] = useState("");

  const [companyPersonalName, setCompanyPersonalName] = useState("");
  const [companyPersonalSurname, setCompanyPersonalSurname] = useState("");
  const [companyPersonalJob, setCompanyPersonalJob] = useState("");
  const [companyPersonalPhone, setCompanyPersonalPhone] = useState(0);
  const [companyPersonalEmail, setCompanyPersonalEmail] = useState("");
  const [companyRelationContact, setCompanyRelationContact] = useState("");
  const [frontError, setFrontError] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const validateNameOrSurname = (nameOrSurname) => {
    const nameOrSurnameRegex = /^[a-zA-Z\u00C0-\u017F\s]+$/;
    return nameOrSurnameRegex.test(nameOrSurname);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const validateCUIT = (CUIT) => {
    const CUITRegex = /^\d{11}$/;
    return CUITRegex.test(CUIT);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const validateBothPhones = (companyPhoneNumber, personalPhoneNumber) => {
    return companyPhoneNumber !== personalPhoneNumber;
  };

  const validateEmail = (companyPersonalEmail) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const instEmailRegex = /^[A-Za-z0-9._%+-]+@frro\.utn\.edu\.ar$/;
    if (instEmailRegex.test(companyPersonalEmail)) {
      return false;
    }
    return emailRegex.test(companyPersonalEmail);
  };

  useEffect(() => {
    setFrontError("");
    setApiError("");
  }, [
    userName,
    password,
    confirmPassword,
    companyCUIT,
    companyLine,
    companyName,
    companyAddress,
    companyLocation,
    companyPostalCode,
    companyPhone,
    companyWebPage,
    companyPersonalName,
    companyPersonalSurname,
    companyPersonalJob,
    companyPersonalPhone,
    companyPersonalEmail,
    companyRelationContact,
  ]);

  const handleCreateCompany = async (event) => {
    event.preventDefault();
    setApiError("");
    setFrontError("");
    setApiError("");

    if (
      !userName ||
      !password ||
      !confirmPassword ||
      !companyCUIT ||
      !companyLine ||
      !companyName ||
      !companyAddress ||
      !companyLocation ||
      !companyPostalCode ||
      !companyPhone ||
      !companyWebPage ||
      !companyPersonalName ||
      !companyPersonalSurname ||
      !companyPersonalJob ||
      !companyPersonalPhone ||
      !companyPersonalEmail ||
      !companyRelationContact
    ) {
      setFrontError("Todos los campos deben estar completos");
      return;
    }

    const passwordIsValid = validatePassword(password);
    if (!passwordIsValid) {
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
      setFrontError("Los campos introducidos de contraseña no coinciden");
      return;
    }

    const isCUIT = validateCUIT(companyCUIT);
    if (!isCUIT) {
      setFrontError("El CUIT debe ser un número entero positivo de 11 dígitos");
      return;
    }

    const isPhoneNumber = validatePhoneNumber(companyPhone);
    if (!isPhoneNumber) {
      setFrontError(
        "Teléfono de la empresa no válido, debe contener 10 dígitos"
      );
      return;
    }

    const isPersonalPhoneNumber = validatePhoneNumber(companyPersonalPhone);
    if (!isPersonalPhoneNumber) {
      setFrontError("Teléfono personal no válido, debe contener 10 dígitos");
      return;
    }

    const phoneNumbersAreDifferent = validateBothPhones(
      companyPhone,
      companyPersonalPhone
    );
    if (!phoneNumbersAreDifferent) {
      setFrontError("Los números de teléfono deben ser diferentes");
      return;
    }

    const nameIsValid = validateNameOrSurname(companyPersonalName);
    const surnameIsValid = validateNameOrSurname(companyPersonalSurname);
    if (!nameIsValid || !surnameIsValid) {
      setFrontError("Nombre y/o apellido no válido");
      return;
    }

    const emailIsValid = validateEmail(companyPersonalEmail);
    if (!emailIsValid) {
      setFrontError(
        "El Email introducido no es válido. Debe ser una dirección de correo como ejemplo@gmail.com"
      );
      return;
    }

    const contactIsValid = validateNameOrSurname(companyRelationContact);
    if (!contactIsValid) {
      setFrontError("Persona de contacto no válida");
      return;
    }

    try {
      const data = await createCompany({
        userName: userName,
        password: password,
        confirmPassword: confirmPassword,
        CUIT: companyCUIT,
        line: companyLine,
        name: companyName,
        address: companyAddress,
        location: companyLocation,
        postalCode: companyPostalCode,
        phone: companyPhone,
        webPage: companyWebPage,
        personalName: companyPersonalName,
        personalSurname: companyPersonalSurname,
        personalJob: companyPersonalJob,
        personalPhone: companyPersonalPhone,
        email: companyPersonalEmail,
        relationContact: companyRelationContact,
        pendingConfirmation: true,
      });
      setApiError("");
      setApiSuccess(
        "Usuario de empresa creado, esperar validación del administrador (entre 24 y 48hs)"
      );
    } catch (error) {
      setApiError(error.message);
      setApiSuccess("");
    }
  };

  return (
    <Form onSubmit={handleCreateCompany}>
      <Row>
        <Col>
          <Form.Group controlId="company-user-name">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ingresa el nombre de usuario"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="company-password">
            <Form.Label>Contraseña</Form.Label>
            <InputGroup>
              <FormControl
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
              />
              <Button variant="outline-secondary" onClick={handleShowPassword}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </Button>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="company-confirm-password">
            <Form.Label>Confirmar contraseña</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPasswordConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ingresa nuevamente la contraseña"
              />
              <Button
                variant="outline-secondary"
                onClick={handleShowPasswordConfirm}
              >
                <FontAwesomeIcon
                  icon={showPasswordConfirm ? faEyeSlash : faEye}
                />
              </Button>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="company-CUIT">
            <Form.Label>CUIT</Form.Label>
            <Form.Control
              type="text"
              value={companyCUIT}
              onChange={(e) => setCompanyCUIT(e.target.value)}
              placeholder="Ingresa el CUIT de la empresa"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="company-line">
            <Form.Label>Rubro</Form.Label>
            <Form.Control
              type="text"
              value={companyLine}
              onChange={(e) => setCompanyLine(e.target.value)}
              placeholder="Ingresa el rubro de la empresa"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="company-name">
            <Form.Label>Razón social</Form.Label>
            <Form.Control
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ingresa la razón social de la empresa"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="company-adress">
            <Form.Label>Domicilio</Form.Label>
            <Form.Control
              type="text"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              placeholder="Ingresa el domicilio de la empresa"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="company-location">
            <Form.Label>Localidad</Form.Label>
            <Form.Control
              as="select"
              value={companyLocation}
              onChange={(e) => setCompanyLocation(e.target.value)}
            >
              <option value="" disabled>
                Seleccione una localidad
              </option>
              <option value="Rosario">Rosario</option>
              <option value="Santa Fe">Santa Fe</option>
              <option value="Buenos Aires">Buenos Aires</option>
              <option value="Cordoba">Córdoba</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="company-postal-code">
            <Form.Label>Código postal</Form.Label>
            <Form.Control
              type="text"
              value={companyPostalCode}
              onChange={(e) => setCompanyPostalCode(e.target.value)}
              placeholder="Introduce el código postal"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="company-phone">
            <Form.Label>Teléfono de la empresa</Form.Label>
            <Form.Control
              type="number"
              value={companyPhone}
              onChange={(e) => setCompanyPhone(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="company-web-page">
            <Form.Label>Web</Form.Label>
            <Form.Control
              type="text"
              value={companyWebPage}
              onChange={(e) => setCompanyWebPage(e.target.value)}
              placeholder="Ingresa la dirección web de la empresa"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="company-personal-name">
            <Form.Label>Nombre personal</Form.Label>
            <Form.Control
              type="text"
              value={companyPersonalName}
              onChange={(e) => setCompanyPersonalName(e.target.value)}
              placeholder="Ingresa tu nombre personal"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="company-personal-surname">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              value={companyPersonalSurname}
              onChange={(e) => setCompanyPersonalSurname(e.target.value)}
              placeholder="Ingresa tu apellido"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="company-personal-job">
            <Form.Label>Puesto / Cargo</Form.Label>
            <Form.Control
              type="text"
              value={companyPersonalJob}
              onChange={(e) => setCompanyPersonalJob(e.target.value)}
              placeholder="Ingresa tu puesto en la empresa"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="company-personal-phone">
            <Form.Label>Teléfono personal</Form.Label>
            <Form.Control
              type="number"
              value={companyPersonalPhone}
              onChange={(e) => setCompanyPersonalPhone(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="company-personal-email">
            <Form.Label>Email personal</Form.Label>
            <Form.Control
              type="email"
              value={companyPersonalEmail}
              onChange={(e) => setCompanyPersonalEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="company-relation-contact">
            <Form.Label>Persona de contacto</Form.Label>
            <Form.Control
              type="text"
              value={companyRelationContact}
              onChange={(e) => setCompanyRelationContact(e.target.value)}
              placeholder="Ingresa el nombre de tu persona de contacto"
            />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        Crear empresa
      </Button>

      {frontError && <Alert variant="danger">{frontError}</Alert>}
      {apiError && <Alert variant="danger">{apiError}</Alert>}
      {apiSuccess && <Alert variant="success">{apiSuccess}</Alert>}
    </Form>
  );
};

export default CompanyInfoForm;
