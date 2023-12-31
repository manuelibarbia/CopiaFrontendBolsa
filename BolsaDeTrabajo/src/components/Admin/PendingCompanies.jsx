import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { getPendingCompanies, updatePendingCompany, deletePendingCompany } from "../../api";
import { Card, Button, Alert, Spinner } from "react-bootstrap";

const PendingCompanies = () => {
  const { user } = useContext(UserContext);
  const [pendingCompanies, setPendingCompanies] = useState([]);
  const [deletedMessage, setDeletedMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPendingCompanies(user.token)
      .then((response) => response.json())
      .then((data) => {
        setPendingCompanies(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleUpdatePendingCompany = (companyId, companyName) => {
    updatePendingCompany(companyId, user.token)
      .then(() => {
        setPendingCompanies((prevCompanies) =>
          prevCompanies.filter((company) => company.userId !== companyId)
        );
        setDeletedMessage("");
        setSuccessMessage(`La empresa ${companyName} ha sido habilitada exitosamente.`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeletePendingCompany = (companyId, companyName) => {
    deletePendingCompany(companyId, user.token)
      .then(() => {
        setPendingCompanies((prevCompanies) =>
          prevCompanies.filter((company) => company.userId !== companyId)
        );
        setSuccessMessage("");
        setDeletedMessage(`La empresa ${companyName} ha sido borrada exitosamente.`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const filteredCompanies = pendingCompanies.filter((company) => company.userIsActive);

  return (
    <div style={{ marginBlock: "20px" }}>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status" className="spinner" />
        </div>
      ) : (
        <>
          {deletedMessage && <Alert variant="danger">{deletedMessage}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company, index) => (
              <Card
                key={company.companyId}
                className={index % 2 === 0 ? "even-card" : "odd-card"}
              >
                <Card.Body>
                  <Card.Title style={{ fontSize: "30px" }}>{company.companyName}</Card.Title>
                  <Card.Subtitle style={{ fontSize: "20px", textDecoration: "underline" }}>
                    Datos de la empresa
                  </Card.Subtitle>
                  <Card.Text>CUIT: {company.companyCUIT}</Card.Text>
                  <Card.Text> Rubro: {company.companyLine}</Card.Text>
                  <Card.Text> Teléfono: {company.companyPhone} </Card.Text>
                  <Card.Text> Ciudad: {company.companyLocation}</Card.Text>
                  <Card.Text>Dirección: {company.companyAddress}</Card.Text>

                  <Card.Subtitle style={{ fontSize: "20px", textDecoration: "underline" }}>
                    Datos de contacto
                  </Card.Subtitle>
                  <Card.Text>Nombre personal: {company.companyPersonalName}</Card.Text>
                  <Card.Text>Apellido: {company.companyPersonalSurname}</Card.Text>
                  <Card.Text>Cargo: {company.companyPersonalJob}</Card.Text>
                  <Card.Text>Teléfono personal: {company.companyPersonalPhone}</Card.Text>
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={() =>
                      handleUpdatePendingCompany(company.userId, company.companyName)
                    }
                    variant="success"
                  >
                    Habilitar empresa
                  </Button>
                  <Button
                    onClick={() =>
                      handleDeletePendingCompany(company.userId, company.companyName)
                    }
                    variant="danger"
                  >
                    Borrar empresa
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <h2 style={{ textAlign: "center" }}>
              Por el momento, no hay empresas pendientes de confirmar.
            </h2>
          )}
        </>
      )}
    </div>
  );
};

export default PendingCompanies;