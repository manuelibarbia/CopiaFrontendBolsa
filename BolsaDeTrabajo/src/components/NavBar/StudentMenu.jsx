import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import {
  FaUser,
  FaClipboard,
  FaBars,
  FaSignOutAlt,
  FaTrashAlt,
  FaBriefcase,
  FaFilePdf,
  FaCode,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { logout } from "../../api";
import { deleteStudent } from "../../api";

const StudentMenu = () => {
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
          <Dropdown.Item as={Link} to="/addressStudent" style={{ margin: "0px" }}>
            <FaUser className="mr-2" /> Domicilio
          </Dropdown.Item>
          <Dropdown.Item
            as={Link}
            to="/universityStudent"
            style={{ margin: "0px" }}
          >
            <FaClipboard className="mr-2" /> Datos facultativos
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/uploadCV" style={{ margin: "0px" }}>
            <FaFilePdf className="mr-2" /> Cargar CV
          </Dropdown.Item>

          <Dropdown.Item
            as={Link}
            to="/StudentKnowledge"
            style={{ margin: "0px" }}
          >
            <FaCode className="mr-2" /> Agregar conocimientos
          </Dropdown.Item>

          <Dropdown.Item as={Link} to="/offerStudent" style={{ margin: "0px" }}>
            <FaBriefcase className="mr-2" /> Ver mis ofertas
          </Dropdown.Item>

          <Dropdown.Item as={Link} to="/CVStudent" style={{ margin: "0px" }}>
            <FaFilePdf className="mr-2" /> Ver mi CV
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

export default StudentMenu;
