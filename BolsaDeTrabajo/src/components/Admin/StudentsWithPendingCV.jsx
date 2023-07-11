import React, { useContext, useEffect, useState } from "react";
import { getStudentsWithPendingCV, acceptPendingCV, deletePendingCV } from "../../api";
import { Card, Button, Alert, Spinner } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";

const StudentsWithPendingCV = () => {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getStudentsWithPendingCV(user.token)
      .then((response) => response.json())
      .then((data) => {
        setPendingStudents(data);
      })
      .catch((error) => {
        setApiError(error.message);
      })
      .finally(() => {
        setIsLoading(false)
      });
  }, []);

  const handleAcceptPendingCV = (studentId, name, surname) => {
    acceptPendingCV(studentId, user.token)
      .then(() => {
        setPendingStudents((prevStudents) =>
          prevStudents.filter((student) => student.userId !== studentId)
        );
        setSuccessMessage(`El CV del alumno ${name} ${surname} ha sido habilitado exitosamente.`);
      })
      .catch((error) => {
        setApiError(error.message);
      });
  };

  const handleDeletePendingCV = (studentId, name, surname) => {
    deletePendingCV(studentId, user.token)
      .then(() => {
        setPendingStudents((prevStudents) =>
          prevStudents.filter((student) => student.userId !== studentId)
        );
        setSuccessMessage(`El CV del alumno ${name} ${surname} ha sido borrado exitosamente.`);
      })
      .catch((error) => {
        setApiError(error.message);
      });
  };

  return (
    <div>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner className="spinner"></Spinner>
        </div>
      ) : (
        <>
          <h2>Listado de estudiantes con CV pendiente</h2>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {apiError && <Alert variant="danger">{apiError}</Alert>}
          {pendingStudents.map((student, index) => (
            <Card
              key={student.userId}
              className={index % 2 === 0 ? "even-card" : "odd-card"}
            >
            <Card.Body>
              <Card.Text>{student.name} {" "} {student.surname}</Card.Text>
              <Button
                style={{marginRight: '10px'}}
                onClick={() =>
                  downloadPendingCV(student.userId)
                }
              >
                Descargar CV
              </Button>
              <Button
                style={{marginRight: '10px'}}
                onClick={() =>
                  handleAcceptPendingCV(student.userId, student.name, student.surname)
                }
                variant="success"
              >
                Confirmar CV
              </Button>
              <Button
                onClick={() =>
                  handleDeletePendingCV(student.userId, student.name, student.surname)
                }
                variant="danger"
              >
                Borrar CV
              </Button>
            </Card.Body>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default StudentsWithPendingCV;