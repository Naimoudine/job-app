import { useNavigate, NavLink } from "react-router-dom";

export default function UserOptionModal({ userModal, setUserModal }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("error while loging out");
      }

      setUserModal(false);
      navigate(0);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div
      className={
        userModal
          ? `absolute bg-gray-100/100 z-[1000] right-8 top-12`
          : `hidden`
      }
    >
      <ul>
        <li className="px-4 py-2 hover:bg-gray-300">
          <NavLink to="/profile" onClick={() => setUserModal(false)}>
            Profile
          </NavLink>
        </li>
        <li className="px-4 py-2 hover:bg-gray-300">
          <button className="p-0 m-0" onClick={() => handleLogout()}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
