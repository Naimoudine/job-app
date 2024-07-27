import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ setIsNavModal }) {
  return (
    <nav className="flex justify-between p-4 text-lg">
      <Link to="/">SJH</Link>
      <ul className="hidden sm:flex sm:gap-4">
        <li>
          <NavLink to="/offers">offers</NavLink>
        </li>
        <li>
          <NavLink>my offers</NavLink>
        </li>
      </ul>
      <NavLink className="hidden sm:block" to="/login">
        Login/Register
      </NavLink>
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
