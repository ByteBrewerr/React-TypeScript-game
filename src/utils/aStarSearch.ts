import React from "react";
import Cell from "@models/Cell";
import Board from "@models/Board";

interface Node {
  position: Cell;
  g: number;
  h: number;
  f: number;
  parent: Node | null;
}

function aStarSearch(start: Cell, end: Cell, board: Board) {
  function calculateHeuristic(start: Cell, end: Cell): number {
    return Math.abs(end.row - start.row) + Math.abs(end.col - start.col);
  }

  function calculatePossibleMoves(position: Cell): Cell[] {
    const moves: Cell[] = [];
    const directions = [
      { row: position.row - 1, col: position.col },
      { row: position.row + 1, col: position.col },
      { row: position.row, col: position.col - 1 },
      { row: position.row, col: position.col + 1 },
    ];

    for (const dir of directions) {
      if (
        dir.row >= 0 &&
        dir.row < numRows &&
        dir.col >= 0 &&
        dir.col < numCols
      ) {
        if (board.getThisBoardCell(new Cell(dir.row, dir.col)).isEmpty()) {
          moves.push(new Cell(dir.row, dir.col));
        }
      }
    }

    return moves;
  }

  const openList: Node[] = [];
  const closedList: Node[] = [];
  const numRows = 10;
  const numCols = 12;

  const startNode: Node = {
    position: start,
    g: 0,
    h: calculateHeuristic(start, end),
    f: calculateHeuristic(start, end),
    parent: null,
  };

  openList.push(startNode);

  while (openList.length > 0) {
    let currentNode: Node = openList[0];
    let currentIndex: number = 0;

    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < currentNode.f) {
        currentNode = openList[i];
        currentIndex = i;
      }
    }

    openList.splice(currentIndex, 1);
    closedList.push(currentNode);

    if (
      currentNode.position.row === end.row &&
      currentNode.position.col === end.col
    ) {
      let path: Cell[] = [];
      let current: Node | null = currentNode;
      while (current !== null) {
        path.push(current.position);
        current = current.parent;
      }
      return path.reverse();
    }

    const neighbors: Cell[] = calculatePossibleMoves(currentNode.position);
    for (const neighbor of neighbors) {
      const neighborNode: Node = {
        position: neighbor,
        g: currentNode.g + 1,
        h: calculateHeuristic(neighbor, end),
        f: currentNode.g + 1 + calculateHeuristic(neighbor, end),
        parent: currentNode,
      };

      let isInClosedList: boolean = false;
      for (const node of closedList) {
        if (
          node.position.row === neighborNode.position.row &&
          node.position.col === neighborNode.position.col
        ) {
          isInClosedList = true;
          break;
        }
      }

      if (isInClosedList) {
        continue;
      }

      let isInOpenList: boolean = false;
      for (const node of openList) {
        if (
          node.position.row === neighborNode.position.row &&
          node.position.col === neighborNode.position.col &&
          node.g < neighborNode.g
        ) {
          isInOpenList = true;
          break;
        }
      }

      if (!isInOpenList) {
        openList.push(neighborNode);
      }
    }
  }

  return [start, start];
}

export default aStarSearch;
