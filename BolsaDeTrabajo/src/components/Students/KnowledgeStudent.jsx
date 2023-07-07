import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Table, Alert, Card } from "react-bootstrap";
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
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);
  const [successAlertAdd, setSuccessAlertAdd] = useState(null);
  const [errorAlertAdd, setErrorAlertAdd] = useState(null);

  useEffect(() => {
    fetchKnowledgeList();
    fetchStudentKnowledgeList();
  }, []);

  const fetchKnowledgeList = async () => {
    try {
      const response = await getKnowledge(user.token);
      if (response.ok) {
        const knowledgeData = await response.json();
        setKnowledgeList(knowledgeData);
      }
    } catch (error) {
      setErrorAlert(error.message);
    }
  };

  const fetchStudentKnowledgeList = async () => {
    try {
      const response = await getStudentKnowledge(user.token);
      if (response.ok) {
        const studentKnowledgeData = await response.json();
        setStudentKnowledgeList(studentKnowledgeData);
      }
    } catch (error) {
      setErrorAlert(error.message);
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
      setSuccessAlert("Eliminista el conocimiento de tu lista");
    } catch (error) {
      setErrorAlert(error.message);
    }
  };

  return (
    <div className="container">
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
            <div className="mb-3">
              Agrega los conocimientos que posees, esto te ayudará a conseguir
              mejores propuestas
            </div>
            {knowledgeList.length > 0 && (
              <Table striped bordered hover style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Nivel</th>
                    <th>Acciones</th>
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
                          Agregar conocimiento
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Form>
            <div className="mb-3">
              Estos son tus conocimientos, puedes eliminarlos cuando quieras
            </div>
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

            {studentKnowledgeList.length > 0 ? (
              <Table striped bordered hover style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Nivel</th>
                    <th>Acciones</th>
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
                          Eliminar conocimiento
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div>No tienes conocimientos registrados.</div>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
