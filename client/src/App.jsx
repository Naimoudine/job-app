import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import NavModal from "./components/NavModal";
import { useState } from "react";

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
