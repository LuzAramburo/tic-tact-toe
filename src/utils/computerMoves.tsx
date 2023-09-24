import { IBoard } from '../types/IBoard.ts';

export const computerMoves = (board: IBoard) => {
  // TODO "smart" version
  // https://github.com/timeToCode-ali/react_playground/blob/ai-tic_tac_toe_TS/src/components/tic-tac-toe/util.tsx
  const emptyCellsList: [number, number][] = [];

  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (!cell) {
        emptyCellsList.push([rowIndex, cellIndex]);
      }
    });
  });

  const randomIndex = Math.floor(Math.random() * emptyCellsList.length);

  return emptyCellsList[randomIndex];
};
