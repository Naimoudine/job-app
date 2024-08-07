import { useState } from "react";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import NavModal from "./components/NavModal";
import CancelModal from "./components/profile/CancelModal";
import ProfilePicModal from "./components/profile/ProfilePicModal";

function App() {
  const [isNavModal, setIsNavModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPicModal, setShowPicModal] = useState(false);
  const [offerId, setOfferId] = useState();

  return (
    <div className="relative">
      <ProfilePicModal
        showPicModal={showPicModal}
        setShowPicModal={setShowPicModal}
      />
      <CancelModal
        showCancelModal={showCancelModal}
        setShowCancelModal={setShowCancelModal}
        offerId={offerId}
      />
      <NavModal navModal={{ isNavModal, setIsNavModal }} />
      <Header setIsNavModal={setIsNavModal} />
      <main>
        <Outlet
          context={{
            showCancelModal,
            setShowCancelModal,
            offerId,
            setOfferId,
            setShowPicModal,
          }}
        />
      </main>
    </div>
  );
}

export default App;
