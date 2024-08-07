import { useState } from "react";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import NavModal from "./components/NavModal";
import CancelModal from "./components/profile/CancelModal";

function App() {
  const [isNavModal, setIsNavModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [offerId, setOfferId] = useState();

  return (
    <div className="relative">
      <CancelModal
        showCancelModal={showCancelModal}
        setShowCancelModal={setShowCancelModal}
        offerId={offerId}
      />
      <NavModal navModal={{ isNavModal, setIsNavModal }} />
      <Header setIsNavModal={setIsNavModal} />
      <main>
        <Outlet
          context={{ showCancelModal, setShowCancelModal, offerId, setOfferId }}
        />
      </main>
    </div>
  );
}

export default App;
