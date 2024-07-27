import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function NavModal({ navModal }) {
  const { isNavModal, setIsNavModal } = navModal;

  return (
    <div
      className={
        isNavModal
          ? `h-screen w-screen flex items-center justify-center relative`
          : `hidden`
      }
    >
      <button
        type="button"
        aria-label="close"
        onClick={() => setIsNavModal(false)}
      >
        <FontAwesomeIcon
          className="absolute top-4 right-4 text-xl"
          icon={faXmark}
        />
      </button>
      <nav className="text-xl">
        <ul className="flex flex-col gap-6">
          <li>
            <NavLink>Home</NavLink>
          </li>
          <li>
            <NavLink to="/offers">Offers</NavLink>
          </li>
          <li>
            <NavLink>Bookmarks</NavLink>
          </li>
          <li>
            <NavLink>Login/Register</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
