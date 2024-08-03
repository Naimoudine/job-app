import { useState } from "react";
import Navbar from "./Navbar";
import UserOptionModal from "./UserOptionModal";

export default function Header({ setIsNavModal }) {
  const [userModal, setUserModal] = useState(false);
  return (
    <header className="relative">
      <UserOptionModal userModal={userModal} setUserModal={setUserModal} />
      <Navbar setIsNavModal={setIsNavModal} setUserModal={setUserModal} />
    </header>
  );
}
