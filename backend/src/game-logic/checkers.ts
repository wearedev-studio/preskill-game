type Piece = 'w' | 'b' | 'W' | 'B';
type Player = 'w' | 'b';
type Board = (Piece | null)[];
type Move = { from: number; to: number };

const isOwnPiece = (piece: Piece, player: Player) => piece.toLowerCase() === player;

const getOpponent = (player: Player) => (player === 'w' ? 'b' : 'w');

const findMovesForPiece = (board: Board, index: number): { from: number, to: number, isCapture: boolean }[] => {
    const piece = board[index];

    if (!piece) return [];

    const moves: { from: number, to: number, isCapture: boolean }[] = [];

    const player = piece.toLowerCase() as Player;

    const directions = [-9, -7, 7, 9];

    const isKing = piece === 'W' || piece === 'B';

    for (const dir of directions) {
        if (!isKing) {
            if ((player === 'w' && dir < 0) || (player === 'b' && dir > 0)) {
                const to = index + dir;

                if (to >= 0 && to < 64 && !board[to] && Math.abs((index % 8) - (to % 8)) === 1) {
                    moves.push({ from: index, to, isCapture: false });
                }
            }

            const capturedIndex = index + dir;

            const jumpTo = index + 2 * dir;

            if (
                jumpTo >= 0 && jumpTo < 64
                &&
                !board[jumpTo]
                &&
                board[capturedIndex]
                &&
                !isOwnPiece(board[capturedIndex]!, player)
                &&
                Math.abs((index % 8) - (jumpTo % 8))
                ===
                2
            ) {
                moves.push({ from: index, to: jumpTo, isCapture: true });
            }
        } else {
            for (let i = 1; i < 8; i++) {
                const to = index + dir * i;

                if (to < 0 || to >= 64 || Math.abs((to % 8) - (index % 8)) !== i) break;

                const target = board[to];

                if (!target) {
                    moves.push({ from: index, to, isCapture: false });
                } else {
                    if (isOwnPiece(target, player)) break;

                    const jumpTo = to + dir;

                    if (jumpTo >= 0 && jumpTo < 64 && !board[jumpTo] && Math.abs((to % 8) - (jumpTo % 8)) === 1) {
                        moves.push({ from: index, to: jumpTo, isCapture: true });
                    }

                    break;
                }
            }
        }
    }
    return moves;
};


const findAllCaptures = (board: Board, player: Player): Move[] => {
    const allMoves: { from: number; to: number; isCapture: boolean }[] = [];

    for (let i = 0; i < 64; i++) {
        if (board[i] && isOwnPiece(board[i]!, player)) {
            allMoves.push(...findMovesForPiece(board, i));
        }
    }

    return allMoves.filter(move => move.isCapture);
};

const isDiagonalMove = (from: number, to: number, distance: number) => {
    return Math.abs(Math.floor(from / 8) - Math.floor(to / 8)) === distance &&
        Math.abs((from % 8) - (to % 8)) === distance;
};

const isCorrectDirection = (piece: Piece, from: number, to: number) => {
    if (piece === 'w') return to < from;
    if (piece === 'b') return to > from;
    return true;
};

const findPossibleCaptures = (board: Board, player: Player): { from: number, to: number }[] => {
    const captures: { from: number, to: number }[] = [];

    for (let i = 0; i < 64; i++) {
        const piece = board[i];

        if (piece && isOwnPiece(piece, player)) {
            const row = Math.floor(i / 8);

            const col = i % 8;

            const directions = [-9, -7, 7, 9];

            for (const dir of directions) {
                const capturedIndex = i + dir;
                
                const to = i + 2 * dir;

                if (board[to] === null && board[capturedIndex] && !isOwnPiece(board[capturedIndex]!, player)) {
                    if (isDiagonalMove(i, to, 2)) {
                        captures.push({ from: i, to });
                    }
                }
            }
        }
    }
    return captures;
};

export const getInitialState = () => {
    const board: Board = Array(64).fill(null);
    for (let i = 0; i < 64; i++) {
        const row = Math.floor(i / 8);
        const col = i % 8;
        if ((row + col) % 2 !== 0) {
            if (row < 3) board[i] = 'b';
            if (row > 4) board[i] = 'w';
        }
    }
    return {
        board,
        currentPlayer: 'w' as Player,
        lastMove: null as { from: number, to: number } | null,
    };
};

export const applyMove = (gameState: any, move: Move) => {
    let { board, currentPlayer } = gameState;

    const { from, to } = move;

    const allPlayerMoves = findMovesForPiece(board, from);

    const theMove = allPlayerMoves.find(m => m.to === to);

    if (!theMove) return { error: "Move is not valid" };

    const possibleCaptures = findAllCaptures(board, currentPlayer);

    if (possibleCaptures.length > 0 && !theMove.isCapture) {
        return { error: "A capture is mandatory" };
    }

    const newBoard = [...board];

    const pieceToMove = newBoard[from];

    newBoard[to] = pieceToMove;

    newBoard[from] = null;

    let newCurrentPlayer = currentPlayer;

    if (theMove.isCapture) {
        let capturedIndex = -1;

        const rowDiff = Math.floor(to / 8) - Math.floor(from / 8);

        const colDiff = (to % 8) - (from % 8);

        const dir = (rowDiff / Math.abs(rowDiff)) * 8 + (colDiff / Math.abs(colDiff));

        let currentPos = from + dir;

        while (currentPos !== to) {
            if (board[currentPos]) {
                capturedIndex = currentPos;

                break;
            }

            currentPos += dir;
        }

        if (capturedIndex !== -1) {
            newBoard[capturedIndex] = null;
        }
    }

    const endRow = Math.floor(to / 8);

    if ((pieceToMove === 'w' && endRow === 0) || (pieceToMove === 'b' && endRow === 7)) {
        newBoard[to] = pieceToMove.toUpperCase() as Piece;
    }

    if (theMove.isCapture && findMovesForPiece(newBoard, to).some(m => m.isCapture)) {
        newCurrentPlayer = currentPlayer;
    } else {
        newCurrentPlayer = getOpponent(currentPlayer);
    }

    let winner = null;

    const opponentColor = newCurrentPlayer;

    const opponentPiecesIndexes = [];

    for (let i = 0; i < 64; i++) {
        if (newBoard[i] && isOwnPiece(newBoard[i]!, opponentColor)) {
            opponentPiecesIndexes.push(i);
        }
    }

    if (opponentPiecesIndexes.length === 0) {
        winner = currentPlayer;
    } else {
        let opponentHasMoves = false;
        
        for (const index of opponentPiecesIndexes) {
            if (findMovesForPiece(newBoard, index).length > 0) {
                opponentHasMoves = true;
                break;
            }
        }

        if (!opponentHasMoves) {
            winner = currentPlayer;
        }
    }

    return { newState: { board: newBoard, currentPlayer: newCurrentPlayer }, winner };
};