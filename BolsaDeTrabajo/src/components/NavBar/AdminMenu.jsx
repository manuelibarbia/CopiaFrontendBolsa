import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import {
  FaCog,
  FaBook,
  FaBars,
  FaSignOutAlt,
  FaTrashAlt,
  FaBuilding,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { logout } from "../../api";
import { deleteStudent } from "../../api";

const AdminMenu = () => {
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);

  const logoutUserClick = async () => {
    try {
      const data = await logout(user.token);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const removeUserClick = async () => {
    try {
      const data = await deleteStudent(user.token, user.userId);
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
          <Dropdown.Item as={Link} to="/createCareer" style={{ margin: "0px" }}>
            <FaBook className="mr-2" /> Crear Carrera
          </Dropdown.Item>
          <Dropdown.Item
            as={Link}
            to="/createKnowledge"
            style={{ margin: "0px" }}
          >
            <FaBook className="mr-2" /> Crear Conocimiento
          </Dropdown.Item>

          <Dropdown.Item
            as={Link}
            to="/pendingCompanies"
            style={{ margin: "0px" }}
          >
            <FaBuilding className="mr-2" /> Ver empresas pendientes
          </Dropdown.Item>

          <Dropdown.Item
            onClick={logoutUserClick}
            type="button"
            style={{ margin: "0px" }}
          >
            <FaSignOutAlt className="mr-2" /> Cerrar sesión
          </Dropdown.Item>
          <Dropdown.Item
            onClick={removeUserClick}
            type="button"
            style={{ margin: "0px" }}
          >
            <FaTrashAlt className="mr-2" /> Eliminar cuenta
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default AdminMenu;
