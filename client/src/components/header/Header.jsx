import { useState } from "react";
import UserOptionModal from "../../components/header/UserOptionModal";
import Navbar from "../../components/header/Navbar";

export default function Header({ setIsNavModal }) {
  const [userModal, setUserModal] = useState(false);
  return (
    <header className="relative">
      <UserOptionModal userModal={userModal} setUserModal={setUserModal} />
      <Navbar setIsNavModal={setIsNavModal} setUserModal={setUserModal} />
    </header>
  );
}
