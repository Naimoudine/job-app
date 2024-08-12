import { useState } from 'react'

export default function Header({ setIsNavModal }) {
  const [userModal, setUserModal] = useState(false)
  return (
    <header className="relative">
      <UserOptionModal userModal={userModal} setUserModal={setUserModal} />
      <Navbar setIsNavModal={setIsNavModal} setUserModal={setUserModal} />
    </header>
  )
}
