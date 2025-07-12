type Player = 'w' | 'b';
type Point = { color: Player; count: number } | null;
type Board = Point[];
type Move = { from: number; to: number };

interface GameState {
    board: Board;
    currentPlayer: Player;
    dice: number[];
    out: { w: number; b: number };
}

const getOpponent = (player: Player): Player => (player === 'w' ? 'b' : 'w');

const canBearOff = (board: Board, player: Player): boolean => {
    const barIndex = player === 'w' ? 0 : 25;

    if (board[barIndex] && board[barIndex]!.count > 0) return false;

    const opponentHomeAndOuterBoard = player === 'w' ? { start: 1, end: 18 } : { start: 7, end: 24 };

    for (let i = opponentHomeAndOuterBoard.start; i <= opponentHomeAndOuterBoard.end; i++) {
        if (board[i]?.color === player) {
            return false;
        }
    }
    return true;
};

export const getInitialState = (): Omit<GameState, 'currentPlayer'> & { currentPlayer: null } => {
    const board: Board = Array(26).fill(null);

    board[1] = { color: 'w', count: 2 };
    board[12] = { color: 'w', count: 5 };
    board[17] = { color: 'w', count: 3 };
    board[19] = { color: 'w', count: 5 };

    board[24] = { color: 'b', count: 2 };
    board[13] = { color: 'b', count: 5 };
    board[8] = { color: 'b', count: 3 };
    board[6] = { color: 'b', count: 5 };

    return {
        board,
        currentPlayer: null,
        dice: [],
        out: { w: 0, b: 0 },
    };
};

export const rollDice = (): number[] => {
    const die1 = Math.floor(Math.random() * 6) + 1;

    const die2 = Math.floor(Math.random() * 6) + 1;

    return die1 === die2 ? [die1, die1, die1, die1] : [die1, die2];
};

export const applyTurn = (gameState: GameState, moves: Move[]) => {
    let { board, currentPlayer, dice, out } = gameState;

    if (!currentPlayer) return { error: "Игра еще не началась" };

    let tempBoard = JSON.parse(JSON.stringify(board));

    let tempOut = { ...out };

    let diceToUse = [...dice];

    const opponent = getOpponent(currentPlayer);

    const playerBar = currentPlayer === 'w' ? 0 : 25;

    if (tempBoard[playerBar]?.count > 0 && moves.some(m => m.from !== playerBar)) {
        return { error: "Необходимо ввести все шашки с бара" };
    }

    for (const move of moves) {
        const { from, to } = move;

        const isBearingOff = (currentPlayer === 'w' && to === 25) || (currentPlayer === 'b' && to === 0);

        if (isBearingOff) {
            if (!canBearOff(tempBoard, currentPlayer)) {
                return { error: "Нельзя выводить шашки, пока все они не в доме" };
            }

            const pointValue = currentPlayer === 'w' ? 25 - from : from;
            const exactDieIndex = diceToUse.indexOf(pointValue);

            if (exactDieIndex > -1) {
                diceToUse.splice(exactDieIndex, 1);
            } else {
                const higherDice = diceToUse.filter(d => d > pointValue);

                if (higherDice.length === 0) return { error: `Нет подходящей кости для вывода с пункта ${from}` };

                const homeStart = currentPlayer === 'w' ? 19 : 1;

                for (let i = homeStart; i < from; i++) {
                    if (tempBoard[i]?.color === currentPlayer) {
                        return { error: "Нельзя использовать большую кость, если можно походить с более старшего пункта" };
                    }
                }

                const dieToRemove = Math.min(...higherDice);

                diceToUse.splice(diceToUse.indexOf(dieToRemove), 1);
            }

            tempBoard[from]!.count--;

            if (tempBoard[from]!.count === 0) tempBoard[from] = null;

            tempOut[currentPlayer]++;

        } else {
            const distance = Math.abs(to - from);

            const dieIndex = diceToUse.indexOf(distance);

            if (dieIndex === -1) return { error: `Неверное значение кости: ${distance}` };

            diceToUse.splice(dieIndex, 1);

            if (tempBoard[to]?.color === opponent && tempBoard[to]?.count > 1) {
                return { error: `Пункт ${to} заблокирован оппонентом` };
            }

            tempBoard[from]!.count--;

            if (tempBoard[from]!.count === 0) tempBoard[from] = null;

            if (tempBoard[to]?.color === opponent) {
                const opponentBar = opponent === 'w' ? 0 : 25;

                if (!tempBoard[opponentBar]) tempBoard[opponentBar] = { color: opponent, count: 0 };

                tempBoard[opponentBar]!.count++;

                tempBoard[to] = null;
            }

            if (!tempBoard[to]) tempBoard[to] = { color: currentPlayer, count: 0 };

            tempBoard[to]!.count++;
        }
    }

    const nextPlayer = getOpponent(currentPlayer);

    const newGameState = {
        ...gameState,
        board: tempBoard,
        out: tempOut,
        dice: [],
        currentPlayer: nextPlayer,
    };

    const winner = newGameState.out[currentPlayer] === 15 ? currentPlayer : null;

    return { newState: newGameState, winner };
};