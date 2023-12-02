import React, { FC, memo, useEffect, useState, useRef } from 'react';
import Teams from '@enums/Teams.enum';

interface ArmyCountBarProps {
  armyCount: number;
  team: Teams;
}

const ArmyCountBar: FC<ArmyCountBarProps> = memo(({ armyCount, team }) => {
  const [bgColor, setBgColor] = useState<string>(`${team === Teams.Player ? 'bg-sky-900' : 'bg-slate-500'}`);
  const prevArmyCountRef = useRef<number>(armyCount);
  useEffect(() => {
    if (armyCount !== prevArmyCountRef.current) {
      setBgColor('bg-red-500 animate-ping');

      const timer = setTimeout(() => {
        setBgColor(team === Teams.Player ? 'bg-sky-900' : 'bg-slate-500');
      }, 1000);

      return () => clearTimeout(timer);
    }
    prevArmyCountRef.current = armyCount;
  }, [armyCount]);

  return (
    <div className={`rounded-sm px-[10px] text-[10px] font-bold absolute bottom-0 right-0 text-white ${bgColor}`}>
      {armyCount}
    </div>
  );
});

export default ArmyCountBar;
