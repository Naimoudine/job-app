import { NavLink, Link } from "react-router-dom";
import { faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar({ setIsNavModal, setUserModal }) {
  const { auth } = useAuth();

  return (
    <nav className="sticky flex justify-between px-8 py-4 text-lg shadow-lg">
      <Link to="/">SJH</Link>
      <ul className="hidden sm:flex sm:gap-4">
        <li>
          <NavLink to="/offers">Job offers</NavLink>
        </li>
        <li>
          <NavLink to="/companies">Companies</NavLink>
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
