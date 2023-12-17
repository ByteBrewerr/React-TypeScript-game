import React from "react";
import { GridButton } from "./GridButton";
import { DamageShower } from "./DamageShower";
import { ResignButton } from "./ResignButton";

/**
 * Компонент `GameManipulator` представляет собой панель управления игрой.
 * Включает в себя кнопку для отображения сетки, кнопку для сдачи и отображение урона.
 */
const BoardSidebar = () => {
  return (
    <div className="flex flex-col space-y-4 w-[15vw]">
      <GridButton />
      <ResignButton />
      <DamageShower />
    </div>
  );
};

export default BoardSidebar;
