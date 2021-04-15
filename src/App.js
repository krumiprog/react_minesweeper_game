import StatusBar from './components/StatusBar';
import Board from './components/Board';
import Modal from './components/Modal';
import { useContext, useEffect, useState } from 'react';
import { GameContext } from './context';

const App = () => {
  const { isWin, isLose, startNewGame } = useContext(GameContext);

  const [isModal, setIsnModal] = useState(false);

  useEffect(() => {
    if (isWin || isLose) {
      setTimeout(() => setIsnModal(true), 500);
    }
  }, [isWin, isLose]);

  const handleClick = () => {
    setIsnModal(false);
    startNewGame();
  };

  return (
    <div className="container">
      <StatusBar />
      <Board />
      {isModal && <Modal handleClick={handleClick} />}
    </div>
  );
};

export default App;
