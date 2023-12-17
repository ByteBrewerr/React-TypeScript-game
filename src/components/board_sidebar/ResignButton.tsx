import { Button } from "antd";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import gameSetupStore from "@stores/GameSetupStore";

/**
 * Компонент `ResignButton` представляет кнопку для сдачи игры.
 * Использует хранилище `GameSetupStore` для сброса настроек игры и объект `useNavigate`
 * для навигации пользователя на главную страницу при сдаче игры.
 */
export const ResignButton: FC = () => {
  const { resetGameSetup } = gameSetupStore;

  const navigate = useNavigate();

  // Функция для выполнения сдачи игры
  const doResign = () => {
    sessionStorage.clear();

    resetGameSetup();

    navigate("/");
  };

  return (
    <Button
      className={`w-[100%] h-[10%] bg-yellow-600 font-bold rounded-lg  relative z-10 hover:animate-pulse ml-2`}
      onClick={() => doResign()}
    >
      RESIGN
    </Button>
  );
};
