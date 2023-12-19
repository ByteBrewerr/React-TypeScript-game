import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import GameSetup from "@pages/GameSetup";
import Game from "@pages/Game";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GameSetup />} />
        <Route path="/play" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
