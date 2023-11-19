// GameManipulator.tsx
import React from 'react';
import { useGrid } from '../contexts/GridProvider'; 

const GameManipulator = () => {
  const { gridOn, toggleGrid } = useGrid();
  
  const bg = gridOn ? 'bg-green-500' : 'bg-red-500';
  const bgHover = gridOn ? 'hover:bg-green-600' : 'hover:bg-red-600'
  return (
    <div>
      <button
        className={`${bg} p-4 rounded-lg ml-4 w-[125px] h-[100px] font-bold ${bgHover}`}
        onClick={toggleGrid}
      >
        {gridOn ? 'TURN OFF GRID' : 'TURN ON GRID'}
      </button>
    </div>
  );
};

export default GameManipulator;
