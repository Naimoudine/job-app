import Navbar from "./Navbar";

export default function Header({ setIsNavModal }) {
  return (
    <header>
      <Navbar setIsNavModal={setIsNavModal} />
    </header>
  );
}
