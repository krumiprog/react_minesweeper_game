export const HIDDEN = 'HIDDEN';
export const MARK = 'MARK';
export const MINE = 'MINE';
export const NUMBER = 'NUMBER';

export const LEFT_CLICK = 'LEFT_CLICK';
export const RIGHT_CLICK = 'RIGHT_CLICK';
export const NEW_GAME = 'NEW_GAME';
export const TIME = 'TIME';

export const createBoard = initState => {
  const { boardSize, numberMines } = initState;
  const board = [];

  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      row.push({
        x,
        y,
        status: HIDDEN,
        content: '',
        mine: false,
      });
    }
    board.push(row);
  }

  const mines = getMines(boardSize, numberMines);

  mines.forEach(({ x, y }) => {
    board[x][y].mine = true;
    board[x][y].content = '💥';
  });

  return { ...initState, board };
};

export const openCell = (board, cell) => {
  if (cell.status !== HIDDEN) {
    return;
  }

  if (cell.mine) {
    cell.status = MINE;
    return;
  }

  cell.status = NUMBER;
  const nearbyCells = getNearbyCells(board, cell);

  const mines = nearbyCells.filter(item => item.mine);

  if (mines.length === 0) {
    nearbyCells.forEach(openCell.bind(null, board));
  } else {
    cell.content = mines.length;
  }

  return;
};

export const openAllMines = board => {
  board.forEach(row =>
    row.forEach(cell => {
      if (cell.mine) {
        cell.content = '💥';
        cell.status = MINE;
      }
    })
  );
};

export const checkGameResult = board => {
  const isWin = checkWin(board);
  const isLose = checkLose(board);

  return { isWin, isLose };
};

export const checkAllMinesFounded = board => {
  const mines = board.reduce((prev, row) => {
    return prev.concat(row.filter(cell => cell.content === '💥'));
  }, []);

  return mines.every(mine => mine.status === MARK);
};

const checkWin = board => {
  return board.every(row =>
    row.every(
      cell =>
        cell.status === NUMBER ||
        (cell.mine && (cell.status === HIDDEN || cell.status === MARK))
    )
  );
};

const checkLose = board => {
  return board.some(row => row.some(cell => cell.status === MINE));
};

const getNearbyCells = (board, { x, y }) => {
  const cells = [];

  for (let row = -1; row <= 1; row++) {
    for (let col = -1; col <= 1; col++) {
      const cell = board[x + row]?.[y + col];
      if (cell) cells.push(cell);
    }
  }

  return cells;
};

const getMines = (boardSize, numberOfMines) => {
  const mines = [];

  while (mines.length < numberOfMines) {
    const minePos = {
      y: getRandomNumber(boardSize),
      x: getRandomNumber(boardSize),
    };

    if (!mines.some(checkPosMatch.bind(null, minePos))) {
      mines.push(minePos);
    }
  }

  return mines;
};

const getRandomNumber = number => {
  return Math.floor(Math.random() * number);
};

const checkPosMatch = (a, b) => {
  return a.x === b.x && a.y === b.y;
};
