import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar({ setIsNavModal, setUserModal }) {
  const { auth } = useAuth();

  return (
    <nav className="sticky flex justify-between px-8 py-4 text-lg shadow-lg">
      <Link to="/">SJH</Link>
      <ul className="hidden sm:flex sm:gap-4">
        <li>
          <NavLink to="/offers">Offers</NavLink>
        </li>
        <li>
          <NavLink>Compagnies</NavLink>
        </li>
      </ul>
      {auth ? (
        <button
          className="hidden p-0 m-0 sm:block"
          onClick={() => setUserModal((prev) => !prev)}
        >
          <FontAwesomeIcon className="text-3xl" icon={faCircleUser} />
        </button>
      ) : (
        <NavLink className="hidden sm:block" to="/signin">
          SignIn / SignUp
        </NavLink>
      )}
      <button
        type="button"
        onClick={() => setIsNavModal(true)}
        className="block sm:hidden"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </nav>
  );
}
