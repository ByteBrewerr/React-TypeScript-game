import React, { FC, useState } from "react";
import ComputerSide from "@components/game_setup/ComputerSide";
import PlayerSide from "@components/game_setup/player_side/PlayerSide";

// Компонент GameSetup, представляющий настройку игры
const GameSetup: FC = () => {
  const [resetComputerSide, setResetComputerSide] = useState(false);

  sessionStorage.clear();

  // Функция для обновления состояния сброса стороны компьютера
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
