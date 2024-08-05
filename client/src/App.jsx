import { useState } from "react";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import NavModal from "./components/NavModal";

function App() {
  const [isNavModal, setIsNavModal] = useState(false);

  return (
    <>
      <NavModal navModal={{ isNavModal, setIsNavModal }} />
      <Header setIsNavModal={setIsNavModal} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
