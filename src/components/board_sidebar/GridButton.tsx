import React from "react";
import { useGrid } from "@contexts/GridProvider";
import { Button } from "antd";

export const GridButton = () => {
  const { gridOn, toggleGrid } = useGrid();

  const buttonBg = gridOn ? "bg-yellow-600" : "bg-yellow-800";

  return (
    <Button
      className={`w-[100%] h-[10%] ${buttonBg} font-bold rounded-lg  relative z-10 hover:animate-pulse ml-2`}
      onClick={toggleGrid}
    >
      GRID
    </Button>
  );
};
