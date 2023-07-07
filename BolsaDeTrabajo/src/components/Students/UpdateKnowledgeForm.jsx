import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
//import DeleteIcon from "@material-ui/icons/Delete";

export default function UpdateKnowledgeForm() {
  const [knowledge, setKnowledge] = useState([]);
  const [selectedKnowledge, setSelectedKnowledge] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("bajo");

  const handleKnowledgeChange = (event) => {
    setSelectedKnowledge(event.target.value);
  };

  const handleAddKnowledge = () => {
    if (selectedKnowledge !== "") {
      const newKnowledge = {
        knowledge: selectedKnowledge,
        nivel: selectedLevel,
      };
      setKnowledge([...knowledge, newKnowledge]);
      setSelectedKnowledge("");
      setSelectedLevel("bajo");
    }
  };

  const handleDeleteKnowledge = (index) => {
    const newKnowledges = [...knowledge];
    newKnowledges.splice(index, 1);
    setKnowledge(newKnowledges);
  };

  return (
    <>
      <Form>
        <Form.Group controlId="selectedKnowledge">
          <Form.Label>Conocimientos</Form.Label>
          <Form.Control
            as="select"
            value={selectedKnowledge}
            onChange={handleKnowledgeChange}
          >
            <option value="">Seleccione un conocimiento</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            {/* Agrega más opciones de knowledge aquí */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="selectedLevel">
          <Form.Label>Nivel</Form.Label>
          <Form.Control
            as="select"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="bajo">Bajo</option>
            <option value="medio">Medio</option>
            <option value="alto">Alto</option>
          </Form.Control>
        </Form.Group>

        <Button onClick={handleAddKnowledge}>
          Agregar Conocimiento
        </Button>

        {knowledge.length > 0 && (
          <Table>
            <thead>
              <tr>
                <th>Conocimiento</th>
                <th>Nivel</th>
                <th>Acciones</th> {/* Agrega una columna para las acciones */}
              </tr>
            </thead>
            <tbody>
              {knowledge.map((knowledge, index) => (
                <tr key={index}>
                  <td>{knowledge.knowledge}</td>
                  <td>{knowledge.nivel}</td>
                  <td>
                    {/* Agrega el icono de borrado con su función de manejo de eventos */}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteKnowledge(index)}
                    ></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Form>
    </>
  );
}
