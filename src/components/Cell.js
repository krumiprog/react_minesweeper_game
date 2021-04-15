import { useContext } from 'react';
import { GameContext } from '../context';
import { HIDDEN, MARK, MINE } from '../minesweeper';

const Cell = ({ cell }) => {
  const { leftClickCell, rightClickCell } = useContext(GameContext);

  const handleClick = () => {
    leftClickCell(cell);
  };

  const handleContextMenu = e => {
    e.preventDefault();
    rightClickCell(cell);
  };

  const cellStyle =
    cell.status === HIDDEN || cell.status === MARK
      ? 'board__cell_close'
      : 'board__cell_open';

  const isMine = cell.status === MINE && ' mine';

  return (
    <div
      className={`board__cell ${cellStyle} ${isMine}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {cell.status === HIDDEN ? '' : cell.content}
    </div>
  );
};

export default Cell;
