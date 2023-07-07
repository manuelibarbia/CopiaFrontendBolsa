import React, { useState, useContext } from "react";
import { Alert, Button } from "react-bootstrap";
import { downloadCV } from "../../api";
import { UserContext } from "../../context/UserContext";

export default function CvFileDownload() {
  const { user } = useContext(UserContext);

  const [apiSuccess, setApiSuccess] = useState("");
  const [apiError, setApiError] = useState(""); 

  const handleDownloadCV = async () => {
    setApiError("");
    try {
      const response = await downloadCV(user.token);
      const blob = await response.blob();

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "cv.pdf";
      downloadLink.click();
      setApiError("");
      setApiSuccess("CV descargado correctamente");
    } catch (error) {
      setApiSuccess("");
      setApiError(error.message);
    }
  };

  return (
    <div className="text-center mt-4">
      <Button variant="primary" size="lg" onClick={handleDownloadCV}>
        Descargar mi CV
      </Button>
      {apiError && <Alert variant="danger">{apiError}</Alert>}
      {apiError && <p>Para cargar tu CV, seleccioná la opción "Cargar CV" en el menú desplegable.</p>}
      {apiSuccess && <Alert variant="success">{apiSuccess}</Alert>}
    </div>
  );
}
