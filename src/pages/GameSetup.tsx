import React, { FC, useEffect, useState } from "react";
import ComputerSide from "@components/game_setup/ComputerSide";
import PlayerSide from "@components/game_setup/player_side/PlayerSide";
import { Navigate } from "react-router-dom";

const GameSetup: FC = () => {
  const [resetComputerSide, setResetComputerSide] = useState(false);
  sessionStorage.clear();
  const handleIsReseted = () => {
    setResetComputerSide((prev) => !prev);
  };

  return (
    <div className="w-full h-[100vh] bg-black p-10 flex space-x-10 ">
      <PlayerSide handleIsReseted={handleIsReseted} />
      <ComputerSide resetComputerSide={resetComputerSide} handleIsReseted={handleIsReseted} />
    </div>
  );
};

export default GameSetup;
