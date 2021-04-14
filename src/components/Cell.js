import { useContext } from 'react';
import { GameContext } from '../context';
import { HIDDEN } from '../minesweeper';

const Cell = ({ cell }) => {
  const { leftClickCell, rightClickCell } = useContext(GameContext);

  const handleClick = () => {
    leftClickCell(cell);
  };

  const handleContextMenu = e => {
    e.preventDefault();
    rightClickCell(cell);
  };

  const x = cell.status === HIDDEN ? 'board__cell' : 'board__cell cell_open';

  return (
    <div className={x} onClick={handleClick} onContextMenu={handleContextMenu}>
      {cell.content}
    </div>
  );
};

export default Cell;
