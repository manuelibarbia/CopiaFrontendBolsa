import React, { useContext, useEffect, useState } from "react";
import { getStudentsWithPendingCV, downloadStudentCVForAdmin, acceptPendingCV, deletePendingCV } from "../../api";
import { Card, Button, Alert, Spinner } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";

const StudentsWithPendingCV = () => {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [apiError, setApiError] = useState("");
  const [deletedMessage, setDeletedMessage] = useState("");
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

  const handleDownloadPendingCV = async (studentId, name, surname) => {
    try {
      const response = await downloadStudentCVForAdmin(studentId, user.token);
      const blob = await response.blob();

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${name}-${surname}-cv.pdf`;
      downloadLink.click();
    } catch (error) {
      setApiError(error.message);
    }
  };

  const handleAcceptPendingCV = (studentId, name, surname) => {
    acceptPendingCV(studentId, user.token)
      .then(() => {
        setPendingStudents((prevStudents) =>
          prevStudents.filter((student) => student.userId !== studentId)
        );
        setDeletedMessage("");
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
        setSuccessMessage("");
        setDeletedMessage(`El CV del alumno ${name} ${surname} ha sido borrado exitosamente.`);
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
          <h1 style={{textAlign: 'center'}}>Estudiantes con CV pendiente</h1>
          {deletedMessage && <Alert variant="danger">{deletedMessage}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {apiError && <h2 style={{textAlign: 'center'}}>{apiError}</h2>}
          {pendingStudents.map((student, index) => (
            <Card
              key={student.userId}
              className={index % 2 === 0 ? "even-card" : "odd-card"}
            >
            <Card.Body>
              <Card.Title>{student.name} {" "} {student.surname}</Card.Title>
              <Card.Text>DNI: {student.documentNumber}</Card.Text>
              <Card.Text>Legajo: {student.file}</Card.Text>
              <Button
                style={{marginRight: '10px'}}
                onClick={() =>
                  handleDownloadPendingCV(student.userId, student.name, student.surname)
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