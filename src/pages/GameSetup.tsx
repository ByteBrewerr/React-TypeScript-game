import ComputerSide from "@components/game_setup/ComputerSide";
import PlayerSide from "@components/game_setup/player_side/PlayerSide";
import { Divider } from "antd";
import React, { FC, useState } from "react";

const GameSetup: FC = () => {
  const [resetComputerSide, setResetComputerSide] = useState(false);

  localStorage.clear();

  const handleIsReseted = () => {
    setResetComputerSide((prev) => !prev);
  };

  return (
    <div className="w-full h-[100vh] bg-black p-10 flex space-x-10 ">
      <PlayerSide handleIsReseted={handleIsReseted} />
      {/* <Divider className="bg-white h-full" type="vertical" /> */}
      <ComputerSide
        resetComputerSide={resetComputerSide}
        handleIsReseted={handleIsReseted}
      />
    </div>
  );
};

export default GameSetup;
