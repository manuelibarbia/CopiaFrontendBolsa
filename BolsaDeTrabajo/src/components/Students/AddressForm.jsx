import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Card,
  Button,
  Container,
  Alert,
} from "react-bootstrap";
import { useContext } from "react";
import { updateStudentAddressInfo } from "../../api";
import { UserContext } from "../../context/UserContext";

const AddressForm = () => {
  const { user } = useContext(UserContext);

  const [familyStreet, setFamilyStreet] = useState("");
  const [familyStreetNumber, setFamilyStreetNumber] = useState("");
  const [familyStreetLetter, setFamilyStreetLetter] = useState("");
  const [familyFloor, setFamilyFloor] = useState("");
  const [familyDepartment, setFamilyDepartment] = useState("");
  const [familyCountry, setFamilyCountry] = useState("");
  const [familyProvince, setFamilyProvince] = useState("");
  const [familyLocation, setFamilyLocation] = useState("");
  const [familyPersonalPhone, setFamilyPersonalPhone] = useState("");
  const [familyOtherPhone, setFamilyOtherPhone] = useState("");

  const [personalStreet, setPersonalStreet] = useState("");
  const [personalStreetNumber, setPersonalStreetNumber] = useState("");
  const [personalStreetLetter, setPersonalStreetLetter] = useState("");
  const [personalFloor, setPersonalFloor] = useState("");
  const [personalDepartment, setPersonalDepartment] = useState("");
  const [personalCountry, setPersonalCountry] = useState("");
  const [personalProvince, setPersonalProvince] = useState("");
  const [personalLocation, setPersonalLocation] = useState("");
  const [personalPersonalPhone, setPersonalPersonalPhone] = useState("");
  const [personalOtherPhone, setPersonalOtherPhone] = useState("");

  const [frontError, setFrontError] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const streetNumberRegex = /^[1-9]\d{0,3}$/;
  const floorRegex = /^\d{1,2}$/;
  const phoneNumberRegex = /^\d{10}$/;

  const validateStreetNumber = (streetNumber) => { return streetNumberRegex.test(streetNumber) }
  const validateFloor = (floor) => { return floorRegex.test(floor); }
  const validatePhoneNumber = (phoneNumber) => { return phoneNumberRegex.test(phoneNumber) }

  useEffect(() => {
    setFrontError("");
    setApiError("");
  }, [familyStreet, familyStreetNumber, familyFloor, familyCountry, familyProvince, familyLocation, familyPersonalPhone, familyOtherPhone, personalStreet, personalStreetNumber, personalFloor, personalCountry, personalProvince, personalLocation, personalPersonalPhone, personalOtherPhone]);

  const handleUpdateStudentAddressInfo = async (event) => {
    event.preventDefault();
    setFrontError("")
    setApiError("");
    setApiSuccess("");
    
    if (
      !familyStreet ||
      !familyStreetNumber ||
      !familyCountry ||
      !familyProvince ||
      !familyLocation ||
      !familyPersonalPhone ||
      !familyOtherPhone ||
      !personalStreet ||
      !personalStreetNumber ||
      !personalCountry ||
      !personalProvince ||
      !personalLocation ||
      !personalPersonalPhone ||
      !personalOtherPhone
    ) {
      setApiSuccess("");
      setFrontError("Por favor, complete los campos obligatorios");
      return;
    }
    
    const familyStreetNumberIsValid = validateStreetNumber(familyStreetNumber);
    const personalStreetNumberIsValid = validateStreetNumber(personalStreetNumber);
    if (!familyStreetNumberIsValid || !personalStreetNumberIsValid) {
      setFrontError("Número de calle debe ser un número entero de entre 1 y 4 dígitos");
      return;
    }

    const familyFloorIsValid = validateFloor(familyFloor)
    const personalFloorIsValid = validateFloor(personalFloor)
    if (!familyFloorIsValid || !personalFloorIsValid) {
      setFrontError("Piso debe ser un número entero de 1 o 2 dígitos o 0 si no existe");
      return;
    }

    const familyPersonalPhoneIsValid = validatePhoneNumber(familyPersonalPhone);
    const familyOtherPhoneIsValid = validatePhoneNumber(familyOtherPhone);
    const personalPersonalPhoneIsValid = validatePhoneNumber(personalPersonalPhone);
    const personalOtherPhoneIsValid = validatePhoneNumber(personalOtherPhone);
    if (!familyPersonalPhoneIsValid || !familyOtherPhoneIsValid || !personalPersonalPhoneIsValid || !personalOtherPhoneIsValid) {
      setFrontError("Los teléfonos deben ser números enteros de 10 dígitos");
      return;
    }

    try {
      const data = await updateStudentAddressInfo({
        token: user.token, 
          addressData: {
          familyStreet: familyStreet,
          familyStreetNumber: familyStreetNumber,
          familyStreetLetter: familyStreetLetter,
          familyFloor: familyFloor,
          familyDepartment: familyDepartment,
          familyCountry: familyCountry,
          familyProvince: familyProvince,
          familyLocation: familyLocation,
          familyPersonalPhone: familyPersonalPhone,
          familyOtherPhone: familyOtherPhone,
          personalStreet: personalStreet,
          personalStreetNumber: personalStreetNumber,
          personalStreetLetter: personalStreetLetter,
          personalFloor: personalFloor,
          personalDepartment: personalDepartment,
          personalCountry: personalCountry,
          personalProvince: personalProvince,
          personalLocation: personalLocation,
          personalPersonalPhone: personalPersonalPhone,
          personalOtherPhone: personalOtherPhone,
      }});
      setApiError("");
      setApiSuccess("Datos registrados correctamente")
    } catch (error) {
      setApiSuccess("");
      setApiError(error.message);
    }
  };

  return (
    <>
    {user && user.userType === 'Student' ? (
      <Form onSubmit={handleUpdateStudentAddressInfo}>
      <Container className="my-4">
      <div className="container">
        <Card>
          <Card.Header>Domicilio familiar</Card.Header>

          <Card.Body>
            <Form.Group as={Row} controlId="familyStreet">
              <Form.Label column sm={2}>
                Calle
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre de la calle"
                  value={familyStreet}
                  onChange={(e) => setFamilyStreet(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="familyStreetNumber">
              <Form.Label column sm={2}>
                Número de calle
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Ingrese el número de la calle"
                  value={familyStreetNumber}
                  onChange={(e) =>
                    setFamilyStreetNumber(e.target.value)
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="familyStreetLetter">
              <Form.Label column sm={2}>
                Letra/Bis
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la letra o bis (opcional)"
                  value={familyStreetLetter}
                  onChange={(e) => setFamilyStreetLetter(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="familyFloor">
              <Form.Label column sm={2}>
                Piso
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Ingrese el número de piso (0 si no existe)"
                  value={familyFloor}
                  onChange={(e) => setFamilyFloor(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="familyDepartment">
              <Form.Label column sm={2}>
                Departamento
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese departamento (opcional)"
                  value={familyDepartment}
                  onChange={(e) => setFamilyDepartment(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="familyCountry">
              <Form.Label column sm={2}>
                País
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="select"
                  value={familyCountry}
                  onChange={(e) => setFamilyCountry(e.target.value)}
                >
                  <option value="">Seleccione un país</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Brasil">Brasil</option>
                  <option value="Chile">Chile</option>
                  {/* Add more country options */}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="familyProvince">
              <Form.Label column sm={2}>
                Provincia
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre de la provincia"
                  value={familyProvince}
                  onChange={(e) => setFamilyProvince(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="familyLocation">
              <Form.Label column sm={2}>
                Ciudad/Localidad
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre de la localidad"
                  value={familyLocation}
                  onChange={(e) => setFamilyLocation(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="familyPersonalPhone">
              <Form.Label column sm={2}>
                Teléfono particular
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Ingrese número de teléfono particular"
                  value={familyPersonalPhone}
                  onChange={(e) =>
                    setFamilyPersonalPhone(e.target.value)
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="familyOtherPhone">
              <Form.Label column sm={2}>
                Otro teléfono
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Ingrese otro número de teléfono"
                  value={familyOtherPhone}
                  onChange={(e) =>
                    setFamilyOtherPhone(e.target.value)
                  }
                />
              </Col>
            </Form.Group>
          </Card.Body>
        </Card>
      </div>

      <br></br>
      <div className="container">
        <Card>
          <Card.Body>
            <Card.Header>Domicilio personal</Card.Header>

            <Form.Group as={Row} controlId="personalStreet">
              <Form.Label column sm={2}>
                Calle
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre de la calle"
                  value={personalStreet}
                  onChange={(e) => setPersonalStreet(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="personalStreetNumber">
              <Form.Label column sm={2}>
                Número de calle
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Ingrese el número de la calle"
                  value={personalStreetNumber}
                  onChange={(e) =>
                    setPersonalStreetNumber(e.target.value)
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="personalStreetLetter">
              <Form.Label column sm={2}>
                Letra/Bis
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la letra o bis (opcional)"
                  value={personalStreetLetter}
                  onChange={(e) => setPersonalStreetLetter(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="personalFloor">
              <Form.Label column sm={2}>
                Piso
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Ingrese el número de piso (0 si no existe)"
                  value={personalFloor}
                  onChange={(e) => setPersonalFloor(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="personalDepartment">
              <Form.Label column sm={2}>
                Departamento
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese departamento (opcional)"
                  value={personalDepartment}
                  onChange={(e) => setPersonalDepartment(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="personalCountry">
              <Form.Label column sm={2}>
                País
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="select"
                  value={personalCountry}
                  onChange={(e) => setPersonalCountry(e.target.value)}
                >
                  <option value="">Seleccione un país</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Brasil">Brazil</option>
                  <option value="Chile">Chile</option>
                  {/* Add more country options */}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="personalProvince">
              <Form.Label column sm={2}>
                Provincia
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre de la provincia"
                  value={personalProvince}
                  onChange={(e) => setPersonalProvince(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="personalLocation">
              <Form.Label column sm={2}>
                Ciudad/Localidad
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre de la localidad"
                  value={personalLocation}
                  onChange={(e) => setPersonalLocation(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="personalPersonalPhone">
              <Form.Label column sm={2}>
                Teléfono particular
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Ingrese su número de teléfono particular"
                  value={personalPersonalPhone}
                  onChange={(e) =>
                    setPersonalPersonalPhone(e.target.value)
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="personalOtherPhone">
              <Form.Label column sm={2}>
                Otro teléfono
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Ingrese otro número de teléfono"
                  value={personalOtherPhone}
                  onChange={(e) =>
                    setPersonalOtherPhone(e.target.value)
                  }
                />
              </Col>
            </Form.Group>
          </Card.Body>
        </Card>
      </div>
      <br></br>
      {frontError && <Alert variant="danger">{frontError}</Alert>}
      {apiError && <Alert variant="danger">{apiError}</Alert>}
      {apiSuccess && <Alert variant="success">{apiSuccess}</Alert>}
      <Button variant="primary" type="submit">
        Cargar Domicilios
      </Button>
    </Container>
    </Form>
    ):
      <h1>Debe iniciar sesión como estudiante</h1>
    }
    </>
  );
}
export default AddressForm;