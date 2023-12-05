import React, { FC, memo, useEffect, useState, useRef } from "react";
import Teams from "@enums/Teams.enum";
import Character from "@models/characters/Character";

interface ArmyCountBarProps {
  character: Character;
}

const ArmyCountBar: FC<ArmyCountBarProps> = memo(({ character }) => {
  const { count, team } = character;
  const [bgColor, setBgColor] = useState<string>(
    `${character?.team === Teams.Player ? "bg-sky-900" : "bg-slate-500"}`,
  );
  const prevArmyCountRef = useRef<number>(count || 0);

  useEffect(() => {
    if (character?.count !== prevArmyCountRef.current) {
      setBgColor("bg-red-500 animate-ping");

      const timer = setTimeout(() => {
        setBgColor(team === Teams.Player ? "bg-sky-900" : "bg-slate-500");
      }, 800);

      return () => clearTimeout(timer);
    }
    prevArmyCountRef.current = count || 0;
  }, [count]);

  return (
    <div
      className={`rounded-sm px-[10px] text-[7px] sm:text-[7px] lg:text-[9px] xl:text-[10px] font-bold absolute bottom-0 right-0 text-white ${bgColor}`}
    >
      {count}
    </div>
  );
});

export default ArmyCountBar;
