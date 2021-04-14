import { useContext } from 'react';
import { GameContext } from '../context';
import Cell from './Cell';

const Board = () => {
  const { board } = useContext(GameContext);

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="board__row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} cell={cell} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
