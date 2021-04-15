import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context';

const StatusBar = () => {
  const {
    difficulty,
    numberMines,
    time,
    changeDifficulty,
    startNewGame,
  } = useContext(GameContext);

  const [diff, setDiff] = useState(difficulty);

  const handleChange = e => {
    setDiff(e.target.value);
  };

  useEffect(() => {
    changeDifficulty(diff);
  }, [diff]);

  return (
    <div className="status-bar">
      <div className="difficulty">
        <select value={diff} onChange={handleChange}>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <div>&nbsp;💣 {numberMines}</div>
      </div>
      <button className="btn_start" onClick={() => startNewGame()}>
        😀
      </button>
      <div>🕙 {time}</div>
    </div>
  );
};

export default StatusBar;
