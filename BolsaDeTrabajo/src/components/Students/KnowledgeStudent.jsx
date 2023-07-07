import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Table, Alert, Card, Spinner } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import {
  getKnowledge,
  addKnowledgeToStudent,
  deleteKnowledgeFromStudent,
  getStudentKnowledge,
} from "../../api";

export default function KnowledgeStudent() {
  const { user } = useContext(UserContext);
  const [knowledgeList, setKnowledgeList] = useState([]);
  const [studentKnowledgeList, setStudentKnowledgeList] = useState([]);
  const [knowledgeListIsLoading, setKnowledgeListIsLoading] = useState(false);
  const [studentKnowledgeListIsLoading, setStudentKnowledgeListIsLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);
  const [successAlertAdd, setSuccessAlertAdd] = useState(null);
  const [errorAlertAdd, setErrorAlertAdd] = useState(null);

  useEffect(() => {
    fetchKnowledgeList();
    fetchStudentKnowledgeList();
  }, []);

  const fetchKnowledgeList = async () => {
    setKnowledgeListIsLoading(true);
    try {
      const response = await getKnowledge(user.token);
      if (response.ok) {
        const knowledgeData = await response.json();
        setKnowledgeList(knowledgeData);
      }
    } catch (error) {
      setErrorAlert(error.message);
    } finally {
      setKnowledgeListIsLoading(false);
    }
  };

  const fetchStudentKnowledgeList = async () => {
    setStudentKnowledgeListIsLoading(true);
    try {
      const response = await getStudentKnowledge(user.token);
      if (response.ok) {
        const studentKnowledgeData = await response.json();
        setStudentKnowledgeList(studentKnowledgeData);
      }
    } catch (error) {
      setErrorAlert(error.message);
    } finally {
      setStudentKnowledgeListIsLoading(false);
    }
  };

  const handleAddKnowledgeToStudent = async (knowledgeId) => {
    try {
      const response = await addKnowledgeToStudent(user.token, knowledgeId);
      setSuccessAlertAdd("Conocimiento añadido");
      setErrorAlertAdd(null);
      const addedKnowledge = knowledgeList.find(
        (knowledge) => knowledge.knowledgeId === knowledgeId
      );
      setStudentKnowledgeList((prevList) => [...prevList, addedKnowledge]);
    } catch (error) {
      setSuccessAlertAdd(null);
      setErrorAlertAdd(error.message);
    }
  };

  const handleDeleteKnowledgeFromStudent = async (knowledgeId) => {
    try {
      await deleteKnowledgeFromStudent(knowledgeId, user.token);
      setStudentKnowledgeList((prevList) =>
        prevList.filter((knowledge) => knowledge.knowledgeId !== knowledgeId)
      );
      setSuccessAlert("Eliminaste el conocimiento de tu lista");
    } catch (error) {
      setErrorAlert(error.message);
    }
  };

  return (
    <div className="container">
      <h1 style={{textAlign: 'center'}}>Mis conocimientos</h1>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group controlId="selectedType">
              {successAlertAdd && (
                <Alert
                  variant="success"
                  onClose={() => setSuccessAlertAdd(null)}
                  dismissible
                >
                  {successAlertAdd}
                </Alert>
              )}
              {errorAlertAdd && (
                <Alert
                  variant="danger"
                  onClose={() => setErrorAlertAdd(null)}
                  dismissible
                >
                  {errorAlertAdd}
                </Alert>
              )}
            </Form.Group>
            {knowledgeListIsLoading ? (
              <>
                <p>Cargando listado de conocimientos</p>
                <Spinner animation="border" role="status"/>
              </>
            ) : (
              <>
                  <h3>Conocimientos disponibles</h3>
                  {knowledgeList.length > 0 ? (
                  <>
                    <div className="mb-3">
                      Agregá los conocimientos que poseas, esto te ayudará a conseguir
                      mejores propuestas laborales
                    </div>
                      <Table striped bordered hover style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <th>Tipo</th>
                            <th>Nivel</th>
                            <th>Agregar conocimiento</th>
                          </tr>
                        </thead>
                        <tbody>
                          {knowledgeList.map((knowledge) => (
                            <tr key={knowledge.knowledgeId}>
                              <td style={{ width: "33%" }}>{knowledge.type}</td>
                              <td style={{ width: "33%" }}>{knowledge.level}</td>
                              <td style={{ width: "34%" }}>
                                <Button
                                  variant="success"
                                  onClick={() =>
                                    handleAddKnowledgeToStudent(knowledge.knowledgeId)
                                  }
                                >
                                  +
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                  </>
                ) : (
                  <div className="mb-3">No hay conocimientos para agregar</div>
                )}
              </>
            )}
            
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Form>
            <Form.Group controlId="selectedType">
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
            {studentKnowledgeListIsLoading ? (
              <>
                <p>Cargando conocimientos propios</p>
                <Spinner animation="border" role="status"/>
              </>) 
              : (
              <>
                <h3>Conocimientos personales</h3>
                {studentKnowledgeList.length > 0 ? (
                  <>
                    <div className="mb-3">
                      Estos son tus conocimientos, podés eliminarlos cuando quieras
                    </div>
                    <Table striped bordered hover style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>Tipo</th>
                          <th>Nivel</th>
                          <th>Eliminar conocimiento</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentKnowledgeList.map((knowledge) => (
                          <tr key={knowledge.knowledgeId}>
                            <td style={{ width: "33%" }}>{knowledge.type}</td>
                            <td style={{ width: "33%" }}>{knowledge.level}</td>
                            <td style={{ width: "34%" }}>
                              <Button
                                variant="danger"
                                onClick={() =>
                                  handleDeleteKnowledgeFromStudent(
                                    knowledge.knowledgeId
                                  )
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
                    <div>No tenés conocimientos registrados.</div>
                )}
              </>)}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}