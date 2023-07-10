import React, { useContext, useEffect, useState } from "react";
import { getStudentsWithPendingCV } from "../../api";
import { Card, Button, Alert, Spinner } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";

const StudentsWithPendingCV = () => {
  const [students, setStudents] = useState([]);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getStudentsWithPendingCV(user.token)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        setApiError(error.message);
      })
      .finally(() => {
        setIsLoading(false)
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner className="spinner"></Spinner>
        </div>
      ) : (
        <>
          <h2>Listado de estudiantes con CV pendiente</h2>
          {apiError && <Alert variant="danger">{apiError}</Alert>}
          {students.map((student, index) => (
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
                onClick={() =>
                  handleUpdatePendingCVFile(student.userId)
                }
                variant="success"
              >
                Confirmar CV
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