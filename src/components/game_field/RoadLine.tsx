import React, { FC } from "react";
import Cell from "@models/Cell";
import LineTo from "react-lineto";
import Road from "@interfaces/Road";

interface RoadProps {
  road: Road[];
}

const RoadLine: FC<RoadProps> = ({ road }) => {
  if (!road.length) {
    return null;
  }
  return (
    <div>
      {road.map((_, i) => {
        return (
          <LineTo
            key={i}
            from={`${road[i]?.cell.row}${road[i]?.cell.col}` || ""}
            to={`${road[i + 1]?.cell.row}${road[i + 1]?.cell.col}` || ""}
            borderWidth={1}
            borderColor="gray"
          />
        );
      })}
    </div>
  );
};

export default RoadLine;
