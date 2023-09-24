import { IBoard } from '../types/IBoard.ts';

type BoardProps = {
  board: IBoard;
  onClickCellHandler: (rowIndex: number, cellIndex: number) => void;
};

export const Board = ({ board, onClickCellHandler }: BoardProps) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board_row">
          {row.map((cell, cellIndex) =>(
            <button
              key={cellIndex}
              className="board_cell"
              onClick={() => onClickCellHandler(rowIndex, cellIndex)}>{cell}</button>
          ))}
        </div>
      ))}
    </div>
  );
};

