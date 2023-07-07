import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
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

  const removeUserClick = async () => {
    try {
      const data = await deleteCompany(user.token, user.userId);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        <FaBars className="mr-2" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/company-offers" style={{ margin: "0px" }}>
          <FaUser className="mr-2" /> Mis ofertas
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/createOffer" style={{ margin: "0px" }}>
          <FaClipboard className="mr-2" /> Cargar ofertas
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
  );
};

export default CompanyMenu;
