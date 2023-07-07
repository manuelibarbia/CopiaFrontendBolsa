import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Table, Alert, Card, Spinner } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { getKnowledge, addKnowledge, deleteKnowledge } from "../../api";

export default function CreateKnowledge() {
  const { user } = useContext(UserContext);
  const [knowledgeList, setKnowledgeList] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [addKnowledgeIsLoading, setAddKnowledgeIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  useEffect(() => {
    fetchKnowledgeList();
  }, []);

  const fetchKnowledgeList = async () => {
    try {
      const response = await getKnowledge(user.token);
      if (response.ok) {
        const knowledgeData = await response.json();
        setKnowledgeList(knowledgeData);
        console.log(knowledgeData);
      }
    } catch (error) {
      setErrorAlert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddKnowledge = async () => {
    if (!selectedType) {
      setErrorAlert("Debe ingresar un conocimiento");
      return;
    }
    if (!/[a-zA-Z]/.test(selectedType)) {
      setErrorAlert(
        "El nombre del conocimiento debe contener al menos una letra"
      );
      return;
    }

    try {
      setAddKnowledgeIsLoading(true);
      const response = await addKnowledge(user.token, selectedType);
      if (response === "Conocimiento creado") {
        await fetchKnowledgeList();
        setSelectedType("");
        setSuccessAlert(response);
        setErrorAlert(null);
      } else {
        throw new Error("Error al crear el conocimiento");
      }
    } catch (error) {
      setSuccessAlert(null);
      setErrorAlert(error.message);
    } finally {
      setAddKnowledgeIsLoading(false);
    }
  };

  const handleDeleteKnowledge = async (knowledgeId) => {
    try {
      await deleteKnowledge(user.token, knowledgeId);
      setKnowledgeList((prevKnowledgeList) =>
        prevKnowledgeList.filter(
          (knowledge) => knowledge.knowledgeId !== knowledgeId
        )
      );
      setSuccessAlert("Conocimiento borrado");
    } catch (error) {
      setErrorAlert(error.message);
    }
  };

  return (
    <>
      <Form>
        <Form.Group controlId="selectedType">
          <Form.Label>Tipo de conocimiento</Form.Label>
          <Form.Control
            type="text"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            isInvalid={!!errorAlert}
          />

          {successAlert && (
            <Alert
              variant="success"
              onClose={() => setSuccessAlert(null)}
              dismissible
            >
              {successAlert}
            </Alert>
          )}
          {errorAlert && (
            <Alert
              variant="danger"
              onClose={() => setErrorAlert(null)}
              dismissible
            >
              {errorAlert}
            </Alert>
          )}
        </Form.Group>

        <Button onClick={handleAddKnowledge}>
          {addKnowledgeIsLoading ? (
            <Spinner></Spinner>
          ) : (
            <p>Agregar</p>
          )}
        </Button>

        <Card style={{marginTop: '10px', marginBottom: '10px'}}>
          <Card.Body>
            {isLoading ? (
              <>
                <p>Cargando listado de conocimientos</p>
                <Spinner animation="border" role="status"/>
              </>
            ) : (
              <>
                {knowledgeList.length > 0 ? (
                <>
                  <div className="mb-3">
                    Listado de conocimientos cargados
                  </div>
                  <Table>
                    <thead>
                      <tr>
                        <th>Tipo</th>
                        <th>Nivel</th>
                        <th>Eliminar conocimiento</th>
                      </tr>
                    </thead>
                    <tbody>
                      {knowledgeList.map((knowledge) => (
                        <tr key={knowledge.knowledgeId}>
                          <td>{knowledge.type}</td>
                          <td>{knowledge.level}</td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() =>
                                handleDeleteKnowledge(knowledge.knowledgeId)
                              }
                            >
                              -
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
            ) : (
                <div className="mb-3">
                  No hay conocimientos cargados
                </div>
            )}
              </>
            )}
          </Card.Body>
        </Card>
      </Form>
    </>
  );
}