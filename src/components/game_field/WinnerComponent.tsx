import Teams from "@enums/Teams.enum";
import { Button } from "antd";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import gameSetupStore from "@stores/GameSetupStore";

interface WinnerProps {
  winner: Teams | undefined;
}

const WinnerComponent: FC<WinnerProps> = ({ winner }) => {
  const { resetGameSetup } = gameSetupStore;
  const winnerToString =
    winner === Teams.Player ? "Вы победили" : "Компьютер победил";
  const navigate = useNavigate();
  const restartGame = () => {
    sessionStorage.clear();
    resetGameSetup();
    navigate("/");
  };

  return (
    <div className="h-full flex justify-center items-center ">
      <div className="w-[20rem] h-[20rem] bg-blue-600 border-4 flex justify-center items-center flex-col space-y-4">
        <span className="font-bold text-white">{winnerToString}</span>
        <Button className="bg-yellow-500 " onClick={() => restartGame()}>
          RESTART
        </Button>
      </div>
    </div>
  );
};

export default WinnerComponent;
