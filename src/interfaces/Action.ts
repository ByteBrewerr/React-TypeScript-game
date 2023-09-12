import Cell from "../models/Cell";

export default interface Action{
    actionName: string, 
    from: Cell, 
    to: Cell

}