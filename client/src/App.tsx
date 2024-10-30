import React, { useEffect, useState } from "react";
import userServices from "./services/UserServices";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import WhiteBoard from "./Pages/WhiteBoard";
import Navbar from "./Components/Navbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App: React.FC = () => {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  useEffect(() => {
    userServices.initKeyCloak(() => {
      setKeycloakInitialized(true);
    });
  }, []);


  if (!keycloakInitialized) {
    return <div>Loading...</div>;
  }

  const [isHome, setIsHome] = useState(false);

  return (
    <>
      <Navbar isHome={isHome} />
      <Routes>
        <Route path="/" element={<HomePage setIsHome={setIsHome} />} />
        <Route
          path="/room/:roomId"
          element={<WhiteBoard />}
        />
      </Routes>
    </>
  );
};

export default App;
