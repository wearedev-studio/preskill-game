import { Chess } from 'chess.js';

export const getInitialState = () => {
    const chess = new Chess();

    return {
        boardFen: chess.fen(),
        currentPlayer: 'w',
    };
};

export const applyMove = (gameState: any, move: { from: string; to: string; promotion?: string }) => {
    try {
        const chess = new Chess(gameState.boardFen);

        const moveResult = chess.move(move);

        if (moveResult === null) {
            return { error: `Нелегальный ход.` };
        }

        let winner: string | null = null;

        if (chess.isGameOver()) {
            if (chess.isCheckmate()) {
                winner = chess.turn() === 'w' ? 'b' : 'w';
            } else {
                winner = 'draw';
            }
        }

        return {
            newState: {
                boardFen: chess.fen(),
                currentPlayer: chess.turn(),
            },
            winner
        };

    } catch (e) {
        return { error: "Внутренняя ошибка при обработке хода." };
    }
};