import React, { FC } from "react";
import { Button } from "antd";
import Character from "@models/characters/Character";
import { Link } from "react-router-dom";

interface DraftControlProps {
  valueToSpend: number;
  playerCharacters: Character[];
  handleRestartDraft: () => void;
}

// Компонент DraftControls, представляющий элементы управления в драфте
const DraftControls: FC<DraftControlProps> = ({ valueToSpend, handleRestartDraft, playerCharacters }) => (
  // Обертка для элементов управления
  <div className="flex flex-col w-[20vw] justify-center items-center">
    {/* Отображение текущего значения для расходования */}
    <span
      className={`text-white font-bold text-[5vh] ${valueToSpend < 0 ? "animate-pulse text-red-700" : ""}`}
      style={{ fontSize: "clamp(20px,2vw,30px)" }}
    >
      {valueToSpend}
    </span>

    {/* Кнопка для перезапуска драфта */}
    <Button
      className="text-white w-[12vw] min-w-[120px]"
      onClick={() => {
        handleRestartDraft();
      }}
    >
      RESTART DRAFT
    </Button>

    {/* Ссылка для начала игры, активная при наличии 7 персонажей у игрока */}
    {playerCharacters.length === 7 && (
      <Link
        to="/play"
        className="flex justify-center items-center text-white animate-pulse mt-[2vh] min-h-[40px] w-[12vw] min-w-[120px] bg-yellow-700 font-bold border-[2px] rounded-lg"
      >
        START
      </Link>
    )}
  </div>
);

export default DraftControls;
