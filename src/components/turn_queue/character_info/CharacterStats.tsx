import React, { FC } from "react";
import Character from "@models/characters/Character";
import { GiHealthPotion, GiCheckedShield, GiSpearHook } from "react-icons/gi";
import { RiSwordLine } from "react-icons/ri";
import { MdHealthAndSafety } from "react-icons/md";
import { FaRunning } from "react-icons/fa";
import { PiSneakerMoveBold } from "react-icons/pi";

interface CharacterStatsProps {
  character: Character;
}

const CharacterStats: FC<CharacterStatsProps> = ({ character }) => {
  const rowElements: { icon: React.ReactElement; property: keyof Character }[] = [
    { icon: <RiSwordLine />, property: "assault" },
    { icon: <GiCheckedShield />, property: "defence" },
    { icon: <GiSpearHook className="scale-x-[-1]" />, property: "minDamage" },
    { icon: <GiSpearHook className="scale-y-[-1]" />, property: "maxDamage" },
    { icon: <GiHealthPotion />, property: "health" },
    { icon: <MdHealthAndSafety />, property: "maxHealth" },
    { icon: <PiSneakerMoveBold />, property: "initiative" },
    { icon: <FaRunning />, property: "speed" },
  ];

  const renderRows = () => {
    return rowElements.map((element, index) => (
      <div key={index} className="flex space-x-4">
        <div className="flex items-center justify-center">{element.icon}</div>
        <div className="w-[100%] flex justify-between px-2 space-x-4">
          <span>{element.property}</span>
          <span>{character[element.property]}</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="" style={{ fontSize: "clapm(12px, 2vh, 24px)" }}>
      <h2>Character Stats</h2>
      {renderRows()}
    </div>
  );
};

export default CharacterStats;
