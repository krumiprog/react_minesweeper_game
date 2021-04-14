import { HIDDEN, MARK, LEFT_CLICK, RIGHT_CLICK, openCell } from './minesweeper';

const reducer = (state, action) => {
  switch (action.type) {
    case LEFT_CLICK: {
      const cell = action.payload;

      const newState = JSON.parse(JSON.stringify(state));
      const newCell = newState.board[cell.x][cell.y];

      openCell(newState.board, newCell);

      return newState;
    }

    case RIGHT_CLICK:
      const cell = action.payload;
      const newState = { ...state };
      const newCell = newState.board[cell.x][cell.y];

      if (newCell.status !== HIDDEN && newCell.status !== MARK) {
        return state;
      }

      if (newCell.status === MARK) {
        newCell.status = HIDDEN;
        newCell.content = '';
      } else {
        newCell.status = MARK;
        newCell.content = '🚩';
      }

      return newState;
    default:
      return state;
  }
};

export default reducer;
