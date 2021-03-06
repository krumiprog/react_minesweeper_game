import {
  openCell,
  openAllMines,
  checkGameResult,
  checkAllMinesFounded,
  HIDDEN,
  MARK,
  LEFT_CLICK,
  RIGHT_CLICK,
  NEW_GAME,
  TIME,
} from './minesweeper';

const reducer = (state, action) => {
  switch (action.type) {
    case LEFT_CLICK: {
      const cell = action.payload;

      const newState = JSON.parse(JSON.stringify(state));
      const newCell = newState.board[cell.x][cell.y];

      if (!newState.start) {
        newState.start = true;
      }

      openCell(newState.board, newCell);
      const { isWin, isLose } = checkGameResult(newState.board);

      if (isWin) {
        newState.isWin = true;
        newState.start = false;
      } else if (isLose) {
        newState.isLose = true;
        newState.start = false;
        openAllMines(newState.board);
      }

      return newState;
    }

    case RIGHT_CLICK: {
      const cell = action.payload;
      const newState = { ...state };
      const newCell = newState.board[cell.x][cell.y];

      if (!newState.start) {
        newState.start = true;
      }

      if (newCell.status !== HIDDEN && newCell.status !== MARK) {
        return state;
      }

      if (newCell.status === MARK) {
        newCell.status = HIDDEN;
        newCell.content = '';
        newState.numberMines++;
      } else {
        if (newState.numberMines === 0) {
          return state;
        }
        newCell.status = MARK;
        newCell.content = '🚩';
        newState.numberMines--;
      }

      const isWin = checkAllMinesFounded(newState.board);

      if (isWin) {
        newState.isWin = true;
        newState.start = false;
      }

      return newState;
    }

    case NEW_GAME:
      return action.payload;

    case TIME: {
      const newState = { ...state };
      newState.time++;

      return newState;
    }

    default:
      return state;
  }
};

export default reducer;
