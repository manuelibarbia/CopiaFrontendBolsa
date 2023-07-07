import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h3>Página no encontrada</h3>
      <p>La página que estás buscando no existe.</p>
      <Link to="/" className="back-link">
        Volver a la página principal
      </Link>
    </div>
  );
}

export default NotFound;
