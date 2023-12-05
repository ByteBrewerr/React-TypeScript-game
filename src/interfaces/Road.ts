import Cell from "../models/Cell";

export default interface Road {
  actionName: string;
  cell: Cell;
  targetToAttack?: Cell;
}
