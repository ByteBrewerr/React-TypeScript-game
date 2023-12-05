import React, { FC } from "react";
import { Button, Slider } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Character from "@models/characters/Character";
import { Link } from "react-router-dom";

interface DraftControlProps {
  valueToSpend: number;
  playerCharacters: Character[];
  handleRestartDraft: () => void;
}

const DraftControls: FC<DraftControlProps> = ({
  valueToSpend,
  handleRestartDraft,
  playerCharacters,
}) => (
  <div className="flex flex-col w-[20vw] justify-center items-center">
    <span
      className={`text-white font-bold text-[5vh] ${
        valueToSpend < 0 ? "animate-pulse text-red-700" : ""
      }`}
      style={{ fontSize: "clamp(20px,2vw,30px)" }}
    >
      {valueToSpend}
    </span>

    <Button
      className="text-white w-[12vw] min-w-[120px]"
      onClick={() => {
        handleRestartDraft();
      }}
    >
      RESTART DRAFT
    </Button>

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
