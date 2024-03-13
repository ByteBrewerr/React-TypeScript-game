import Cell from "../models/Cell";

export default interface Action {
  actionName: "move" | "attack" | "shoot";
  from: Cell;
  to: Cell;
  attacker?: Cell;
}
