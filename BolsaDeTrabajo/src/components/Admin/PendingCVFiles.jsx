import React, { useEffect, useState } from "react";
import { fetchCVFiles } from "../../api";

const PendingCVFiles = () => {
  const [cvFiles, setCVFiles] = useState([]);

  useEffect(() => {
    fetchCVFileList();
  }, []);

  const fetchCVFileList = async () => {
    try {
      const files = await fetchCVFiles();
      setCVFiles(files);
    } catch (error) {
    }
  };

  return (
    <div>
      <h2>Listado de archivos PDF</h2>
      {cvFiles.map((cvFile) => (
        <div key={cvFile.cvId}>
          <span>{cvFile.name}</span>
          <a href={`/api/Student/downloadCV/${cvFile.cvId}`} target="_blank" rel="noopener noreferrer">
            Descargar
          </a>
        </div>
      ))}
    </div>
  );
};

export default PendingCVFiles;