import './App.css';
import { Board } from './components/Board.tsx';
import { useState } from 'react';
import { IBoard } from '@/types/IBoard.ts';
import { computerMoves } from '@/utils/computerMoves.tsx';

const createBoard = (): IBoard => [
  Array(3).fill(null),
  Array(3).fill(null),
  Array(3).fill(null),
];

const calculateWinner = (board: IBoard) => {
  const boardLines = [
    //Rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    //columns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    //Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];
  for (const line of boardLines) {
    // if all cells are the same string/player
    if (line[0] && line[0] === line[1] && line[1] === line[2]) {
      return line[0];
    }
  }
  return null;
};

const PLAYER = {
  user: 'X',
  computer: 'O',
};

function App() {
  const [board, setBoard] = useState(createBoard());
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState(false);


  const updateBoardHandler = (
    board: IBoard,
    player: string,
    rowPlayer: number,
    colPlayer: number,
  ) => board.map((rowBoard, rowBoardIndex) => {
    return rowBoard.map((colBoard, colBoardIndex) => {
      return rowBoardIndex === rowPlayer && colBoardIndex === colPlayer ? player : colBoard;
    });
  });

  const onClickCellHandler = (rowPlayer: number, colPlayer: number) => {
    if (board[rowPlayer][colPlayer] || winner) return;

    const updatedPlayerBoard = updateBoardHandler(board, PLAYER.user, rowPlayer, colPlayer);
    setBoard(updatedPlayerBoard);

    const newWinner = calculateWinner(updatedPlayerBoard);
    setWinner(newWinner);

    const hasEmptyCells = updatedPlayerBoard.some(row => row.some(cell => cell === null));

    if (!newWinner && !hasEmptyCells) {
      setIsDraw(true);
      return;
    }

    if (!newWinner) {
      console.log(updatedPlayerBoard);
      const [computerRow, computerCol] = computerMoves(updatedPlayerBoard);
      const updatedComputedBoard = updateBoardHandler(updatedPlayerBoard, PLAYER.computer, computerRow, computerCol);

      setTimeout(() => {
        setBoard(updatedComputedBoard);
        setWinner(calculateWinner(updatedComputedBoard));
      }, 200);
    }
  };

  const restartGame = () => {
    setBoard(createBoard());
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <>
      <main>
        {winner && (
          <div className="zone_winner">Winner: {winner}</div>
        )}
        {isDraw && (
          <div className="zone_winner">Is a Draw!</div>
        )}
        <Board board={board} onClickCellHandler={onClickCellHandler} />

        <button onClick={restartGame} className="btn-restart">Restart game</button>
      </main>
    </>
  );
}

export default App;
