import { calculateWinner } from './toeGameLogic';

export const findBestMove = (board: (string | null)[]): number => {
  const emptySquares = board.map((sq, i) => sq === null ? i : -1).filter(i => i !== -1);

  const player = 'X';

  const bot = 'O';

  for (let i of emptySquares) {
    const newBoard = [...board];

    newBoard[i] = bot;

    if (calculateWinner(newBoard) === bot) {
      return i;
    }
  }

  for (let i of emptySquares) {
    const newBoard = [...board];

    newBoard[i] = player;

    if (calculateWinner(newBoard) === player) {
      return i;
    }
  }

  const center = 4;

  if (board[center] === null) {
    return center;
  }

  const corners = [0, 2, 6, 8];

  const availableCorners = corners.filter(i => board[i] === null);

  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
};