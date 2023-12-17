import React, { FC, memo } from "react";
import Cell from "@models/Cell";
import ArmyCountBar from "./ArmyCountBar";
import Teams from "@enums/Teams.enum";
import { useGrid } from "../../../contexts/GridProvider";

interface CellProps {
  cell: Cell;
  isLastHoveredCell: boolean | null;
  onClick: (cell: Cell) => void;
  canMove: boolean | undefined;
  canEnemyMove: boolean | undefined;
  isSelected: boolean;
  canBeAttacked: boolean | null | undefined;
  onMouseEnter: (cell: Cell) => void;
}

/**
 * Компонент `CellComponent` представляет отдельную ячейку игрового поля.
 * Этот компонент отображает изображение ячейки, реагирует на события клика и наведения мыши,
 * а также может отображать информацию о наличии персонажа, его логотипе и количестве.
 */

const CellComponent: FC<CellProps> = memo(
  ({ cell, isLastHoveredCell, onClick, canMove, canEnemyMove, onMouseEnter, isSelected, canBeAttacked }) => {
    // Используем контекст для получения информации о состоянии сетки
    const { gridOn } = useGrid();

    // Определяем классы для стилизации ячейки в зависимости от различных условий
    const cellClasses = `${cell.row}${cell.col} 
    w-[38px] h-[38px]
    sm:w-[40px] sm:h-[40px] 
    md:w-[50px] md:h-[50px] 
    lg:w-[60px] lg:h-[60px] 
    xl:w-[70px] xl:h-[70px] 
    2xl:w-[81px] 2xl:h-[81px] 
    relative flex items-start justify-start
    ${cell.character ? "hover:opacity-80" : ""}
    ${isLastHoveredCell ? "rounded-lg" : ""}
    ${canMove && !canEnemyMove ? "opacity-90 hover:opacity-80" : ""}
    ${isSelected ? "opacity-70" : ""}
    ${canBeAttacked ? "opacity-90" : ""}
    ${canEnemyMove ? "opacity-80" : ""}
    ${gridOn ? "border-[1px] border-gray-500" : ""}`;

    // Определяем стили для изображения персонажа (перевернуто или пульсирующее)
    const isImageReversed = cell.character?.team === Teams.Computer ? "scale-x-[-1]" : "";
    const isPulsing = cell.character && isSelected ? "animate-pulse" : "";

    return (
      <div
        onClick={() => onClick(cell)}
        onMouseEnter={() => onMouseEnter(cell)}
        className={cellClasses}
        style={{ background: `url(${cell.bg}) no-repeat center / contain ` }}
      >
        {/* Отображаем логотип персонажа, если он есть */}
        {cell.character?.logo && (
          <img
            src={cell.character.logo}
            alt="character"
            className={`absolute bottom-0 left-0 ${isImageReversed} ${isPulsing} max-h-[120%]`}
          />
        )}

        {/* Отображаем информацию о количестве существ в ячейке */}
        {cell.character && <ArmyCountBar character={cell.character} />}

        {/* Отображаем логотип препятствия, если оно есть */}
        {cell.obstacle?.logo && (
          <div className="flex items-center justify-center w-full h-full">
            <img src={cell.obstacle.logo} alt="obstacle" className="w-[80%] h-[80%]" />
          </div>
        )}
      </div>
    );
  },
);

export default CellComponent;
