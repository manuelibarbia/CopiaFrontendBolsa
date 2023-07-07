import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { getPendingCompanies, updatePendingCompany } from "../../api";
import { format } from "date-fns";
import { Card, Button, Alert } from "react-bootstrap";

const PendingCompanies = () => {
  const { user } = useContext(UserContext);
  const [pendingCompanies, setPendingCompanies] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getPendingCompanies(user.token)
      .then((response) => response.json())
      .then((data) => {
        setPendingCompanies(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUpdatePendingCompany = (companyId, companyName) => {
    updatePendingCompany(companyId, user.token)
      .then(() => {
        setPendingCompanies((prevCompanies) =>
          prevCompanies.filter((company) => company.userId !== companyId)
        );
        setSuccessMessage(`La empresa ${companyName} ha sido habilitada exitosamente.`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ marginBlock: "20px" }}>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {pendingCompanies.length > 0 ? (
        pendingCompanies.map((company, index) => (
          <Card
            key={company.companyId}
            className={index % 2 === 0 ? "even-card" : "odd-card"}
          >
            <Card.Body>
              <Card.Title> {company.companyName}</Card.Title>
              <Card.Text> Rubro: {company.companyLine}</Card.Text>
              <Card.Text> Ciudad: {company.companyLocation}</Card.Text>
              <Button
                onClick={() =>
                  handleUpdatePendingCompany(company.userId, company.companyName)
                }
                variant="success"
              >
                Habilitar compañía
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Por el momento no hay empresas pendientes de confirmar.</p>
      )}
    </div>
  );
};

export default PendingCompanies;