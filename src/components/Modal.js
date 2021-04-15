import { useContext } from 'react';
import { GameContext } from '../context';

const Modal = ({ handleClick }) => {
  const { time, isWin, isLose } = useContext(GameContext);

  return (
    <div className="modal" onClick={handleClick}>
      <div className="modal__content">
        <h1>{isWin ? 'You Win!' : isLose ? 'You Lose!' : ''}</h1>
        <h3>time: {time}</h3>
      </div>
    </div>
  );
};

export default Modal;
