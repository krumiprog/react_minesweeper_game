import { useContext } from 'react';
import { GameContext } from '../context';

const StatusBar = () => {
  const { numberMines } = useContext(GameContext);

  return (
    <div className="status-bar">
      <div>💣 {numberMines}</div>
      <button>😀</button>
      <div>🕙 {999}</div>
    </div>
  );
};

export default StatusBar;
