import { createContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import {
  createBoard,
  LEFT_CLICK,
  RIGHT_CLICK,
  NEW_GAME,
  TIME,
} from './minesweeper';

const GameContext = createContext();

const initialState = {
  difficulty: 'easy',
  numberMines: 10,
  boardSize: 10,
  time: 0,
  isWin: false,
  isLose: false,
  start: false,
  board: [],
};

const gameDifficulty = {
  easy: { boardSize: 10, numberMines: 10 },
  medium: { boardSize: 15, numberMines: 50 },
  hard: { boardSize: 20, numberMines: 100 },
};

const init = initialState => {
  return createBoard(initialState);
};

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {}, [state.start]);

  const leftClickCell = cell => {
    dispatch({ type: LEFT_CLICK, payload: cell });
  };

  const rightClickCell = cell => {
    dispatch({ type: RIGHT_CLICK, payload: cell });
  };

  const startNewGame = () => {
    dispatch({
      type: NEW_GAME,
      payload: init({
        ...initialState,
        ...gameDifficulty[state.difficulty],
        difficulty: state.difficulty,
      }),
    });
  };

  const updateTime = () => {
    dispatch({ type: TIME });
  };

  const changeDifficulty = difficulty => {
    dispatch({
      type: NEW_GAME,
      payload: init({
        ...initialState,
        ...gameDifficulty[difficulty],
        difficulty,
      }),
    });
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        leftClickCell,
        rightClickCell,
        startNewGame,
        changeDifficulty,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
