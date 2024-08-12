import { useNavigate } from 'react-router-dom'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../hooks/useAuth'

export default function NavModal({ navModal }) {
  const { isNavModal, setIsNavModal } = navModal

  const navigate = useNavigate()
  const { auth } = useAuth()

  const handleLogout = async () => {
    localStorage.clear()

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('error while loging out')
      }
      setIsNavModal(false)
      return navigate(0)
    }
    catch (error) {
      throw new Error(error.message)
    }
  }

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
          className="absolute text-xl top-4 right-4"
          icon={faXmark}
        />
      </button>
      <nav className="text-xl">
        <ul className="flex flex-col gap-6">
          <li>
            <NavLink to="/" onClick={() => setIsNavModal(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/offers" onClick={() => setIsNavModal(false)}>
              Job offers
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => setIsNavModal(false)}>Companies</NavLink>
          </li>
          {auth
            ? (
                <li>
                  <NavLink to="/profile" onClick={() => setIsNavModal(false)}>
                    {auth.firstname}
                  </NavLink>
                </li>
              )
            : (
                <li>
                  <NavLink to="/signIn" onClick={() => setIsNavModal(false)}>
                    Sign In/Sign up
                  </NavLink>
                </li>
              )}
          {auth
            ? (
                <button
                  className="p-0 m-0 text-start hover:text-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )
            : null}
        </ul>
      </nav>
    </div>
  )
}
