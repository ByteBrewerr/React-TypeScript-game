import React, { FC } from "react";
import Cell from "@models/Cell";
import LineTo from "react-lineto";
import Teams from "@enums/Teams.enum";

interface ShootProps {
  from: Cell;
  to: Cell;
  canShoot?: boolean;
  cursor: string;
}

const ShootLine: FC<ShootProps> = ({ from, to, canShoot, cursor }) => {
  if (canShoot === false || from.character?.team === to.character?.team || !to.character) {
    return null;
  }

  return (
    <div>
      <LineTo className={`${cursor}`} from={`${from.row}${from.col}`} to={`${to.row}${to.col}`} borderWidth={1} borderColor="gray" />
    </div>
  );
};

export default ShootLine;
