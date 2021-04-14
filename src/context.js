import { createContext, useReducer } from 'react';
import reducer from './reducer';
import { createBoard, LEFT_CLICK, RIGHT_CLICK } from './minesweeper';

const GameContext = createContext();

const initialState = {
  boardSize: 10,
  numberMines: 10,
  board: [],
};

const init = initialState => {
  return createBoard(initialState);
};

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  const leftClickCell = cell => {
    dispatch({ type: LEFT_CLICK, payload: cell });
  };

  const rightClickCell = cell => {
    dispatch({ type: RIGHT_CLICK, payload: cell });
  };

  return (
    <GameContext.Provider value={{ ...state, leftClickCell, rightClickCell }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
