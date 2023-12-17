import React, { FC } from "react";
import { Button, Slider } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Character from "@models/characters/Character";

interface DraftCardProps {
  currentPick: number;
  handleCurrentUnits: (index: number) => void;
  handleNextPick: () => void;
  currentUnits: Character[];
  pickedUnits: Character[];
  unitCount: number;
  handleSlider: (value: number) => void;
  index: number;
}

// Компонент DraftCard, представляющий карточку выбора персонажа в драфте
const DraftCard: FC<DraftCardProps> = ({
  currentPick,
  handleCurrentUnits,
  handleNextPick,
  currentUnits,
  pickedUnits,
  unitCount,
  handleSlider,
  index,
}) => (
  // Обертка для карточки выбора
  <div className="flex items-center space-x-[2vw]" key={index}>
    <div className="flex">
      {/* Отображение мигающей стрелки для текущего выбора */}
      {currentPick === index && <CaretRightOutlined className="text-white animate-pulse text-[6vh]" />}

      {/* Кнопка для выбора персонажа */}
      <Button
        className="border-yellow-600 border-[2px] w-[11vh] h-[11vh] min-w-[3rem] min-h-[3rem] flex justify-center items-center bg-gray-600"
        onClick={() => {
          handleCurrentUnits(index);
        }}
      >
        {/* Отображение логотипа текущего или выбранного персонажа */}
        {currentPick === index && (
          <img className="w-[100%] h-[100%] min-w-[30px] min-h-[30px]" src={currentUnits[0].logo} alt="logo" />
        )}
        {pickedUnits[index] && (
          <img className="w-[100%] h-[100%] min-w-[30px] min-h-[30px]" src={pickedUnits[index].logo} alt="logo" />
        )}
      </Button>
    </div>

    {/* Блок с ползунком и отображением количества выбранного персонажа */}
    <div className="w-[10vw]">
      {currentPick === index && (
        <Slider
          onAfterChange={(value) => {
            handleSlider(value);
          }}
          max={unitCount}
          autoFocus={true}
        />
      )}
      {pickedUnits[index] && <span className="text-white">{pickedUnits[index].count}</span>}
    </div>

    {/* Кнопка для подтверждения выбора */}
    <Button className="text-white w-[8vw] min-w-[60px]" onClick={() => handleNextPick()} disabled={currentPick !== index}>
      <p style={{ fontSize: "clamp(8px, .8vw, 18px)" }}>CONFIRM</p>
    </Button>
  </div>
);

export default DraftCard;
