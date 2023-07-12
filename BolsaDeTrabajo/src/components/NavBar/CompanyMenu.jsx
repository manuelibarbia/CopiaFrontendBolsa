import { useContext, useState } from "react";
import { Dropdown, Modal, Button } from "react-bootstrap";
import {
  FaCog,
  FaUser,
  FaClipboard,
  FaBars,
  FaSignOutAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { logout } from "../../api";
import { deleteCompany } from "../../api";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const CompanyMenu = () => {
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const logoutUserClick = async () => {
    try {
      console.log(user.userId);
      const data = await logout(user.token);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const removeUserClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const data = await deleteCompany(user.token, user.userId);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
          <FaBars className="mr-2" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/company-offers"
            style={{ margin: "0px" }}
          >
            <FaUser className="mr-2" /> Mis ofertas
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/createOffer" style={{ margin: "0px" }}>
            <FaClipboard className="mr-2" /> Cargar ofertas
          </Dropdown.Item>

          <Dropdown.Item
            as={Link}
            to="/change-password"
            style={{ margin: "0px" }}
          >
            <FaCog className="mr-2" /> Cambiar contraseña
          </Dropdown.Item>

          <Dropdown.Item
            type="button"
            onClick={logoutUserClick}
            style={{ margin: "0px" }}
          >
            <FaSignOutAlt className="mr-2" /> Cerrar sesión
          </Dropdown.Item>
          <Dropdown.Item
            type="button"
            onClick={removeUserClick}
            style={{ margin: "0px" }}
          >
            <FaTrashAlt className="mr-2" /> Eliminar cuenta
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Modal show={showConfirmation} onHide={handleCloseConfirmation} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación de cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro que deseas eliminar tu cuenta?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CompanyMenu;
