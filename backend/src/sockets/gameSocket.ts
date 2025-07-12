import { Server, Socket } from 'socket.io';
import * as ticTacToeLogic from '../game-logic/ticTacToe';
import * as checkersLogic from '../game-logic/checkers';
import * as backgammonLogic from '../game-logic/backgammon';
import * as chessLogic from '../game-logic/chess';
// import { Chess } from 'chess.js';

const gameModules: any = {
    'tic-tac-toe': ticTacToeLogic,
    'checkers': checkersLogic,
    'chess': chessLogic,
    'backgammon': backgammonLogic,

};

const waitingQueues: any = {
    'tic-tac-toe': [] as any[],
    'checkers': [] as any[],
    'chess': [],
    'backgammon': [],
};

type GameType = keyof typeof gameModules;
type Player = 'w' | 'b' | 'X' | 'O';

const games: Record<string, any> = {};

function getOpponent(player: Player): Player {
    if (player === 'w') return 'b';
    if (player === 'b') return 'w';
    if (player === 'X') return 'O';
    return 'X'; // Если игрок 'O'
}

function isValidGameType(gameType: any): gameType is GameType {
    return gameType in gameModules;
}

export const handleGameSockets = (io: Server) => {
    io.on('connection', (socket: Socket) => {

        socket.on('findGame', ({ user, gameType }) => {
            // @ts-ignore
            if (!isValidGameType(gameType) || waitingQueues[gameType].some(p => p.user._id === user._id)) {
                return;
            }

            const queue = waitingQueues[gameType];
            queue.push({ socketId: socket.id, user });

            if (queue.length >= 2) {
                const p1 = queue.shift()!;
                const p2 = queue.shift()!;
                const gameId = `${p1.socketId}-${p2.socketId}`;
                const gameModule = gameModules[gameType];

                const symbols = (gameType === 'tic-tac-toe') ? ['X', 'O'] : ['w', 'b'];

                const [s1, s2] = Math.random() < 0.5 ? [symbols[0], symbols[1]] : [symbols[1], symbols[0]];

                const playersInfo = {
                    [s1]: { _id: p1.user._id.toString(), username: p1.user.username, socketId: p1.socketId },
                    [s2]: { _id: p2.user._id.toString(), username: p2.user.username, socketId: p2.socketId },
                };

                games[gameId] = {
                    gameId,
                    gameType,
                    players: playersInfo,
                    gameState: gameModule.getInitialState()
                };

                io.to(p1.socketId).to(p2.socketId).emit('gameFound', { gameId });
            }
        });

        socket.on('submitTurn', ({ gameId, moves }) => {
            const game = games[gameId];

            if (!game || game.gameType !== 'backgammon') return;

            const result = backgammonLogic.applyTurn(game.gameState, moves);

            if (result.error) {
                console.log(`[Invalid Turn] Game ${gameId}: ${result.error}`);

                io.to(socket.id).emit('turnError', { message: result.error });

                return;
            }

            const nextPlayer = getOpponent(game.gameState.currentPlayer!);
            // @ts-ignore
            result.newState.currentPlayer = nextPlayer;
            
            game.gameState = result.newState;

            io.in(gameId).emit('gameStateUpdate', game);

            if (result.winner) {
                io.in(gameId).emit('gameOver', { winnerSymbol: result.winner });
            }
        });

        socket.on('requestGameState', (gameId) => {
            const game = games[gameId];
            
            if (game) {
                socket.join(gameId);
                
                io.to(socket.id).emit('gameStateUpdate', game);
            } else {
                io.to(socket.id).emit('gameNotFound');
            }
        });

        socket.on('makeMove', ({ gameId, move }) => {
            const game = games[gameId];
            
            if (!game) return;

            const playerSymbol = Object.keys(game.players).find(key => game.players[key].socketId === socket.id);
            
            if (game.gameState.currentPlayer !== playerSymbol) {
                return console.log(`[REJECT] Not player's turn.`);
            }

            if (game.gameType === 'tic-tac-toe') {
                move.playerSymbol = playerSymbol;
            }

            const gameModule = gameModules[game.gameType];
            
            const result = gameModule.applyMove(game.gameState, move);

            if (result.error) {
                return console.log(`[REJECT] Invalid Move: ${result.error}`);
            }

            game.gameState = result.newState;
            
            io.in(gameId).emit('gameStateUpdate', game);

            if (result.winner) {
                io.in(gameId).emit('gameOver', { winnerSymbol: result.winner });
            }
        });

        console.log("GAMES", games);

        socket.on('makeChessMove', (data) => {
            socket.to(data.gameId).emit('makeChessMove', data.move);
        });

        socket.on('rollDice', ({ gameId }) => {
            const game = games[gameId];
            
            if (!game || game.gameType !== 'backgammon') return;

            const playerSymbol = Object.keys(game.players).find(key => game.players[key].socketId === socket.id);
           
            if (game.gameState.currentPlayer !== playerSymbol && game.gameState.currentPlayer !== null) return;

            if (game.gameState.currentPlayer === null) {
                game.gameState.currentPlayer = Math.random() < 0.5 ? 'w' : 'b';
            }

            game.gameState.dice = backgammonLogic.rollDice();
            
            io.in(gameId).emit('gameStateUpdate', game);
        });

        socket.on('submitTurn', ({ gameId, moves }) => {
            const game = games[gameId];

            if (!game || game.gameType !== 'backgammon') return;

            const result = backgammonLogic.applyTurn(game.gameState, moves);

            if (result.error) {
                return console.log(`[Invalid Turn] Game ${gameId}: ${result.error}`);
            }

            game.gameState = result.newState;

            io.in(gameId).emit('gameStateUpdate', game);

            if (result.winner) {
                io.in(gameId).emit('gameOver', { winnerSymbol: result.winner });
            }
        });

        socket.on('offerRematch', ({ gameId }) => {
            const game = games[gameId];
            if (!game) return;

            const opponent: any = Object.values(game.players).find((p: any) => p.socketId !== socket.id);
            
            if (!opponent) return;

            console.log(`[Rematch] Offer from ${socket.id} in game ${gameId}`);

            game.rematchInfo = {
                offeredBy: socket.id,
                acceptedBy: [socket.id],
                timer: null
            };

            io.to(opponent.socketId).emit('rematchOffered');

            if (game.rematchInfo.timer) clearTimeout(game.rematchInfo.timer);
            
            game.rematchInfo.timer = setTimeout(() => {
                const currentGame = games[gameId];

                if (currentGame && currentGame.rematchInfo.offeredBy) {
                    io.in(gameId).emit('rematchRejected');

                    delete games[gameId];
                }
            }, 5100);
        });

        socket.on('acceptRematch', ({ gameId }) => {
            const game = games[gameId];
            if (!game || !game.rematchInfo.offeredBy || game.rematchInfo.acceptedBy.includes(socket.id)) {
                return;
            }

            game.rematchInfo.acceptedBy.push(socket.id);

            if (game.rematchInfo.acceptedBy.length === 2) {
                if (game.rematchInfo.timer) clearTimeout(game.rematchInfo.timer);

                const gameModule = gameModules[game.gameType];

                game.gameState = gameModule.getInitialState();

                game.rematchInfo = { offeredBy: null, acceptedBy: [], timer: null };

                io.in(gameId).emit('rematchAccepted', game);
            }
        });

        socket.on('rejectRematch', ({ gameId }) => {
            const game = games[gameId];
            if (!game) return;

            if (game.rematchInfo && game.rematchInfo.timer) clearTimeout(game.rematchInfo.timer);

            io.in(gameId).emit('rematchRejected');

            delete games[gameId];
        });

        socket.on('cancelFindGame', () => {
            console.log(`[CancelSearch] User ${socket.id} cancelled search.`);

            for (const gameType in waitingQueues) {
                // @ts-ignore
                const index = waitingQueues[gameType].findIndex(p => p.socketId === socket.id);

                if (index > -1) {
                    // @ts-ignore
                    waitingQueues[gameType].splice(index, 1);

                    break;
                }
            }
        });

        socket.on('disconnect', () => {
            console.log(`[Disconnect] User disconnected: ${socket.id}`);

            socket.emit('cancelFindGame');

            let gameToEndId: string | null = null;

            let opponentSocketId: string | null = null;

            for (const gameId in games) {
                const game = games[gameId];

                const players = Object.values(game.players) as any[];

                const disconnectedPlayer = players.find(p => p.socketId === socket.id);

                if (disconnectedPlayer) {
                    gameToEndId = gameId;

                    const opponent = players.find(p => p.socketId !== socket.id);

                    if (opponent) {
                        opponentSocketId = opponent.socketId;
                    }

                    break;
                }
            }

            if (gameToEndId && opponentSocketId) {
                console.log(`[GameEnd] Player disconnected from game ${gameToEndId}. Notifying opponent.`);

                io.to(opponentSocketId).emit('opponentDisconnected');

                delete games[gameToEndId];
            }
        });

    });
};