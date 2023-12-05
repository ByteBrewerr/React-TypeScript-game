import React from "react";
import "./App.css";
import Game from "pages/Game";
import GameSetup from "pages/GameSetup";
import { Route, Routes } from "react-router-dom";

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
