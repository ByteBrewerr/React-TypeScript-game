import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { GameMainPage } from "@pages/GameMainPage";
import { GameSetupPage } from "@pages/GameSetupPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GameSetupPage />} />
        <Route path="/play" element={<GameMainPage />} />
      </Routes>
    </>
  );
}

export default App;
